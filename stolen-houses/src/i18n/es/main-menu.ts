export const MAIN_MENU_TEXTS = {
  public: {
    metadataTitle: "Inicio",
    metadataDescription:
      "Menú principal para acceder a las funcionalidades del sitio.",
    header: {
      badge: "Stolen Houses - Cliente",
      title: "Menú principal",
      description: "Accede rápidamente a las secciones disponibles.",
    },
    items: [
      {
        href: "/propiedades",
        title: "Buscar propiedades",
        description:
          "Explora el catálogo con filtros inteligentes y resultados ordenados por semejanza.",
        cta: "Ir a propiedades",
      },
      {
        href: "/preseleccion",
        title: "Preselección",
        description:
          "Revisa tus propiedades guardadas para compararlas y decidir.",
        cta: "Ver preselección",
      },
    ],
  },
  admin: {
    metadataTitle: "Dashboard",
    metadataDescription:
      "Panel de administración para gestionar las funcionalidades internas.",
    header: {
      badge: "Stolen Houses - Admin",
      title: "Dashboard",
      description: "Gestiona las funcionalidades administrativas del sistema.",
    },
    items: [
      {
        href: "/dashboard/propiedades",
        title: "Propiedades",
        description: "Crea, edita y elimina propiedades del catálogo.",
        cta: "Gestionar propiedades",
      },
      {
        href: "/dashboard/citas",
        title: "Citas",
        description: "Administra las citas de clientes con el equipo de ventas.",
        cta: "Ver citas",
      },
      {
        href: "/dashboard/oportunidades",
        title: "Oportunidades",
        description:
          "Registra y da seguimiento al pipeline de ventas hasta cerrar o desechar cada caso.",
        cta: "Ver pipeline",
      },
    ],
  },
  preseleccion: {
    metadataTitle: "Preselección",
    metadataDescription: "Lista de propiedades guardadas por el cliente.",
    header: {
      badge: "Stolen Houses - Cliente",
      title: "Preselección",
      description: "Esta sección está en preparación.",
    },
    body: {
      message:
        "Próximamente podrás guardar propiedades y verlas aquí para compararlas.",
      actionLabel: "Explorar propiedades",
      actionHref: "/propiedades",
    },
  },
  citas: {
    metadataTitle: "Citas",
    metadataDescription: "Gestión de citas (admin).",
    header: {
      badge: "Stolen Houses - Admin",
      title: "Citas",
      description: "Esta sección está en preparación.",
    },
    body: {
      message:
        "Próximamente podrás crear, asignar y administrar citas desde este panel.",
      actionLabel: "Volver al dashboard",
      actionHref: "/dashboard",
    },
  },
} as const;
