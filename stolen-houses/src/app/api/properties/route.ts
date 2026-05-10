import { NextResponse } from "next/server";

import { PROPERTY_API_MESSAGES } from "@/entities/property/model/property.constants";
import {
  createProperty,
  readProperties,
} from "@/shared/lib/properties-file";
import { parseCreatePropertyInput } from "@/shared/lib/parse-property-payload";

export const runtime = "nodejs";

export async function GET() {
  try {
    const properties = await readProperties();

    return NextResponse.json(properties);
  } catch {
    return NextResponse.json(
      { message: PROPERTY_API_MESSAGES.loadError },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const input = parseCreatePropertyInput(body);

    if (!input) {
      return NextResponse.json(
        { message: PROPERTY_API_MESSAGES.invalidPayload },
        { status: 400 },
      );
    }

    const newProperty = await createProperty(input);

    return NextResponse.json(newProperty, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: PROPERTY_API_MESSAGES.createError },
      { status: 500 },
    );
  }
}