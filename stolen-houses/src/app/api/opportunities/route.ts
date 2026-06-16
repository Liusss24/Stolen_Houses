import { NextResponse } from "next/server";

import { OPPORTUNITY_API_MESSAGES } from "@/entities/opportunity/model/opportunity.constants";
import {
  createOpportunity,
  readOpportunities,
} from "@/shared/lib/opportunities-file";
import { parseCreateOpportunityInput } from "@/shared/lib/parse-opportunity-payload";
import { getPropertyById } from "@/shared/lib/properties-file";

export const runtime = "nodejs";

export async function GET() {
  try {
    const opportunities = await readOpportunities();

    return NextResponse.json(opportunities);
  } catch {
    return NextResponse.json(
      { message: OPPORTUNITY_API_MESSAGES.loadError },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const input = parseCreateOpportunityInput(body);

    if (!input) {
      return NextResponse.json(
        { message: OPPORTUNITY_API_MESSAGES.invalidPayload },
        { status: 400 },
      );
    }

    const property = await getPropertyById(input.propertyId);

    if (!property) {
      return NextResponse.json(
        { message: OPPORTUNITY_API_MESSAGES.propertyNotFound },
        { status: 404 },
      );
    }

    const opportunity = await createOpportunity(input, property);

    return NextResponse.json(opportunity, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: OPPORTUNITY_API_MESSAGES.createError },
      { status: 500 },
    );
  }
}
