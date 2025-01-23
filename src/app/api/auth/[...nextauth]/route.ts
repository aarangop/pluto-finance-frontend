import NextAuth, { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CognitoProvider from "next-auth/providers/cognito";

const authOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID!,
      clientSecret: process.env.COGNITO_CLIENT_SECRET!,
      issuer: process.env.COGNITO_ISSUER!,
    }),
  ],
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }: { token: JWT; account: any }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      return {
        ...session,
        accessToken: token.accessToken,
        idToken: token.idToken,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
  },
};

// Create handler function
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
