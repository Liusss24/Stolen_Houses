export const PROPERTY_SEARCH_TEXTS = {
  page: {
    metadataTitle: "Properties",
    metadataDescription:
      "Explore properties with smart filters and results sorted by similarity.",
    eyebrow: "Smart catalog",
    title: "Find properties by similarity",
    description:
      "Set your preferences and get results ordered from the highest match to the lowest.",
  },
  filters: {
    title: "Search filters",
    description:
      "Text and numeric filters are used to calculate similarity. Featured and 360 view options act as strict filters.",
    fields: {
      query: "General search",
      location: "Location",
      minPrice: "Minimum price",
      maxPrice: "Maximum price",
      minBedrooms: "Minimum bedrooms",
      minBathrooms: "Minimum bathrooms",
      minArea: "Minimum area",
      featuredOnly: "Featured properties only",
      model3dOnly: "Properties with 3D model only",
    },
    placeholders: {
      query: "E.g. terrace, garden, modern, pool",
      location: "E.g. Escazú, Heredia, Cartago",
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
      reset: "Clear filters",
    },
  },
  results: {
    title: "Results",
    summary: (visible: string, total: string) =>
      `${visible} of ${total} available properties`,
    activeFilters: (count: string) => `${count} active filters`,
    defaultOrder:
      "With no similarity filters active, results are sorted by featured and most recent.",
    noResults:
      "We could not find properties matching the strict filters selected.",
    emptyCatalog: "There are no registered properties yet.",
    loading: "Loading properties...",
  },
  card: {
    featured: "Featured",
    model3d: "3D View",
    match: (percentage: string) => `${percentage}% match`,
    labels: {
      price: "Price",
      bedrooms: "Bedrooms",
      bathrooms: "Bathrooms",
      area: "Area",
    },
    units: {
      area: "m²",
    },
    imageAltPrefix: "Property image",
    noImage: "No image available",
  },
  feedback: {
    loadError:
      "Could not load properties at this time. Please try again later.",
  },
} as const;

export type PropertySearchTexts = typeof PROPERTY_SEARCH_TEXTS;
