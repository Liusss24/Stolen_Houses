export const OPPORTUNITY_API_ROUTES = {
  collection: "/api/opportunities",
  byId: (id: string) => `/api/opportunities/${id}`,
} as const;

export const OPPORTUNITY_API_MESSAGES = {
  loadError: "No se pudieron cargar las oportunidades.",
  createError: "No se pudo crear la oportunidad.",
  updateError: "No se pudo actualizar la oportunidad.",
  deleteError: "No se pudo eliminar la oportunidad.",
  notFound: "Oportunidad no encontrada.",
  invalidPayload: "Datos inválidos para crear la oportunidad.",
  propertyNotFound: "La propiedad asociada ya no está disponible.",
  deletedSuccess: "Oportunidad eliminada correctamente.",
} as const;
