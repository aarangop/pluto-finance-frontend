import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = request.nextUrl.pathname;

  // Public paths that don't require authentication
  const publicPaths = ["/auth/login", "/auth/signup", "/"];
  const isPublicPath = publicPaths.includes(path);

  // Get the token from the session
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Redirect to login if accessing a protected route without being authenticated
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Redirect to dashboard if user is already logged in and trying to access login page
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Specify the paths that should be protected
export const config = {
  matcher: ["/", "/dashboard/:path*", "/auth/login"],
};
