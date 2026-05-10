import { AUTH_ROLES, type AuthRole } from "./auth.constants";

export type AuthCredential = {
  email: string;
  password: string;
};

export const AUTH_EXAMPLE_CREDENTIALS: Record<AuthRole, AuthCredential> = {
  [AUTH_ROLES.admin]: {
    email: "admin@admin.com",
    password: "1234",
  },
  [AUTH_ROLES.client]: {
    email: "cliente@cliente.com",
    password: "1234",
  },
};

export const AUTH_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
