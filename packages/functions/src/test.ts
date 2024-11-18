import { Client } from "pg";

exports.handler = async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    const res = await client.query("SELECT NOW()");
    await client.end();
    console.log("Connection successful:", res.rows);
    return { statusCode: 200, body: "Connection successful" };
  } catch (err: any) {
    console.error("Connection error", err.stack);
    return { statusCode: 500, body: "Connection failed" };
  }
};
