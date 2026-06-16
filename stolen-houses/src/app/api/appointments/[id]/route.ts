import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { APPOINTMENT_API_MESSAGES } from "@/entities/appointment/model/appointment.constants";
import {
  deleteAppointment,
  getAppointmentById,
  updateAppointment,
} from "@/shared/lib/appointments-file";
import { parseUpdateAppointmentInput } from "@/shared/lib/parse-appointment-payload";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function notFoundResponse() {
  return NextResponse.json(
    { message: APPOINTMENT_API_MESSAGES.notFound },
    { status: 404 },
  );
}

function invalidPayloadResponse() {
  return NextResponse.json(
    { message: APPOINTMENT_API_MESSAGES.invalidPayload },
    { status: 400 },
  );
}

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const appointment = await getAppointmentById(id);

    if (!appointment) {
      return notFoundResponse();
    }

    return NextResponse.json(appointment);
  } catch (error) {
    console.error("Failed to load appointment:", error);

    return NextResponse.json(
      { message: APPOINTMENT_API_MESSAGES.loadError },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return invalidPayloadResponse();
  }

  const input = parseUpdateAppointmentInput(body as Record<string, unknown>);

  if (Object.keys(input).length === 0) {
    return invalidPayloadResponse();
  }

  try {
    const updated = await updateAppointment(id, input);

    if (!updated) {
      return notFoundResponse();
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update appointment:", error);

    return NextResponse.json(
      { message: APPOINTMENT_API_MESSAGES.updateError },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const deleted = await deleteAppointment(id);

    if (!deleted) {
      return notFoundResponse();
    }

    return NextResponse.json({
      message: APPOINTMENT_API_MESSAGES.deletedSuccess,
    });
  } catch (error) {
    console.error("Failed to delete appointment:", error);

    return NextResponse.json(
      { message: APPOINTMENT_API_MESSAGES.deleteError },
      { status: 500 },
    );
  }
}
