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

    // Create the Next.js site
    const site = new sst.aws.Nextjs("Anomali007-Frontend", {
      path: "packages/frontend",
      environment: {
        DATABASE_URL: database.host,
      },
      link: [database],
      vpc,
    });

    return {
      api: site.url,
      databaseUrl: database.host,
    };
  },
});
