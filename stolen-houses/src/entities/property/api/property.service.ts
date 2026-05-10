import type {
  CreatePropertyInput,
  Property,
  UpdatePropertyInput,
} from "@/entities/property/model/property.types";
import {
  PROPERTY_API_MESSAGES,
  PROPERTY_API_ROUTES,
} from "@/entities/property/model/property.constants";

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

export async function getProperties(): Promise<Property[]> {
  const response = await fetch(PROPERTY_API_ROUTES.collection, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, PROPERTY_API_MESSAGES.loadError),
    );
  }

  return (await response.json()) as Property[];
}

export async function createPropertyRequest(
  payload: CreatePropertyInput,
): Promise<Property> {
  const response = await fetch(PROPERTY_API_ROUTES.collection, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, PROPERTY_API_MESSAGES.createError),
    );
  }

  return (await response.json()) as Property;
}

export async function updatePropertyRequest(
  id: string,
  payload: UpdatePropertyInput,
): Promise<Property> {
  const response = await fetch(PROPERTY_API_ROUTES.byId(id), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, PROPERTY_API_MESSAGES.updateError),
    );
  }

  return (await response.json()) as Property;
}

export async function deletePropertyRequest(id: string): Promise<void> {
  const response = await fetch(PROPERTY_API_ROUTES.byId(id), {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, PROPERTY_API_MESSAGES.deleteError),
    );
  }
}