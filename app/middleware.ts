import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/"]
});

export const config = {
  runtime: {
    segment: {
      matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
    }
  }
};
