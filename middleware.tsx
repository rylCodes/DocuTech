import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const isLoggedIn = !!token;

  // Define paths that need authentication
  const protectedPaths = [
    "/documentation/settings",
    "/create",
    "/update",
    "/update/*",
    "/user/*",
    "/user/manage-documentation",
    "/user/profile",
  ];

  const loginPath = "/login";

  if (isLoggedIn && request.nextUrl.pathname.startsWith(loginPath)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path)) &&
    !isLoggedIn
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
