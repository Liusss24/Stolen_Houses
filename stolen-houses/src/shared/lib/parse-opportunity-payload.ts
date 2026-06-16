import {
  OPPORTUNITY_SOURCES,
  OPPORTUNITY_STATUSES,
  type CreateOpportunityInput,
  type OpportunitySource,
  type OpportunityStatus,
  type UpdateOpportunityInput,
} from "@/entities/opportunity/model/opportunity.types";

type OpportunityPayload = Record<string, unknown>;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function parseStatus(value: unknown): OpportunityStatus | null {
  if (typeof value !== "string") {
    return null;
  }

  const allowed = Object.values(OPPORTUNITY_STATUSES) as ReadonlyArray<string>;

  return allowed.includes(value) ? (value as OpportunityStatus) : null;
}

function parseSource(value: unknown): OpportunitySource | null {
  if (typeof value !== "string") {
    return null;
  }

  const allowed = Object.values(OPPORTUNITY_SOURCES) as ReadonlyArray<string>;

  return allowed.includes(value) ? (value as OpportunitySource) : null;
}

function parseNonNegativeNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value) && value >= 0) {
    return value;
  }

  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);

    if (Number.isFinite(parsed) && parsed >= 0) {
      return parsed;
    }
  }

  return undefined;
}

export function parseCreateOpportunityInput(
  body: OpportunityPayload,
): CreateOpportunityInput | null {
  if (
    !isNonEmptyString(body.propertyId) ||
    !isNonEmptyString(body.clientName) ||
    !isNonEmptyString(body.clientEmail) ||
    !isNonEmptyString(body.clientPhone)
  ) {
    return null;
  }

  const status = parseStatus(body.status);
  const source = parseSource(body.source);
  const estimatedValue = parseNonNegativeNumber(body.estimatedValue);

  return {
    propertyId: body.propertyId.trim(),
    clientName: body.clientName.trim(),
    clientEmail: body.clientEmail.trim().toLowerCase(),
    clientPhone: body.clientPhone.trim(),
    status: status ?? undefined,
    source: source ?? undefined,
    appointmentId: isNonEmptyString(body.appointmentId)
      ? body.appointmentId.trim()
      : null,
    estimatedValue,
    notes: typeof body.notes === "string" ? body.notes.trim() : "",
  };
}

export function parseUpdateOpportunityInput(
  body: OpportunityPayload,
): UpdateOpportunityInput {
  const input: UpdateOpportunityInput = {};

  const status = parseStatus(body.status);
  if (status) {
    input.status = status;
  }

  if (typeof body.notes === "string") {
    input.notes = body.notes.trim();
  }

  const estimatedValue = parseNonNegativeNumber(body.estimatedValue);
  if (typeof estimatedValue === "number") {
    input.estimatedValue = estimatedValue;
  }

  return input;
}
