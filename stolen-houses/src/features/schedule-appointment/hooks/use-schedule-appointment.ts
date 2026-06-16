"use client";

import { useCallback, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import { createAppointmentRequest } from "@/entities/appointment/api/appointment.service";
import type { Appointment } from "@/entities/appointment/model/appointment.types";
import type { Property } from "@/entities/property/model/property.types";
import type { ScheduleAppointmentTexts } from "@/i18n/es/schedule-appointment";

import { SCHEDULE_APPOINTMENT_DEFAULT_FORM } from "@/features/schedule-appointment/model/schedule-appointment.constants";
import { mapFormToAppointmentPayload } from "@/features/schedule-appointment/model/schedule-appointment.mapper";
import type {
  ScheduleAppointmentFeedback,
  ScheduleAppointmentForm,
} from "@/features/schedule-appointment/model/schedule-appointment.types";

type UseScheduleAppointmentReturn = {
  form: ScheduleAppointmentForm;
  isSubmitting: boolean;
  submittedAppointment: Appointment | null;
  feedback: ScheduleAppointmentFeedback;
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

function isFormComplete(form: ScheduleAppointmentForm): boolean {
  return (
    form.clientName.trim().length > 0 &&
    form.clientEmail.trim().length > 0 &&
    form.clientPhone.trim().length > 0 &&
    form.scheduledFor.trim().length > 0
  );
}

function isFutureDate(value: string): boolean {
  const parsed = new Date(value);

  return !Number.isNaN(parsed.getTime()) && parsed.getTime() > Date.now();
}

/**
 * useScheduleAppointment
 * Needs: the property the visit is for (so we can denormalize id/title/location
 *        into the appointment record) and localized texts for error feedback.
 * Does: holds the appointment form state, validates required fields and that
 *       the requested date is in the future, posts the payload to
 *       `/api/appointments`, and exposes the created appointment so the UI can
 *       render a confirmation summary.
 * Returns: form values, change/submit handlers, submission flags and the
 *          created appointment (null until the server responds OK).
 */
export function useScheduleAppointment(
  property: Property,
  texts: ScheduleAppointmentTexts,
): UseScheduleAppointmentReturn {
  const [form, setForm] = useState<ScheduleAppointmentForm>({
    ...SCHEDULE_APPOINTMENT_DEFAULT_FORM,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppointment, setSubmittedAppointment] =
    useState<Appointment | null>(null);
  const [feedback, setFeedback] = useState<ScheduleAppointmentFeedback>(null);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setForm((previous) => ({ ...previous, [name]: value }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!isFormComplete(form)) {
        setFeedback({ type: "error", text: texts.errors.invalidPayload });
        return;
      }

      if (!isFutureDate(form.scheduledFor)) {
        setFeedback({ type: "error", text: texts.errors.pastDate });
        return;
      }

      setIsSubmitting(true);
      setFeedback(null);

      try {
        const payload = mapFormToAppointmentPayload(form, property);
        const created = await createAppointmentRequest(payload);

        setSubmittedAppointment(created);
        setForm({ ...SCHEDULE_APPOINTMENT_DEFAULT_FORM });
      } catch (error) {
        setFeedback({
          type: "error",
          text:
            error instanceof Error ? error.message : texts.errors.generic,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, property, texts.errors],
  );

  return {
    form,
    isSubmitting,
    submittedAppointment,
    feedback,
    handleChange,
    handleSubmit,
  };
}
