import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

export const handler = async (event: any) => {
  const s3Client = new S3Client({});

  try {
    // This is a sample operation. Adjust according to your needs.
    const command = new ListBucketsCommand({});
    const response = await s3Client.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "S3 operation successful",
        buckets: response.Buckets,
      }),
    };
  } catch (error) {
    console.error("Error in S3 operation:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error in S3 operation" }),
    };
  }
};
