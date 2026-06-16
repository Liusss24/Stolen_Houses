import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { OPPORTUNITY_API_MESSAGES } from "@/entities/opportunity/model/opportunity.constants";
import {
  deleteOpportunity,
  getOpportunityById,
  updateOpportunity,
} from "@/shared/lib/opportunities-file";
import { parseUpdateOpportunityInput } from "@/shared/lib/parse-opportunity-payload";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function notFoundResponse() {
  return NextResponse.json(
    { message: OPPORTUNITY_API_MESSAGES.notFound },
    { status: 404 },
  );
}

function invalidPayloadResponse() {
  return NextResponse.json(
    { message: OPPORTUNITY_API_MESSAGES.invalidPayload },
    { status: 400 },
  );
}

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const opportunity = await getOpportunityById(id);

    if (!opportunity) {
      return notFoundResponse();
    }

    return NextResponse.json(opportunity);
  } catch (error) {
    console.error("Failed to load opportunity:", error);

    return NextResponse.json(
      { message: OPPORTUNITY_API_MESSAGES.loadError },
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

  const input = parseUpdateOpportunityInput(body as Record<string, unknown>);

  if (Object.keys(input).length === 0) {
    return invalidPayloadResponse();
  }

  try {
    const updated = await updateOpportunity(id, input);

    if (!updated) {
      return notFoundResponse();
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update opportunity:", error);

    return NextResponse.json(
      { message: OPPORTUNITY_API_MESSAGES.updateError },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const deleted = await deleteOpportunity(id);

    if (!deleted) {
      return notFoundResponse();
    }

    return NextResponse.json({
      message: OPPORTUNITY_API_MESSAGES.deletedSuccess,
    });
  } catch (error) {
    console.error("Failed to delete opportunity:", error);

    return NextResponse.json(
      { message: OPPORTUNITY_API_MESSAGES.deleteError },
      { status: 500 },
    );
  }
}
