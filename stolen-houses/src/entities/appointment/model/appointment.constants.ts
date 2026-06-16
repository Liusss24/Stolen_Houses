export const APPOINTMENT_API_ROUTES = {
  collection: "/api/appointments",
  byId: (id: string) => `/api/appointments/${id}`,
} as const;

export const APPOINTMENT_API_MESSAGES = {
  loadError: "No se pudieron cargar las citas.",
  createError: "No se pudo crear la cita.",
  updateError: "No se pudo actualizar la cita.",
  deleteError: "No se pudo eliminar la cita.",
  notFound: "Cita no encontrada.",
  invalidPayload: "Datos inválidos para crear la cita.",
  deletedSuccess: "Cita eliminada correctamente.",
} as const;
