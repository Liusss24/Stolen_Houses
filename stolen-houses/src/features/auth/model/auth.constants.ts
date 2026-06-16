export const AUTH_ROLES = {
  admin: "admin",
  client: "client",
} as const;

export type AuthRole = (typeof AUTH_ROLES)[keyof typeof AUTH_ROLES];

export const AUTH_COOKIE_NAME = "sh_role";

export const AUTH_LOGIN_PATH = "/login";
export const AUTH_ADMIN_PREFIX = "/dashboard";
export const AUTH_CLIENT_HOME_PATH = "/";

export const AUTH_PUBLIC_PATHS = ["/", AUTH_LOGIN_PATH] as const;
