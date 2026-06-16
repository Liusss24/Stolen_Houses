import { NextResponse } from "next/server";

import { APPOINTMENT_API_MESSAGES } from "@/entities/appointment/model/appointment.constants";
import {
  createAppointment,
  readAppointments,
} from "@/shared/lib/appointments-file";
import { parseCreateAppointmentInput } from "@/shared/lib/parse-appointment-payload";

export const runtime = "nodejs";

export async function GET() {
  try {
    const appointments = await readAppointments();

    return NextResponse.json(appointments);
  } catch {
    return NextResponse.json(
      { message: APPOINTMENT_API_MESSAGES.loadError },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const input = parseCreateAppointmentInput(body);

    if (!input) {
      return NextResponse.json(
        { message: APPOINTMENT_API_MESSAGES.invalidPayload },
        { status: 400 },
      );
    }

    const newAppointment = await createAppointment(input);

    return NextResponse.json(newAppointment, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: APPOINTMENT_API_MESSAGES.createError },
      { status: 500 },
    );
  }
}
