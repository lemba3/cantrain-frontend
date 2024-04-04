import { authOptions } from "@/app/lib/auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";

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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// const handler = NextAuth(authOptions);

// export default async function (req: NextApiRequest, res: NextApiResponse) {
//   await handler(req, res);
// }