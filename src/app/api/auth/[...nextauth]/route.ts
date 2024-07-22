import NextAuth, { NextAuthOptions, User, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import restClient from "@/api/restClient";
import { JWT } from "next-auth/jwt";

/*
 * TODO: replace with auth JS
 * NEXT_AUTH HACKS
 */
interface Credentials extends Record<"username" | "password", string> {
  username: string;
  password: string;
}

interface IUser extends User {
  token?: string;
  refreshToken?: string;
}

interface ISession extends Session {
  accessToken?: string;
  error?: string;
}

type TUser = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  refreshToken: string;
};

async function refreshAccessToken(token: JWT) {
  try {
    const response = await restClient.post("/auth/refresh", {
      refreshToken: token.refreshToken,
    });

    const refreshedTokens = response.data;

    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      accessTokenExpires: Date.now() + refreshedTokens.expiresIn * 1000,
      refreshToken: refreshedTokens.refreshToken || token.refreshToken,
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
      async authorize(credentials?: Credentials) {
        if (!credentials) return null;

        const { username, password } = credentials;

        const response = await restClient.post("/auth/login", {
          username,
          password,
          expiresInMins: 24 * 60, // 24hrs. stupid API,
        });

        const user = response?.data;

        if (user) return user;

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
    async jwt({ token, user }: { token: JWT; user: IUser }) {
      if (user) {
        return {
          ...token,
          accessToken: user.token,
          refreshToken: user.refreshToken,
          user,
        };
      }

      if (Date.now() < <number>token.accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ session, token }: { session: ISession; token: JWT }) {
      session.user = <IUser>token.user;
      session.accessToken = <string>token.accessToken;
      session.error = <string>token.error;
      return session;
    },
  },
  pages: {
    signIn: "/", // Custom sign-in page
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
