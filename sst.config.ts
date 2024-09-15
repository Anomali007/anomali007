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
    // Create a VPC for the database
    const vpc = new sst.aws.Vpc("MyVpc");

    // Create the Postgres database
    const database = new sst.aws.Postgres("PayloadDatabase", {
      databaseName: "payload",
      scaling: {
        min: "2 ACU",
        max: "16 ACU",
      },
      vpc,
    });

    // Create an S3 bucket for file uploads
    const bucket = new sst.aws.Bucket("UploadsBucket", {
      cors: true,
    });

    // Create an S3 bucket for user portfolio static content
    const portfolioBucket = new sst.aws.Bucket("UserPortfolioBucket", {
      public: true,
      cors: [
        {
          allowedOrigins: ["*"],
          allowedMethods: ["GET"],
        },
      ],
    });

    // Generate a random secret for Payload CMS
    const payloadSecret = new sst.Secret("PayloadSecret");

    // Set up secrets for Google OAuth
    const secrets = {
      GoogleClientID: new sst.Secret("GoogleClientID"),
      GoogleClientSecret: new sst.Secret("GoogleClientSecret"),
    };

    // Set up SST Auth for magic link and Google authentication
    const auth = new sst.aws.Auth("Auth", {
      authenticator: {
        handler: "packages/functions/src/auth.handler",
        link: [secrets.GoogleClientID, secrets.GoogleClientSecret],
      },
    });

    // Create the Next.js site
    const site = new sst.aws.Nextjs("Anomali007-Frontend", {
      path: "packages/frontend",
      environment: {
        DATABASE_URL: database.host,
        PAYLOAD_SECRET: payloadSecret.value,
        S3_BUCKET_NAME: bucket.name,
        PORTFOLIO_BUCKET_NAME: portfolioBucket.name,
        NEXT_PUBLIC_SERVER_URL: "anomali007.com", // Update this with your actual domain
        AUTH_REDIRECT_URL: "anomali007.com", // Update this with your actual domain
        AUTH_URL: auth.url,
        AUTH_PUBLIC_KEY: auth.key.publicKeyPem, // Public key for token verification
        GOOGLE_CLIENT_ID: secrets.GoogleClientID.value,
      },
      link: [database, bucket, portfolioBucket, payloadSecret, auth],
      domain: {
        name: "anomali007.com",
        redirects: ["www.anomali007.com"],
        dns: sst.aws.dns(),
      },
      vpc,
    });

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

    return {
      api: site.url,
      databaseUrl: database.host,
      bucketName: bucket.name,
      portfolioBucketName: portfolioBucket.name,
      authUrl: auth.url,
      dashboardApiUrl: dashboard.url,
      siteUrl: site.url,
    };
  },
});
