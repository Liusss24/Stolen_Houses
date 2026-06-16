import type { CreateAppointmentInput } from "@/entities/appointment/model/appointment.types";
import type { Property } from "@/entities/property/model/property.types";

import type { ScheduleAppointmentForm } from "./schedule-appointment.types";

/**
 * Combines the form values typed by the client with the denormalized property
 * fields (id, title, location) so the appointment record stays renderable in
 * the admin without needing to re-fetch the property.
 */
export function mapFormToAppointmentPayload(
  form: ScheduleAppointmentForm,
  property: Property,
): CreateAppointmentInput {
  return {
    propertyId: property.id,
    propertyTitle: property.title,
    propertyLocation: property.location,
    clientName: form.clientName.trim(),
    clientEmail: form.clientEmail.trim(),
    clientPhone: form.clientPhone.trim(),
    scheduledFor: new Date(form.scheduledFor).toISOString(),
    notes: form.notes.trim(),
  };
}
