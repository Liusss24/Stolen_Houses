import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { PROPERTY_API_MESSAGES } from "@/entities/property/model/property.constants";
import {
  deleteProperty,
  getPropertyById,
  updateProperty,
} from "@/shared/lib/properties-file";
import { parseUpdatePropertyInput } from "@/shared/lib/parse-property-payload";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function notFoundResponse() {
  return NextResponse.json(
    { message: PROPERTY_API_MESSAGES.notFound },
    { status: 404 },
  );
}

function invalidPayloadResponse() {
  return NextResponse.json(
    { message: PROPERTY_API_MESSAGES.invalidPayload },
    { status: 400 },
  );
}

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const property = await getPropertyById(id);

    if (!property) {
      return notFoundResponse();
    }

    return NextResponse.json(property);
  } catch (error) {
    console.error("Failed to load property:", error);

    return NextResponse.json(
      { message: PROPERTY_API_MESSAGES.loadError },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return invalidPayloadResponse();
  }

  const input = parseUpdatePropertyInput(body as Record<string, unknown>);

  if (Object.keys(input).length === 0) {
    return invalidPayloadResponse();
  }

  try {
    const updatedProperty = await updateProperty(id, input);

    if (!updatedProperty) {
      return notFoundResponse();
    }

    return NextResponse.json(updatedProperty);
  } catch (error) {
    console.error("Failed to update property:", error);

    return NextResponse.json(
      { message: PROPERTY_API_MESSAGES.updateError },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const deleted = await deleteProperty(id);

    if (!deleted) {
      return notFoundResponse();
    }

    return NextResponse.json({ message: PROPERTY_API_MESSAGES.deletedSuccess });
  } catch (error) {
    console.error("Failed to delete property:", error);

    return NextResponse.json(
      { message: PROPERTY_API_MESSAGES.deleteError },
      { status: 500 },
    );
  }
}