export const AUTH_TEXTS = {
  login: {
    metadataTitle: "Login",
    metadataDescription:
      "Acceso a la plataforma con credenciales de ejemplo para Administrador o Cliente.",
    header: {
      badge: "Stolen Houses",
      title: "Iniciar sesión",
      description:
        "Selecciona el tipo de acceso e ingresa las credenciales de ejemplo.",
    },
    form: {
      roleLabel: "Tipo de acceso",
      roles: {
        admin: "Administrador",
        client: "Cliente (público)",
      },
      credentialHintPrefix: "Ejemplo",
      credentials: {
        admin: "admin@admin.com / 1234",
        client: "cliente@cliente.com / 1234",
      },
      email: {
        label: "Correo",
        placeholder: "correo@ejemplo.com",
      },
      password: {
        label: "Contraseña",
        placeholder: "••••",
      },
      submit: "Ingresar",
      submitting: "Ingresando...",
    },
    errors: {
      invalidCredentials: "Credenciales inválidas.",
      invalidPayload: "Datos inválidos. Revisa los campos e intenta nuevamente.",
      unknown: "Ocurrió un error inesperado. Intenta nuevamente.",
    },
  },
} as const;

export type AuthTexts = typeof AUTH_TEXTS;
