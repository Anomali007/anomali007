import { Route53 } from "aws-sdk";

export const handler = async (event: any) => {
  const route53 = new Route53();
  const { userDomain } = JSON.parse(event.body);

  const params = {
    ChangeBatch: {
      Changes: [
        {
          Action: "CREATE",
          ResourceRecordSet: {
            Name: userDomain,
            Type: "A",
            AliasTarget: {
              DNSName:
                process.env.PORTFOLIO_BUCKET_NAME +
                ".s3-website-us-east-1.amazonaws.com",
              EvaluateTargetHealth: false,
              HostedZoneId: "Z3AQBSTGFYJSTF", // S3 website endpoint hosted zone ID
            },
          },
        },
      ],
    },
    HostedZoneId: process.env.HOSTED_ZONE_ID!,
  };

  try {
    await route53.changeResourceRecordSets(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Custom domain created successfully" }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error creating custom domain" }),
    };
  }
};
