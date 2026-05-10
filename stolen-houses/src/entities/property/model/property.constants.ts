export const PROPERTY_API_ROUTES = {
  collection: "/api/properties",
  byId: (id: string) => `/api/properties/${id}`,
} as const;

export const PROPERTY_API_MESSAGES = {
  loadError: "No se pudieron cargar las propiedades.",
  createError: "No se pudo crear la propiedad.",
  updateError: "No se pudo actualizar la propiedad.",
  deleteError: "No se pudo eliminar la propiedad.",
  notFound: "Propiedad no encontrada.",
  invalidPayload: "Datos inválidos para crear la propiedad.",
  deletedSuccess: "Propiedad eliminada correctamente.",
} as const;