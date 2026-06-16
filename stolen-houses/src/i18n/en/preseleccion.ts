export const PRESELECCION_TEXTS = {
  metadata: {
    title: "Guided pre-selection",
    description:
      "Tell us what your ideal home looks like and we'll show you the closest matches.",
  },
  header: {
    eyebrow: "Guided pre-selection",
    title: "Find your next address",
    description:
      "Share your preferences in three steps. We will calculate the properties from the catalog that best match your vision.",
  },
  stepper: {
    progressLabel: (current: string, total: string) =>
      `Step ${current} of ${total}`,
  },
  steps: {
    location: {
      key: "location",
      indexLabel: "01",
      eyebrow: "Location & budget",
      title: "Where do you imagine your next address?",
      description:
        "If you don't have a specific area, you can leave the field empty. The budget helps us prioritize realistic options.",
      fields: {
        location: {
          label: "Desired location",
          placeholder: "Polanco, Mérida, Guadalajara...",
        },
        minPrice: {
          label: "Minimum budget",
          placeholder: "0",
        },
        maxPrice: {
          label: "Maximum budget",
          placeholder: "No limit",
        },
      },
    },
    spaces: {
      key: "spaces",
      indexLabel: "02",
      eyebrow: "Your spaces",
      title: "How much space do you need?",
      description:
        "Weigh what is essential: if you only need two bedrooms, don't increase the number just to aspire for more.",
      fields: {
        minBedrooms: {
          label: "Minimum bedrooms",
          placeholder: "0",
        },
        minBathrooms: {
          label: "Minimum bathrooms",
          placeholder: "0",
        },
        minArea: {
          label: "Minimum area",
          placeholder: "0",
          unitLabel: "m²",
        },
      },
    },
    style: {
      key: "style",
      indexLabel: "03",
      eyebrow: "Your style",
      title: "What makes your home special?",
      description:
        "Describe in a few words what you value most: terrace, garden, pool, view, quiet neighborhood. Strict preferences filter out properties that don't meet them.",
      fields: {
        keywords: {
          label: "Key features",
          placeholder: "Terrace, garden, pool, view, modern...",
        },
        featuredOnly: {
          label: "Featured properties only",
          hint: "Strict filter",
        },
        model3dOnly: {
          label: "Properties with 3D model only",
          hint: "Strict filter",
        },
      },
    },
    results: {
      key: "results",
      indexLabel: "04",
      eyebrow: "Results",
      title: "Your matches",
    },
  },
  navigation: {
    previousLabel: "Previous",
    nextLabel: "Next",
    finishLabel: "See matches",
    refineLabel: "Refine criteria",
    restartLabel: "Start over",
    catalogLabel: "View full catalog",
  },
  results: {
    summaryTitle: "Your search summary",
    summary: {
      location: "Location",
      anyLocation: "Any location",
      budget: "Budget",
      anyBudget: "No limit",
      budgetRange: (min: string, max: string) => `${min} – ${max}`,
      budgetMin: (min: string) => `From ${min}`,
      budgetMax: (max: string) => `Up to ${max}`,
      spaces: "Spaces",
      spacesValue: (bedrooms: string, bathrooms: string, area: string) =>
        `${bedrooms} bd · ${bathrooms} ba · ${area} m²`,
      spacesAny: "No minimum requirements",
      keywords: "Style",
      keywordsAny: "No keywords",
      filters: "Strict filters",
      filtersFeatured: "Featured",
      filtersModel3d: "3D View",
      filtersNone: "No strict filters",
    },
    list: {
      loading: "Calculating matches...",
      matchesTitle: "We found matches for you",
      matchesSummary: (count: string) =>
        `${count} properties from the catalog fit your vision, sorted by affinity.`,
      suggestionsTitle: "No exact matches found",
      suggestionsSummary:
        "These properties are the closest to your criteria. Consider relaxing a strict filter to broaden the search.",
      emptyTitle: "No properties in the catalog yet",
      emptySummary:
        "Come back later or contact an advisor to register your interest.",
    },
    card: {
      matchLabel: (percentage: string) => `${percentage}% affinity`,
      featuredBadge: "Featured",
      model3dBadge: "3D View",
      priceLabel: "Price",
      bedroomsLabel: "bd",
      bathroomsLabel: "ba",
      areaUnit: "m²",
      cta: "View property",
      noImage: "No image available",
      imageAltPrefix: "Property image",
    },
    fallback: {
      title: "Looking for something different?",
      description:
        "Soon you will be able to register an opportunity for our team to help you find the ideal home based on your criteria.",
    },
  },
} as const;

export type PreseleccionTexts = typeof PRESELECCION_TEXTS;
