import { promises as fs } from "fs";
import path from "path";

import {
  APPOINTMENT_STATUSES,
  type Appointment,
  type CreateAppointmentInput,
  type UpdateAppointmentInput,
} from "@/entities/appointment/model/appointment.types";

const dataDirectory = path.join(process.cwd(), "data");
const filePath = path.join(dataDirectory, "appointments.json");

async function ensureDataFile() {
  try {
    await fs.access(filePath);
  } catch {
    await fs.mkdir(dataDirectory, { recursive: true });
    await fs.writeFile(filePath, "[]", "utf-8");
  }
}

export async function readAppointments(): Promise<Appointment[]> {
  await ensureDataFile();

  const fileContent = await fs.readFile(filePath, "utf-8");

  if (!fileContent.trim()) {
    return [];
  }

  const parsed: unknown = JSON.parse(fileContent);

  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed as Appointment[];
}

export async function writeAppointments(appointments: Appointment[]) {
  await ensureDataFile();

  await fs.writeFile(
    filePath,
    JSON.stringify(appointments, null, 2),
    "utf-8",
  );
}

export async function getAppointmentById(id: string) {
  const appointments = await readAppointments();

  return appointments.find((appointment) => appointment.id === id) ?? null;
}

export async function createAppointment(input: CreateAppointmentInput) {
  const appointments = await readAppointments();
  const now = new Date().toISOString();

  const newAppointment: Appointment = {
    id: crypto.randomUUID(),
    status: APPOINTMENT_STATUSES.pending,
    createdAt: now,
    updatedAt: now,
    ...input,
  };

  await writeAppointments([newAppointment, ...appointments]);

  return newAppointment;
}

export async function updateAppointment(
  id: string,
  input: UpdateAppointmentInput,
) {
  const appointments = await readAppointments();
  const index = appointments.findIndex((appointment) => appointment.id === id);

  if (index === -1) {
    return null;
  }

  const updatedAppointment: Appointment = {
    ...appointments[index],
    ...input,
    updatedAt: new Date().toISOString(),
  };

  appointments[index] = updatedAppointment;

  await writeAppointments(appointments);

  return updatedAppointment;
}

export async function deleteAppointment(id: string) {
  const appointments = await readAppointments();
  const exists = appointments.some((appointment) => appointment.id === id);

  if (!exists) {
    return false;
  }

  const filtered = appointments.filter((appointment) => appointment.id !== id);

  await writeAppointments(filtered);

  return true;
}
