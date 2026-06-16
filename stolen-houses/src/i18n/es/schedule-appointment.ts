export const SCHEDULE_APPOINTMENT_TEXTS = {
  metadata: {
    titlePrefix: "Agendar visita",
    descriptionPrefix: "Reserva una visita guiada para",
  },
  breadcrumb: {
    catalogLabel: "Catálogo",
    currentLabel: "Agendar cita",
    separator: "·",
  },
  header: {
    eyebrow: "Agendar visita",
    title: "Conoce la propiedad en persona",
    description:
      "Completa tus datos y un asesor confirmará la cita en menos de 24 horas.",
  },
  property: {
    sectionTitle: "Propiedad seleccionada",
    locationLabel: "Ubicación",
    priceLabel: "Precio referencial",
    specsLabel: "Ficha técnica",
    bedroomsLabel: "Recámaras",
    bathroomsLabel: "Baños",
    areaLabel: "Área",
    areaUnit: "m²",
  },
  form: {
    sectionTitle: "Tus datos",
    fields: {
      name: {
        label: "Nombre completo",
        placeholder: "Aaron Rodríguez",
      },
      email: {
        label: "Correo electrónico",
        placeholder: "tu@correo.com",
      },
      phone: {
        label: "Teléfono",
        placeholder: "+52 55 0000 0000",
      },
      scheduledFor: {
        label: "Fecha y hora preferida",
      },
      notes: {
        label: "Notas adicionales (opcional)",
        placeholder:
          "Cuéntanos algún detalle que debamos saber para tu visita.",
      },
    },
    submit: "Solicitar cita",
    submitting: "Enviando solicitud...",
    backLink: "Volver a la propiedad",
  },
  success: {
    eyebrow: "Solicitud recibida",
    title: "Tu cita está en revisión",
    description:
      "Un asesor se pondrá en contacto contigo en menos de 24 horas para confirmar la fecha. Recibirás los detalles en el correo que registraste.",
    summaryTitle: "Resumen de tu solicitud",
    summaryClient: "Cliente",
    summaryEmail: "Correo",
    summaryScheduledFor: "Fecha solicitada",
    backToProperty: "Volver a la propiedad",
    backToCatalog: "Explorar más propiedades",
  },
  errors: {
    invalidPayload: "Revisa los datos: faltan campos por completar.",
    pastDate: "La fecha y hora deben ser posteriores al momento actual.",
    generic: "No pudimos enviar tu solicitud. Intenta nuevamente más tarde.",
  },
} as const;

export type ScheduleAppointmentTexts = typeof SCHEDULE_APPOINTMENT_TEXTS;
