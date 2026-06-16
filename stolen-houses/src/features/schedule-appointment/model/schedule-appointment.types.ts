export type ScheduleAppointmentForm = {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  scheduledFor: string;
  notes: string;
};

export type ScheduleAppointmentFeedback = {
  type: "error";
  text: string;
} | null;
