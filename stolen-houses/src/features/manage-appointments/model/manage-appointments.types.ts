import type { AppointmentStatus } from "@/entities/appointment/model/appointment.types";

export type AppointmentStatusFilter = AppointmentStatus | "all";

export type ManageAppointmentsFeedback = {
  type: "success" | "error";
  text: string;
} | null;
