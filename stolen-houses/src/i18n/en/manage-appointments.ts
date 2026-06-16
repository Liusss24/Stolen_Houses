import {
  APPOINTMENT_STATUSES,
  type AppointmentStatus,
} from "@/entities/appointment/model/appointment.types";

export const MANAGE_APPOINTMENTS_TEXTS = {
  header: {
    badge: "Stolen Houses · Admin",
    title: "Appointment management",
    description:
      "Review and manage visit requests registered by clients.",
  },
  filters: {
    legend: "Filter by status",
    allLabel: "All",
    countLabel: (count: string) => `${count} appointments`,
  },
  list: {
    title: "Requests",
    summary: (visible: string, total: string) =>
      `${visible} of ${total} appointments`,
    loading: "Loading appointments...",
    empty: "No appointments registered yet.",
    emptyFiltered: "No appointments with this status.",
  },
  card: {
    propertyLabel: "Property",
    locationLabel: "Location",
    clientLabel: "Client",
    contactLabel: "Contact",
    scheduledForLabel: "Requested date",
    notesLabel: "Client notes",
    noNotes: "No additional notes.",
    statusLabel: "Status",
    statusUpdating: "Updating...",
    deleteLabel: "Delete appointment",
    deleteConfirm: "Are you sure you want to delete this appointment?",
    createdAtLabel: "Requested",
    referenceLabel: "Reference",
    convertLabel: "Convert to opportunity",
    convertedLabel: "Opportunity created",
  },
  status: {
    pending: "Pending",
    confirmed: "Confirmed",
    completed: "Completed",
    cancelled: "Cancelled",
  } as Record<AppointmentStatus, string>,
  messages: {
    statusUpdateSuccess: "Status updated.",
    statusUpdateError: "Could not update the status.",
    deleteSuccess: "Appointment deleted.",
    deleteError: "Could not delete the appointment.",
    loadError: "Could not load appointments.",
    convertSuccess: "Opportunity created from this appointment.",
    convertError: "Could not create the opportunity.",
  },
} as const;

export type ManageAppointmentsTexts = typeof MANAGE_APPOINTMENTS_TEXTS;

export const APPOINTMENT_STATUS_LABELS: Record<AppointmentStatus, string> =
  MANAGE_APPOINTMENTS_TEXTS.status;

export { APPOINTMENT_STATUSES };
