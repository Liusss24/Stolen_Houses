export const API_AUTH_MESSAGES = {
  invalidPayload: "Invalid data.",
  invalidCredentials: "Invalid credentials.",
} as const;

export type ApiAuthMessages = typeof API_AUTH_MESSAGES;
