export const APPOINTMENT_STATUSES = {
  pending: "pending",
  confirmed: "confirmed",
  completed: "completed",
  cancelled: "cancelled",
} as const;

export type AppointmentStatus =
  (typeof APPOINTMENT_STATUSES)[keyof typeof APPOINTMENT_STATUSES];

export const APPOINTMENT_STATUS_ORDER: ReadonlyArray<AppointmentStatus> = [
  APPOINTMENT_STATUSES.pending,
  APPOINTMENT_STATUSES.confirmed,
  APPOINTMENT_STATUSES.completed,
  APPOINTMENT_STATUSES.cancelled,
];

export type Appointment = {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  scheduledFor: string;
  notes: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreateAppointmentInput = Omit<
  Appointment,
  "id" | "status" | "createdAt" | "updatedAt"
>;

export type UpdateAppointmentInput = Partial<
  Pick<Appointment, "status" | "notes" | "scheduledFor">
>;
