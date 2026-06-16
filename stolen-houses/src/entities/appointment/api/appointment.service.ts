import {
  APPOINTMENT_API_MESSAGES,
  APPOINTMENT_API_ROUTES,
} from "@/entities/appointment/model/appointment.constants";
import type {
  Appointment,
  CreateAppointmentInput,
  UpdateAppointmentInput,
} from "@/entities/appointment/model/appointment.types";

type ApiMessageResponse = {
  message?: string;
};

async function getErrorMessage(
  response: Response,
  fallbackMessage: string,
): Promise<string> {
  try {
    const data = (await response.json()) as ApiMessageResponse;

    return data.message ?? fallbackMessage;
  } catch {
    return fallbackMessage;
  }
}

export async function getAppointments(): Promise<Appointment[]> {
  const response = await fetch(APPOINTMENT_API_ROUTES.collection, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, APPOINTMENT_API_MESSAGES.loadError),
    );
  }

  return (await response.json()) as Appointment[];
}

export async function createAppointmentRequest(
  payload: CreateAppointmentInput,
): Promise<Appointment> {
  const response = await fetch(APPOINTMENT_API_ROUTES.collection, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, APPOINTMENT_API_MESSAGES.createError),
    );
  }

  return (await response.json()) as Appointment;
}

export async function updateAppointmentRequest(
  id: string,
  payload: UpdateAppointmentInput,
): Promise<Appointment> {
  const response = await fetch(APPOINTMENT_API_ROUTES.byId(id), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, APPOINTMENT_API_MESSAGES.updateError),
    );
  }

  return (await response.json()) as Appointment;
}

export async function deleteAppointmentRequest(id: string): Promise<void> {
  const response = await fetch(APPOINTMENT_API_ROUTES.byId(id), {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, APPOINTMENT_API_MESSAGES.deleteError),
    );
  }
}
