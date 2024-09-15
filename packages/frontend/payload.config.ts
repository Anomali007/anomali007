import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import path from "path";
import { fileURLToPath } from "url";
import { slateEditor } from "@payloadcms/richtext-slate";
import { User } from "./payload-types";
import { s3Storage } from "@payloadcms/storage-s3";

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

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  secret: process.env.PAYLOAD_SECRET || "YOUR_SECRET_KEY",
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
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
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
      bucket: process.env.PORTFOLIO_BUCKET_NAME || "",
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
