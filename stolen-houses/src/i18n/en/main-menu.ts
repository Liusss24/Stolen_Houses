export const MAIN_MENU_TEXTS = {
  public: {
    metadataTitle: "Home",
    metadataDescription:
      "Main menu to access the site's features.",
    header: {
      badge: "Stolen Houses - Client",
      title: "Main menu",
      description: "Quickly access the available sections.",
    },
    items: [
      {
        href: "/propiedades",
        title: "Search properties",
        description:
          "Explore the catalog with smart filters and results sorted by similarity.",
        cta: "Go to properties",
      },
      {
        href: "/preseleccion",
        title: "Pre-selection",
        description:
          "Review your saved properties to compare them and decide.",
        cta: "View pre-selection",
      },
    ],
  },
  admin: {
    metadataTitle: "Dashboard",
    metadataDescription:
      "Administration panel for managing internal features.",
    header: {
      badge: "Stolen Houses - Admin",
      title: "Dashboard",
      description: "Manage the system's administrative features.",
    },
    items: [
      {
        href: "/dashboard/propiedades",
        title: "Properties",
        description: "Create, edit and delete properties from the catalog.",
        cta: "Manage properties",
      },
      {
        href: "/dashboard/citas",
        title: "Appointments",
        description: "Manage client appointments with the sales team.",
        cta: "View appointments",
      },
      {
        href: "/dashboard/oportunidades",
        title: "Opportunities",
        description:
          "Record and track the sales pipeline until each case is closed or discarded.",
        cta: "View pipeline",
      },
    ],
  },
  preseleccion: {
    metadataTitle: "Pre-selection",
    metadataDescription: "List of properties saved by the client.",
    header: {
      badge: "Stolen Houses - Client",
      title: "Pre-selection",
      description: "This section is under preparation.",
    },
    body: {
      message:
        "Soon you will be able to save properties and view them here to compare them.",
      actionLabel: "Explore properties",
      actionHref: "/propiedades",
    },
  },
  citas: {
    metadataTitle: "Appointments",
    metadataDescription: "Appointment management (admin).",
    header: {
      badge: "Stolen Houses - Admin",
      title: "Appointments",
      description: "This section is under preparation.",
    },
    body: {
      message:
        "Soon you will be able to create, assign and manage appointments from this panel.",
      actionLabel: "Back to dashboard",
      actionHref: "/dashboard",
    },
  },
} as const;
