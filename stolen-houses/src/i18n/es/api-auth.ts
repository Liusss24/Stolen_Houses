export const API_AUTH_MESSAGES = {
  invalidPayload: "Datos inválidos.",
  invalidCredentials: "Credenciales inválidas.",
} as const;

export type ApiAuthMessages = typeof API_AUTH_MESSAGES;
