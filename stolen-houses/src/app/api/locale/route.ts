import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  LOCALE_COOKIE_NAME,
  LOCALE_DEFAULT,
  LOCALE_OPTIONS,
  type Locale,
} from "@/shared/constants/locale";

export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const lang = searchParams.get("lang");
  const returnTo = searchParams.get("returnTo") ?? "/";

  const locale: Locale = (LOCALE_OPTIONS as readonly string[]).includes(
    lang ?? "",
  )
    ? (lang as Locale)
    : LOCALE_DEFAULT;

  const response = NextResponse.redirect(new URL(returnTo, request.url));
  response.cookies.set(LOCALE_COOKIE_NAME, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return response;
}
