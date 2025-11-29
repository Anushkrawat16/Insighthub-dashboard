export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/insights/:path*", "/upload/:path*", "/reports/:path*", "/profile/:path*", "/settings/:path*"],
};

