export const PRESELECCION_TEXTS = {
  metadata: {
    title: "Preselección guiada",
    description:
      "Cuéntanos cómo es tu hogar ideal y te mostraremos las propiedades que más se acercan.",
  },
  header: {
    eyebrow: "Preselección guiada",
    title: "Encuentra tu próxima dirección",
    description:
      "Comparte tus preferencias en tres pasos. Calcularemos las propiedades del catálogo que mejor se acercan a tu visión.",
  },
  stepper: {
    progressLabel: (current: string, total: string) =>
      `Paso ${current} de ${total}`,
  },
  steps: {
    location: {
      key: "location",
      indexLabel: "01",
      eyebrow: "Lugar y presupuesto",
      title: "¿Dónde imaginas tu próxima dirección?",
      description:
        "Si no tienes una zona definida puedes dejar el campo vacío. El presupuesto nos ayuda a priorizar opciones realistas.",
      fields: {
        location: {
          label: "Ubicación deseada",
          placeholder: "Polanco, Mérida, Guadalajara...",
        },
        minPrice: {
          label: "Presupuesto mínimo",
          placeholder: "0",
        },
        maxPrice: {
          label: "Presupuesto máximo",
          placeholder: "Sin tope",
        },
      },
    },
    spaces: {
      key: "spaces",
      indexLabel: "02",
      eyebrow: "Tus espacios",
      title: "¿Cuánto espacio necesitas?",
      description:
        "Pondera lo esencial: si solo necesitas dos recámaras, no aumentes el número solo por aspirar a más.",
      fields: {
        minBedrooms: {
          label: "Recámaras mínimas",
          placeholder: "0",
        },
        minBathrooms: {
          label: "Baños mínimos",
          placeholder: "0",
        },
        minArea: {
          label: "Área mínima",
          placeholder: "0",
          unitLabel: "m²",
        },
      },
    },
    style: {
      key: "style",
      indexLabel: "03",
      eyebrow: "Tu estilo",
      title: "¿Qué hace especial a tu hogar?",
      description:
        "Describe en pocas palabras lo que más valoras: terraza, jardín, piscina, vista, vecindario tranquilo. Las preferencias estrictas filtran propiedades que no las cumplen.",
      fields: {
        keywords: {
          label: "Características clave",
          placeholder: "Terraza, jardín, piscina, vista, moderna...",
        },
        featuredOnly: {
          label: "Solo propiedades destacadas",
          hint: "Filtro estricto",
        },
        model3dOnly: {
          label: "Solo propiedades con modelo 3D",
          hint: "Filtro estricto",
        },
      },
    },
    results: {
      key: "results",
      indexLabel: "04",
      eyebrow: "Resultados",
      title: "Tus coincidencias",
    },
  },
  navigation: {
    previousLabel: "Anterior",
    nextLabel: "Siguiente",
    finishLabel: "Ver coincidencias",
    refineLabel: "Refinar criterios",
    restartLabel: "Empezar de nuevo",
    catalogLabel: "Ver catálogo completo",
  },
  results: {
    summaryTitle: "Resumen de tu búsqueda",
    summary: {
      location: "Ubicación",
      anyLocation: "Cualquier ubicación",
      budget: "Presupuesto",
      anyBudget: "Sin tope",
      budgetRange: (min: string, max: string) => `${min} – ${max}`,
      budgetMin: (min: string) => `Desde ${min}`,
      budgetMax: (max: string) => `Hasta ${max}`,
      spaces: "Espacios",
      spacesValue: (bedrooms: string, bathrooms: string, area: string) =>
        `${bedrooms} rec · ${bathrooms} ba · ${area} m²`,
      spacesAny: "Sin requisitos mínimos",
      keywords: "Estilo",
      keywordsAny: "Sin palabras clave",
      filters: "Filtros estrictos",
      filtersFeatured: "Destacadas",
      filtersModel3d: "Vista 3D",
      filtersNone: "Sin filtros estrictos",
    },
    list: {
      loading: "Calculando coincidencias...",
      matchesTitle: "Encontramos coincidencias para ti",
      matchesSummary: (count: string) =>
        `${count} propiedades del catálogo encajan con tu visión, ordenadas por afinidad.`,
      suggestionsTitle: "No encontramos coincidencias exactas",
      suggestionsSummary:
        "Estas propiedades son lo más cercano a tus criterios. Considera relajar algún filtro estricto para ampliar la búsqueda.",
      emptyTitle: "Aún no hay propiedades en el catálogo",
      emptySummary:
        "Vuelve más tarde o comunícate con un asesor para registrar tu interés.",
    },
    card: {
      matchLabel: (percentage: string) => `${percentage}% de afinidad`,
      featuredBadge: "Destacada",
      model3dBadge: "Vista 3D",
      priceLabel: "Precio",
      bedroomsLabel: "rec",
      bathroomsLabel: "ba",
      areaUnit: "m²",
      cta: "Ver propiedad",
      noImage: "Sin imagen disponible",
      imageAltPrefix: "Imagen de la propiedad",
    },
    fallback: {
      title: "¿Buscas algo distinto?",
      description:
        "Próximamente podrás registrar una oportunidad para que nuestro equipo te ayude a encontrar el hogar ideal a partir de tus criterios.",
    },
  },
} as const;

export type PreseleccionTexts = typeof PRESELECCION_TEXTS;
