import {
  APPOINTMENT_STATUSES,
  type AppointmentStatus,
  type CreateAppointmentInput,
  type UpdateAppointmentInput,
} from "@/entities/appointment/model/appointment.types";

type AppointmentPayload = Record<string, unknown>;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidIsoDate(value: string): boolean {
  const parsed = new Date(value);

  return !Number.isNaN(parsed.getTime());
}

function parseStatus(value: unknown): AppointmentStatus | null {
  if (typeof value !== "string") {
    return null;
  }

  const allowed = Object.values(APPOINTMENT_STATUSES) as ReadonlyArray<string>;

  return allowed.includes(value) ? (value as AppointmentStatus) : null;
}

export function parseCreateAppointmentInput(
  body: AppointmentPayload,
): CreateAppointmentInput | null {
  if (
    !isNonEmptyString(body.propertyId) ||
    !isNonEmptyString(body.propertyTitle) ||
    !isNonEmptyString(body.propertyLocation) ||
    !isNonEmptyString(body.clientName) ||
    !isNonEmptyString(body.clientEmail) ||
    !isNonEmptyString(body.clientPhone) ||
    !isNonEmptyString(body.scheduledFor) ||
    !isValidIsoDate(body.scheduledFor)
  ) {
    return null;
  }

  return {
    propertyId: body.propertyId.trim(),
    propertyTitle: body.propertyTitle.trim(),
    propertyLocation: body.propertyLocation.trim(),
    clientName: body.clientName.trim(),
    clientEmail: body.clientEmail.trim().toLowerCase(),
    clientPhone: body.clientPhone.trim(),
    scheduledFor: new Date(body.scheduledFor).toISOString(),
    notes: typeof body.notes === "string" ? body.notes.trim() : "",
  };
}

export function parseUpdateAppointmentInput(
  body: AppointmentPayload,
): UpdateAppointmentInput {
  const input: UpdateAppointmentInput = {};

  const status = parseStatus(body.status);
  if (status) {
    input.status = status;
  }

  if (typeof body.notes === "string") {
    input.notes = body.notes.trim();
  }

  if (
    typeof body.scheduledFor === "string" &&
    isValidIsoDate(body.scheduledFor)
  ) {
    input.scheduledFor = new Date(body.scheduledFor).toISOString();
  }

  return input;
}
