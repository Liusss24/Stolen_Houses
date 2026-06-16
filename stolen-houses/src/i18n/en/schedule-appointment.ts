export const SCHEDULE_APPOINTMENT_TEXTS = {
  metadata: {
    titlePrefix: "Schedule visit",
    descriptionPrefix: "Book a guided visit for",
  },
  breadcrumb: {
    catalogLabel: "Catalog",
    currentLabel: "Schedule appointment",
    separator: "·",
  },
  header: {
    eyebrow: "Schedule visit",
    title: "See the property in person",
    description:
      "Fill in your details and an advisor will confirm the appointment within 24 hours.",
  },
  property: {
    sectionTitle: "Selected property",
    locationLabel: "Location",
    priceLabel: "Reference price",
    specsLabel: "Technical details",
    bedroomsLabel: "Bedrooms",
    bathroomsLabel: "Bathrooms",
    areaLabel: "Area",
    areaUnit: "m²",
  },
  form: {
    sectionTitle: "Your details",
    fields: {
      name: {
        label: "Full name",
        placeholder: "Aaron Rodriguez",
      },
      email: {
        label: "Email address",
        placeholder: "you@email.com",
      },
      phone: {
        label: "Phone",
        placeholder: "+52 55 0000 0000",
      },
      scheduledFor: {
        label: "Preferred date and time",
      },
      notes: {
        label: "Additional notes (optional)",
        placeholder: "Tell us any detail we should know for your visit.",
      },
    },
    submit: "Request appointment",
    submitting: "Sending request...",
    backLink: "Back to property",
  },
  success: {
    eyebrow: "Request received",
    title: "Your appointment is under review",
    description:
      "An advisor will contact you within 24 hours to confirm the date. You will receive the details at the email you registered.",
    summaryTitle: "Your request summary",
    summaryClient: "Client",
    summaryEmail: "Email",
    summaryScheduledFor: "Requested date",
    backToProperty: "Back to property",
    backToCatalog: "Explore more properties",
  },
  errors: {
    invalidPayload: "Please check the data: some fields are missing.",
    pastDate: "The date and time must be later than the current moment.",
    generic: "We could not send your request. Please try again later.",
  },
} as const;

export type ScheduleAppointmentTexts = typeof SCHEDULE_APPOINTMENT_TEXTS;
