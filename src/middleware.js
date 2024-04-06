import { NextResponse } from "next/server";

export async function middleware(request) {
  const userId =  request.cookies.get("userId")?.value;
  const role = request.cookies.get("role")?.value;
  const isAccessExpired = request.cookies.get("expirationDate")?.value;

  const protectedRoutes = ["/whistlist", "/resume", "/applications"];
  const shouldAuthenticate =
    (!userId ||  Date.now() > isAccessExpired) &&
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));
  const requiresBusinessRole =
    request.nextUrl.pathname.startsWith("/business") && (!userId ||  Date.now() > isAccessExpired || role !== "employer");
  const requiresAdminRole =
    request.nextUrl.pathname.startsWith("/admin") && (!userId ||  Date.now() > isAccessExpired || role !== "admin");

    if (shouldAuthenticate) {
      const response = NextResponse.redirect(new URL("/auth/login", request.url));
      return response;
    }
    if (requiresBusinessRole || requiresAdminRole) {
      const response = NextResponse.redirect(new URL("/notFound", request.url));
      return response;
    }

    return NextResponse.next();
}
