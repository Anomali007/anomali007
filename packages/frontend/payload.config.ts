import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import path from "path";
import { fileURLToPath } from "url";
import { slateEditor } from "@payloadcms/richtext-slate";
import { User } from "./payload-types";
import { s3Storage } from "@payloadcms/storage-s3";
import { Resource } from "sst";
import { drizzle } from "drizzle-orm/aws-data-api/pg";
import {
  RDSDataClient,
  ExecuteStatementCommand,
  SqlParameter,
} from "@aws-sdk/client-rds-data";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Access control function to restrict users to their own content
const isAdminOrSelf = ({ req: { user } }: { req: { user: User | null } }) => {
  if (user?.role === "admin") return true;
  return {
    id: {
      equals: user?.id,
    },
  };
};
// URL-encode the password
const encodedPassword = encodeURIComponent(Resource.PayloadDatabase.password);
const connectionString = `postgresql://${Resource.PayloadDatabase.username}:${encodedPassword}@${Resource.PayloadDatabase.host}:${Resource.PayloadDatabase.port}/${Resource.PayloadDatabase.database}`;
console.log(connectionString);

// Create a custom adapter for AWS Data API
const createAWSDataAPIAdapter = () => {
  const client = new RDSDataClient({ region: "us-east-1" });

  return {
    drizzle: drizzle(client, {
      database: Resource.PayloadDatabase.database,
      secretArn: Resource.PayloadDatabase.secretArn,
      resourceArn: Resource.PayloadDatabase.clusterArn,
    }),
    ...postgresAdapter({
      pool: {
        max: 10,
        min: 2,
        idleTimeoutMillis: 30000,
      },
    }),
    connect: async () => {
      // No need to establish a connection for Data API
      return Promise.resolve();
    },
    query: async (
      sql: string,
      params: unknown[]
    ): Promise<Record<string, unknown>[]> => {
      const command = new ExecuteStatementCommand({
        resourceArn: Resource.PayloadDatabase.clusterArn,
        secretArn: Resource.PayloadDatabase.secretArn,
        database: Resource.PayloadDatabase.database,
        sql,
        parameters: params.map((param): SqlParameter => {
          if (param === null || param === undefined) {
            return { name: "parameter", value: { isNull: true } };
          }
          return {
            name: "parameter",
            value: { stringValue: param.toString() },
          };
        }),
      });
      const response = await client.send(command);
      if (!response.records) {
        return [];
      }
      return response.records.map((record) => {
        const obj: Record<string, unknown> = {};
        record.forEach((field, index) => {
          const key = Object.keys(field)[0];
          obj[`field${index}`] = field[key as keyof typeof field];
        });
        return obj;
      });
    },
    // Implement other required methods of DatabaseAdapter
    transaction: async (callback: () => Promise<void>) => {
      // Implement transaction logic if needed
      return callback();
    },
    // Add other methods as required by DatabaseAdapter
  };
};

export default buildConfig({
  //   serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
  secret: Resource.PayloadSecret.value,
  collections: [
    {
      slug: "users",
      auth: true,
      admin: {
        useAsTitle: "email",
      },
      access: {
        read: isAdminOrSelf,
        update: isAdminOrSelf,
      },
      fields: [
        {
          name: "firstName",
          type: "text",
        },
        {
          name: "lastName",
          type: "text",
        },
        {
          name: "email",
          type: "email",
          unique: true,
        },
        {
          name: "bio",
          type: "richText",
        },
        {
          name: "profilePicture",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "linkedInUrl",
          type: "text",
          validate: (value: string | string[]) => {
            if (
              typeof value === "string" &&
              value &&
              !value.startsWith("https://www.linkedin.com/")
            ) {
              return "Must be a valid LinkedIn URL";
            }
            return true;
          },
        },
        {
          name: "resumeData",
          type: "json",
        },
        {
          name: "role",
          type: "select",
          options: [
            { label: "Admin", value: "admin" },
            { label: "User", value: "user" },
          ],
          defaultValue: "user",
          required: true,
        },
      ],
    },
    {
      slug: "resumes",
      admin: {
        useAsTitle: "title",
      },
      access: {
        read: isAdminOrSelf,
        update: isAdminOrSelf,
        delete: isAdminOrSelf,
        create: () => true,
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "sections",
          type: "array",
          fields: [
            {
              name: "sectionType",
              type: "select",
              options: ["Education", "Work Experience", "Skills", "Projects"],
              required: true,
            },
            {
              name: "content",
              type: "richText",
            },
          ],
        },
        {
          name: "createdBy",
          type: "relationship",
          relationTo: "users",
          required: true,
        },
      ],
    },
    {
      slug: "job-applications",
      admin: {
        useAsTitle: "jobTitle",
      },
      access: {
        read: isAdminOrSelf,
        update: isAdminOrSelf,
        delete: isAdminOrSelf,
        create: () => true,
      },
      fields: [
        {
          name: "jobTitle",
          type: "text",
          required: true,
        },
        {
          name: "companyName",
          type: "text",
          required: true,
        },
        {
          name: "resumeUsed",
          type: "relationship",
          relationTo: "resumes",
          required: true,
        },
        {
          name: "coverLetter",
          type: "richText",
        },
        {
          name: "status",
          type: "select",
          options: [
            { label: "Submitted", value: "submitted" },
            { label: "In Progress", value: "in-progress" },
            { label: "Rejected", value: "rejected" },
            { label: "Offered", value: "offered" },
          ],
          defaultValue: "submitted",
          required: true,
        },
        {
          name: "followUpChat",
          type: "richText",
        },
      ],
    },
    {
      slug: "chat-sessions",
      admin: {
        useAsTitle: "id",
      },
      access: {
        read: isAdminOrSelf,
        update: isAdminOrSelf,
        delete: isAdminOrSelf,
        create: () => true,
      },
      fields: [
        {
          name: "jobApplication",
          type: "relationship",
          relationTo: "job-applications",
          required: true,
        },
        {
          name: "messageThread",
          type: "richText",
        },
      ],
    },
    {
      slug: "media",
      upload: {
        staticDir: "../media",
      },
      fields: [],
    },
    {
      slug: "custom-domains",
      admin: {
        useAsTitle: "domainName",
      },
      access: {
        read: isAdminOrSelf,
        update: isAdminOrSelf,
        delete: isAdminOrSelf,
        create: () => true,
      },
      fields: [
        {
          name: "user",
          type: "relationship",
          relationTo: "users",
          required: true,
        },
        {
          name: "domainName",
          type: "text",
          required: true,
        },
        {
          name: "DNSConfig",
          type: "json",
        },
      ],
    },
  ],
  admin: {
    user: "users",
  },
  db: createAWSDataAPIAdapter(),
  editor: slateEditor({}),
  upload: {
    limits: {
      fileSize: 5000000, // 5MB, adjust as needed
    },
    useTempFiles: true,
  },
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: "uploads", // Optional: adds a prefix to your file paths
        },
      },
      bucket: Resource.UserPortfolioBucket.name,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY || "",
          secretAccessKey: process.env.S3_SECRET_KEY || "",
        },
        region: "us-east-1",
      },
    }),
  ],
});
