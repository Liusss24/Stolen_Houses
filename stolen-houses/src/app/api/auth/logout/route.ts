import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import {
  AUTH_CLIENT_HOME_PATH,
  AUTH_COOKIE_NAME,
} from "@/features/auth/model/auth.constants";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);

  return NextResponse.redirect(new URL(AUTH_CLIENT_HOME_PATH, request.url));
}
