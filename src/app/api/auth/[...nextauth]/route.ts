import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import restClient from "@/api/restClient";

async function refreshAccessToken(token) {
  try {
    const response = await restClient.post("/auth/refresh", {
      refreshToken: token.refreshToken,
    });

    const refreshedTokens = response.data;

    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      accessTokenExpires: Date.now() + refreshedTokens.expiresIn * 1000,
      refreshToken: refreshedTokens.refreshToken || token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("nextAuth", credentials);
        const { username, password } = credentials;

        const response = await restClient.post("/auth/login", {
          username,
          password,
          expiresInMins: 30,
        });

        const user = response?.data;

        if (user) {
          return {
            ...user,
            accessTokenExpires: Date.now() + user.expiresIn * 1000,
          };
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 60 * 60, // 1 hour
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          accessToken: user.token,
          accessTokenExpires: Date.now() + user.expiresIn * 1000,
          refreshToken: user.refreshToken,
          user,
        };
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
  pages: {
    signIn: "/", // Custom sign-in page
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
