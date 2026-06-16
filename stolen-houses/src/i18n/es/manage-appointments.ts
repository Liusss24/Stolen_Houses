import {
  APPOINTMENT_STATUSES,
  type AppointmentStatus,
} from "@/entities/appointment/model/appointment.types";

export const MANAGE_APPOINTMENTS_TEXTS = {
  header: {
    badge: "Stolen Houses · Admin",
    title: "Gestión de citas",
    description:
      "Revisa y administra las solicitudes de visita registradas por los clientes.",
  },
  filters: {
    legend: "Filtrar por estado",
    allLabel: "Todas",
    countLabel: (count: string) => `${count} citas`,
  },
  list: {
    title: "Solicitudes",
    summary: (visible: string, total: string) =>
      `${visible} de ${total} citas`,
    loading: "Cargando citas...",
    empty: "Aún no hay citas registradas.",
    emptyFiltered: "No hay citas con este estado.",
  },
  card: {
    propertyLabel: "Propiedad",
    locationLabel: "Ubicación",
    clientLabel: "Cliente",
    contactLabel: "Contacto",
    scheduledForLabel: "Fecha solicitada",
    notesLabel: "Notas del cliente",
    noNotes: "Sin notas adicionales.",
    statusLabel: "Estado",
    statusUpdating: "Actualizando...",
    deleteLabel: "Eliminar cita",
    deleteConfirm: "¿Seguro que quieres eliminar esta cita?",
    createdAtLabel: "Solicitada",
    referenceLabel: "Referencia",
    convertLabel: "Convertir en oportunidad",
    convertedLabel: "Oportunidad creada",
  },
  status: {
    pending: "Pendiente",
    confirmed: "Confirmada",
    completed: "Completada",
    cancelled: "Cancelada",
  } as Record<AppointmentStatus, string>,
  messages: {
    statusUpdateSuccess: "Estado actualizado.",
    statusUpdateError: "No pudimos actualizar el estado.",
    deleteSuccess: "Cita eliminada.",
    deleteError: "No pudimos eliminar la cita.",
    loadError: "No pudimos cargar las citas.",
    convertSuccess: "Oportunidad creada desde esta cita.",
    convertError: "No pudimos crear la oportunidad.",
  },
} as const;

export type ManageAppointmentsTexts = typeof MANAGE_APPOINTMENTS_TEXTS;

export const APPOINTMENT_STATUS_LABELS: Record<AppointmentStatus, string> =
  MANAGE_APPOINTMENTS_TEXTS.status;

export { APPOINTMENT_STATUSES };
