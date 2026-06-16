export const PROPERTY_SEARCH_TEXTS = {
  page: {
    metadataTitle: "Propiedades",
    metadataDescription:
      "Explora propiedades con filtros inteligentes y resultados ordenados por semejanza.",
    eyebrow: "Catálogo inteligente",
    title: "Encuentra propiedades por semejanza",
    description:
      "Define tus preferencias y obtén resultados ordenados desde la mayor coincidencia hasta la menor.",
  },
  filters: {
    title: "Filtros de búsqueda",
    description:
      "Los filtros de texto y numéricos se usan para calcular la semejanza. Las opciones de destacadas y vista 360 actúan como filtros estrictos.",
    fields: {
      query: "Búsqueda general",
      location: "Ubicación",
      minPrice: "Precio mínimo",
      maxPrice: "Precio máximo",
      minBedrooms: "Habitaciones mínimas",
      minBathrooms: "Baños mínimos",
      minArea: "Área mínima",
      featuredOnly: "Solo propiedades destacadas",
      model3dOnly: "Solo propiedades con modelo 3D",
    },
    placeholders: {
      query: "Ej. terraza, jardín, moderna, piscina",
      location: "Ej. Escazú, Heredia, Cartago",
      minPrice: "0",
      maxPrice: "0",
      minBedrooms: "0",
      minBathrooms: "0",
      minArea: "0",
    },
    helpers: {
      areaUnit: "m²",
    },
    buttons: {
      reset: "Limpiar filtros",
    },
  },
  results: {
    title: "Resultados",
    summary: (visible: string, total: string) =>
      `${visible} de ${total} propiedades disponibles`,
    activeFilters: (count: string) => `${count} filtros activos`,
    defaultOrder:
      "Sin filtros de semejanza activos, los resultados se ordenan por destacadas y más recientes.",
    noResults:
      "No encontramos propiedades que cumplan con los filtros estrictos seleccionados.",
    emptyCatalog: "Todavía no hay propiedades registradas.",
    loading: "Cargando propiedades...",
  },
  card: {
    featured: "Destacada",
    model3d: "Vista 3D",
    match: (percentage: string) => `${percentage}% de semejanza`,
    labels: {
      price: "Precio",
      bedrooms: "Habitaciones",
      bathrooms: "Baños",
      area: "Área",
    },
    units: {
      area: "m²",
    },
    imageAltPrefix: "Imagen de la propiedad",
    noImage: "Sin imagen disponible",
  },
  feedback: {
    loadError:
      "No se pudieron cargar las propiedades en este momento. Intenta nuevamente más tarde.",
  },
} as const;

export type PropertySearchTexts = typeof PROPERTY_SEARCH_TEXTS;