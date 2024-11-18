// import {
//   RDSDataClient,
//   ExecuteStatementCommand,
// } from "@aws-sdk/client-rds-data";
// import { Resource } from "sst";

// const client = new RDSDataClient({ region: "us-east-1" });

// async function testConnection() {
//   try {
//     const command = new ExecuteStatementCommand({
//       resourceArn: Resource.PayloadDatabase.clusterArn,
//       secretArn: Resource.PayloadDatabase.secretArn,
//       database: Resource.PayloadDatabase.database,
//       sql: "SELECT 1",
//     });

//     const response = await client.send(command);
//     console.log("Connected successfully", response);
//   } catch (err) {
//     console.error("Connection error", err);
//   }
// }

// testConnection();
