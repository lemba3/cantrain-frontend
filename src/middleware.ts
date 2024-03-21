// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  // function middleware(req) {
  //   console.log("token",req.nextauth.token)
  // },
  {
    callbacks: {
      authorized: ({ token }) => {
        // const session = await getServerSession(authOptions);
        if(token) {
          return true;
        }
        return false;
      },
    },
  }
)

export const config = { matcher: ["/dashboard/:path*", "/documents/:path*"] };