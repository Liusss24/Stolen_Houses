export const AUTH_TEXTS = {
  login: {
    metadataTitle: "Login",
    metadataDescription:
      "Platform access with example credentials for Administrator or Client.",
    header: {
      badge: "Stolen Houses",
      title: "Sign in",
      description:
        "Select the access type and enter the example credentials.",
    },
    form: {
      roleLabel: "Access type",
      roles: {
        admin: "Administrator",
        client: "Client (public)",
      },
      credentialHintPrefix: "Example",
      credentials: {
        admin: "admin@admin.com / 1234",
        client: "client@client.com / 1234",
      },
      email: {
        label: "Email",
        placeholder: "email@example.com",
      },
      password: {
        label: "Password",
        placeholder: "••••",
      },
      submit: "Sign in",
      submitting: "Signing in...",
    },
    errors: {
      invalidCredentials: "Invalid credentials.",
      invalidPayload: "Invalid data. Please check the fields and try again.",
      unknown: "An unexpected error occurred. Please try again.",
    },
  },
} as const;

export type AuthTexts = typeof AUTH_TEXTS;
