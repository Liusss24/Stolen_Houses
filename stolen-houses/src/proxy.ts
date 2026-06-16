import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  AUTH_ADMIN_PREFIX,
  AUTH_COOKIE_NAME,
  AUTH_LOGIN_PATH,
  AUTH_PUBLIC_PATHS,
} from "@/features/auth/model/auth.constants";

function redirectToLogin(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = AUTH_LOGIN_PATH;
  url.search = "";

  return NextResponse.redirect(url);
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if ((AUTH_PUBLIC_PATHS as readonly string[]).includes(pathname)) {
    return NextResponse.next();
  }

  const role = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!role) {
    return redirectToLogin(request);
  }

  if (pathname.startsWith(AUTH_ADMIN_PREFIX) && role !== "admin") {
    return redirectToLogin(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images|models|fonts).*)",
  ],
};
