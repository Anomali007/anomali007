import { CodeAdapter, GoogleAdapter, LinkAdapter } from "sst/auth/adapter";
// import { Config } from "sst/node/config";
import { Resource } from "sst";
import { auth } from "sst/aws/auth";
// import { sendEmail } from "./sendEmail"; // You'll need to implement this

export const handler = auth.authorizer({
  providers: {
    google: GoogleAdapter({
      clientID: Resource.GoogleClientID.value,
      // clientSecret: Config.GOOGLE_CLIENT_SECRET,
      mode: "oidc",
    }),

    link: LinkAdapter({
      onLink: async (link, claims) => {
        return new Response(link, {
          status: 200,
          headers: { "Content-Type": "text/plain" },
        });
      },
    }),
    code: CodeAdapter({
      onCodeRequest: async (code, claims) => {
        return new Response("Your code is " + code, {
          status: 200,
          headers: { "Content-Type": "text/plain" },
        });
      },
      onCodeInvalid: async (code, claims) => {
        return new Response("Code is invalid " + code, {
          status: 200,
          headers: { "Content-Type": "text/plain" },
        });
      },
    }),
  },
  callbacks: {
    auth: {
      async allowClient(clientID, redirect, req) {
        return true;
      },
      async success(ctx, input) {
        let responseBody;
        if (input.provider === "google") {
          responseBody = {
            token: input.tokenset.access_token,
            user: {
              email: input.tokenset.claims().email,
              name: input.tokenset.claims().name,
            },
          };
        } else if (input.provider === "link") {
          responseBody = {
            token: input.claims.link,
            user: {
              email: input.claims.email,
              name: input.claims.name,
            },
          };
        }

        return new Response(JSON.stringify(responseBody), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
