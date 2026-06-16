export type {
  Appointment,
  AppointmentStatus,
  CreateAppointmentInput,
  UpdateAppointmentInput,
} from "./model/appointment.types";

export {
  APPOINTMENT_STATUSES,
  APPOINTMENT_STATUS_ORDER,
} from "./model/appointment.types";

export {
  APPOINTMENT_API_MESSAGES,
  APPOINTMENT_API_ROUTES,
} from "./model/appointment.constants";

export {
  createAppointmentRequest,
  deleteAppointmentRequest,
  getAppointments,
  updateAppointmentRequest,
} from "./api/appointment.service";
