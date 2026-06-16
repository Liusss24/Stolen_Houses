export const PROPERTY_DETAIL_TEXTS = {
  metadata: {
    descriptionPrefix: "Learn the details of",
    descriptionSuffix: "and schedule a guided visit.",
  },
  breadcrumb: {
    catalogLabel: "Catalog",
    backLabel: "Back to catalog",
    separator: "·",
  },
  gallery: {
    altPrefix: "Main view of",
    noImage: "Image not available",
    model3dBadge: "3D View · Interactive",
    featuredBadge: "Featured property",
  },
  summary: {
    eyebrow: "Property for sale",
    specs: {
      areaLabel: "SQ M",
      bedroomsLabel: "Bedrooms",
      bathroomsLabel: "Bathrooms",
    },
    descriptionTitle: "About this property",
    metaTitle: "Technical details",
    metaLabels: {
      createdAt: "Published",
      updatedAt: "Last update",
      identifier: "Reference",
    },
  },
  actions: {
    title: "Your next home",
    priceLabel: "Reference price",
    scheduleLabel: "Schedule appointment",
    saveLabel: "Save to pre-selection",
    pendingNote: "Features available soon.",
    backLink: "View more properties",
  },
  notFound: {
    eyebrow: "Catalog",
    title: "This property is no longer available",
    description:
      "It may have been removed from the catalog or the link may be incomplete. Continue exploring the rest of the collection.",
    action: "Back to catalog",
  },
} as const;

export type PropertyDetailTexts = typeof PROPERTY_DETAIL_TEXTS;
