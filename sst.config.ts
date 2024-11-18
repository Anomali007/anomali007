/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "anomali007",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    // Create a VPC for the database and Next.js site
    const vpc = new sst.aws.Vpc("MyVpc", {
      az: 2, // Number of Availability Zones
      nat: "managed", // Enable NAT if required for outbound internet access from private subnets
      transform: {
        securityGroup: {
          ingress: [
            {
              cidrBlocks: ["0.0.0.0/0"],
              fromPort: 5432,
              toPort: 5432,
              protocol: "tcp",
            },
          ],
        },
      },
    });

    // 2. Create the Postgres database within the VPC
    const database = new sst.aws.Postgres("PayloadDatabase", {
      databaseName: "payload",
      scaling: {
        min: "2 ACU",
        max: "16 ACU",
      },
      vpc,
      version: "15.5", // Specify Postgres version
    });

    // 3. Create S3 buckets
    const bucket = new sst.aws.Bucket("UploadsBucket", {
      cors: true,
    });

    const portfolioBucket = new sst.aws.Bucket("UserPortfolioBucket", {
      public: true,
      cors: [
        {
          allowedOrigins: ["*"],
          allowedMethods: ["GET"],
        },
      ],
    });

    // 4. Generate a random secret for Payload CMS
    const payloadSecret = new sst.Secret("PayloadSecret", "payload-secret");

    // Set up secrets for Google OAuth
    const secrets = {
      GoogleClientID: new sst.Secret("GoogleClientID"),
      GoogleClientSecret: new sst.Secret("GoogleClientSecret"),
    };

    const s3Credentials = {
      S3_ACCESS_KEY: new sst.Secret("S3AccessKey", ""),
      S3_SECRET_KEY: new sst.Secret("S3SecretKey", ""),
    };

    // 5. Setup SST Auth for magic link and Google authentication
    const auth = new sst.aws.Auth("Auth", {
      authenticator: {
        handler: "packages/functions/src/auth.handler",
        link: [secrets.GoogleClientID, secrets.GoogleClientSecret],
      },
    });

    // 6. Construct the connection string using the database resource
    const connectionString = $interpolate`postgresql://${database.username}:${database.password}@${database.host}:${database.port}/${database.database}`;
    console.log("Connection String:", connectionString);

    // 7. Create the Next.js site
    const site = new sst.aws.Nextjs("Anomali007-Frontend", {
      path: "packages/frontend",
      environment: {
        // DATABASE_URL: database.host,
        PAYLOAD_SECRET: payloadSecret.value,
        S3_BUCKET_NAME: bucket.name,
        PORTFOLIO_BUCKET_NAME: portfolioBucket.name,
        NEXT_PUBLIC_SERVER_URL:
          $app.stage === "production"
            ? "https://anomali007.com"
            : "http://localhost:3000",
        AUTH_REDIRECT_URL:
          $app.stage === "production"
            ? "https://anomali007.com"
            : "http://localhost:3000",
        AUTH_URL: auth.url,
        AUTH_PUBLIC_KEY: auth.key.publicKeyPem,
        GOOGLE_CLIENT_ID: secrets.GoogleClientID.value,
        DATABASE_URL: connectionString.apply((str) => str),
        S3_ACCESS_KEY: s3Credentials.S3_ACCESS_KEY.value,
        S3_SECRET_KEY: s3Credentials.S3_SECRET_KEY.value,
      },
      link: [database, bucket, portfolioBucket, payloadSecret, auth, vpc],
      domain: {
        name: $app.stage === "production" ? "anomali007.com" : "localhost:3000",
        redirects: [
          $app.stage === "production" ? "www.anomali007.com" : "localhost:3000",
        ],
        dns: sst.aws.dns(),
      },
      vpc: vpc,
    });

    // // 8. Allow Next.js app to connect to RDS

    // const siteSecurityGroup = site.nodes.server.nodes.role.id;

    // Create an API for the user dashboard
    const dashboard = new sst.aws.ApiGatewayV2("DashboardApi", {
      cors: true,
      transform: {
        route: {
          handler: (args) => {
            // Set default memory for all route handlers
            args.memory ??= "1024 MB";
          },
        },
      },
    });

    dashboard.addAuthorizer({
      name: "dashboardAuthorizer",
      lambda: {
        function: "packages/functions/src/auth.handler",
      },
    });

    // // Add routes
    dashboard.route(
      "GET /user/subscription",
      "packages/functions/src/subscription.get"
    );
    dashboard.route(
      "POST /user/custom-domain",
      "packages/functions/src/updateDomain"
    );

    // Function for managing S3 permissions
    // const s3User = new sst.aws.Function("PayloadS3User", {
    //   handler: "packages/functions/src/s3User.handler",
    //   permissions: [
    //     {
    //       actions: ["s3:*"],
    //       effect: "Allow",
    //       resources: [
    //         bucket.arn,
    //         `\${${bucket.arn}}/*`,
    //         portfolioBucket.arn,
    //         `\${${portfolioBucket.arn}}/*`,
    //       ],
    //     },
    //   ],
    // });

    // Create a Function with IAM permissions for Payload CMS to access S3
    // const s3User = new sst.aws.Function("PayloadS3User", {
    //   handler: "packages/functions/src/s3User.handler", // You'll need to create this handler
    //   permissions: [
    //     {
    //       actions: ["s3:*"],
    //       effect: "Allow",
    //       resources: [
    //         bucket.arn,
    //         `${bucket.arn}/*`,
    //         portfolioBucket.arn,
    //         `${portfolioBucket.arn}/*`,
    //       ],
    //     },
    //   ],
    // });

    // Function to automate custom domain setup
    // const createUserDomain = new sst.aws.Function("CreateUserDomain", {
    //   handler: "packages/functions/src/createUserDomain.handler",
    //   environment: {
    //     PORTFOLIO_BUCKET_NAME: portfolioBucket.name,
    //   },
    //   permissions: ["route53:ChangeResourceRecordSets", "acm:*"], // ACM for SSL
    // });

    // Define the IAM policy document
    // const policyDocument = {
    //   Version: "2012-10-17",
    //   Statement: [
    //     {
    //       Effect: "Allow",
    //       Action: ["s3:GetObject", "s3:PutObject"],
    //       Resource: portfolioBucket.arn,
    //     },
    //     // Add more statement objects as needed
    //   ],
    // };

    // 11. Create a Temporary Lambda Function for Testing
    const testFunction = new sst.aws.Function("TestFunction", {
      handler: "packages/functions/src/test.handler",
      vpc: vpc, // Ensure it's in the same VPC
      environment: {
        DATABASE_URL: connectionString.apply((str) => str),
      },
    });

    // Allow the database to be accessed from the test function
    const dbSecurityGroup = database.nodes.cluster.vpcSecurityGroupIds[0];
    dbSecurityGroup;

    return {
      api: site.url,
      databaseUrl: database.host,
      bucketName: bucket.name,
      portfolioBucketName: portfolioBucket.name,
      authUrl: auth.url,
      dashboardApiUrl: dashboard.url,
      siteUrl: site.url,
      PayloadDatabase: {
        database: database.database,
        secretArn: database.secretArn,
        clusterArn: database.clusterArn,
        region: $app.providers.aws.region, // Add this if not already present
        connectionString: connectionString.apply((str) => str),
      },
    };
  },
});
