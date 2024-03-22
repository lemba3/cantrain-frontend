// export { default } from "next-auth/middleware";
import { getServerSession } from "next-auth";
import { withAuth } from "next-auth/middleware"
import { getSession } from "next-auth/react";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  // function middleware(req) {
  //   console.log("token",req.nextauth.token)
  // },
  {
    callbacks: {
      authorized: async({ token }) => {
        console.log("token", token)
        if(token) {
          return true;
        }
        return false;
      },
    },
  }
)

export const config = { matcher: ["/dashboard/:path*", "/documents/:path*"] };

// export { default } from "next-auth/middleware";

// export const config = { matcher: ["/dashboard/:path*", "/documents/:patj*"] };