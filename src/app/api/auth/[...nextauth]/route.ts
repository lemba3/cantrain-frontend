import { NextAuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials"

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_BACKEND_API}` + "/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  });
  console.log("refreshed");

  const response = await res.json();

  return {
    ...token,
    backendTokens: response,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@some.com"
        },
        password: {
          label: "Password",
          type: "password"
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_BACKEND_API}` + "/auth/login", {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status == 401) {
          // console.log(res.statusText);
          return null;
        }
        const user = await res.json();
        // if(user && user.user.req_pass_change) {
        //   return null;
        // }
        return user;
      },
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.backendTokens.expiresIn) {
        return token;
      }

      return await refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },
  },
  pages: {
    signIn: "/login"
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };