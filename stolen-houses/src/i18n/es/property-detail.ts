export const PROPERTY_DETAIL_TEXTS = {
  metadata: {
    descriptionPrefix: "Conoce los detalles de",
    descriptionSuffix: "y agenda una visita guiada.",
  },
  breadcrumb: {
    catalogLabel: "Catálogo",
    backLabel: "Volver al catálogo",
    separator: "·",
  },
  gallery: {
    altPrefix: "Vista principal de",
    noImage: "Imagen no disponible",
    model3dBadge: "Vista 3D · Interactivo",
    featuredBadge: "Propiedad destacada",
  },
  summary: {
    eyebrow: "Propiedad en venta",
    specs: {
      areaLabel: "M²",
      bedroomsLabel: "Recámaras",
      bathroomsLabel: "Baños",
    },
    descriptionTitle: "Sobre esta propiedad",
    metaTitle: "Ficha técnica",
    metaLabels: {
      createdAt: "Publicada",
      updatedAt: "Última actualización",
      identifier: "Referencia",
    },
  },
  actions: {
    title: "Tu próximo hogar",
    priceLabel: "Precio referencial",
    scheduleLabel: "Agendar cita",
    saveLabel: "Guardar en preselección",
    pendingNote: "Funcionalidades disponibles próximamente.",
    backLink: "Ver más propiedades",
  },
  notFound: {
    eyebrow: "Catálogo",
    title: "Esta propiedad ya no está disponible",
    description:
      "Es posible que haya sido retirada del catálogo o que el enlace esté incompleto. Continúa explorando el resto de la colección.",
    action: "Volver al catálogo",
  },
} as const;

export type PropertyDetailTexts = typeof PROPERTY_DETAIL_TEXTS;
