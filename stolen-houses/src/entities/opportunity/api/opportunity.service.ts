import {
  OPPORTUNITY_API_MESSAGES,
  OPPORTUNITY_API_ROUTES,
} from "@/entities/opportunity/model/opportunity.constants";
import type {
  CreateOpportunityInput,
  Opportunity,
  UpdateOpportunityInput,
} from "@/entities/opportunity/model/opportunity.types";

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

export async function getOpportunities(): Promise<Opportunity[]> {
  const response = await fetch(OPPORTUNITY_API_ROUTES.collection, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, OPPORTUNITY_API_MESSAGES.loadError),
    );
  }

  return (await response.json()) as Opportunity[];
}

export async function createOpportunityRequest(
  payload: CreateOpportunityInput,
): Promise<Opportunity> {
  const response = await fetch(OPPORTUNITY_API_ROUTES.collection, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, OPPORTUNITY_API_MESSAGES.createError),
    );
  }

  return (await response.json()) as Opportunity;
}

export async function updateOpportunityRequest(
  id: string,
  payload: UpdateOpportunityInput,
): Promise<Opportunity> {
  const response = await fetch(OPPORTUNITY_API_ROUTES.byId(id), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, OPPORTUNITY_API_MESSAGES.updateError),
    );
  }

  return (await response.json()) as Opportunity;
}

export async function deleteOpportunityRequest(id: string): Promise<void> {
  const response = await fetch(OPPORTUNITY_API_ROUTES.byId(id), {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, OPPORTUNITY_API_MESSAGES.deleteError),
    );
  }
}
