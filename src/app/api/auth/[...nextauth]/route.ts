import { getEnvVar, getSecret } from "@/lib/env";
import NextAuth, { AuthOptions } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

const getAuthOptions = async (): Promise<AuthOptions> => {
  const [cognitoClientId, cognitoClientSecret, nextAuthSecret] =
    await Promise.all([
      getSecret("COGNITO_CLIENT_ID"),
      getSecret("COGNITO_CLIENT_SECRET"),
      getSecret("NEXTAUTH_SECRET"),
    ]);
  const cognitoIssuer = await getEnvVar("COGNITO_ISSUER");

  if (
    !cognitoClientId ||
    !cognitoClientSecret ||
    !nextAuthSecret ||
    !cognitoIssuer
  ) {
    throw new Error("Missing required authentication configuration");
  }

  return {
    providers: [
      CognitoProvider({
        clientId: cognitoClientId,
        clientSecret: cognitoClientSecret,
        issuer: cognitoIssuer,
      }),
    ],
    debug: true,
    secret: nextAuthSecret,
    callbacks: {
      session: ({ session, token }) => ({
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      }),
    },
  };
};

// Create handler function
const handler = NextAuth(await getAuthOptions());

export { handler as GET, handler as POST };
