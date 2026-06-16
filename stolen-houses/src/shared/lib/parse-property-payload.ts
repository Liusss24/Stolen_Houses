import type {
  CreatePropertyInput,
  UpdatePropertyInput,
} from "@/entities/property/model/property.types";

type PropertyPayload = Record<string, unknown>;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function toNumber(value: unknown) {
  const parsed = Number(value);

  return Number.isNaN(parsed) ? null : parsed;
}

export function parseCreatePropertyInput(
  body: PropertyPayload,
): CreatePropertyInput | null {
  const price = toNumber(body.price);
  const bedrooms = toNumber(body.bedrooms);
  const bathrooms = toNumber(body.bathrooms);
  const area = toNumber(body.area);

  if (
    !isNonEmptyString(body.title) ||
    !isNonEmptyString(body.location) ||
    !isNonEmptyString(body.image) ||
    !isNonEmptyString(body.description) ||
    price === null ||
    bedrooms === null ||
    bathrooms === null ||
    area === null
  ) {
    return null;
  }

  return {
    title: body.title.trim(),
    price,
    location: body.location.trim(),
    bedrooms,
    bathrooms,
    area,
    image: body.image.trim(),
    model3d: isNonEmptyString(body.model3d)
      ? body.model3d.trim()
      : undefined,
    description: body.description.trim(),
    featured: Boolean(body.featured),
  };
}

export function parseUpdatePropertyInput(
  body: PropertyPayload,
): UpdatePropertyInput {
  const input: UpdatePropertyInput = {};

  if (isNonEmptyString(body.title)) {
    input.title = body.title.trim();
  }

  if (isNonEmptyString(body.location)) {
    input.location = body.location.trim();
  }

  if (isNonEmptyString(body.image)) {
    input.image = body.image.trim();
  }

  if (isNonEmptyString(body.model3d)) {
    input.model3d = body.model3d.trim();
  }

  if (isNonEmptyString(body.description)) {
    input.description = body.description.trim();
  }

  const price = toNumber(body.price);

  if (price !== null) {
    input.price = price;
  }

  const bedrooms = toNumber(body.bedrooms);

  if (bedrooms !== null) {
    input.bedrooms = bedrooms;
  }

  const bathrooms = toNumber(body.bathrooms);

  if (bathrooms !== null) {
    input.bathrooms = bathrooms;
  }

  const area = toNumber(body.area);

  if (area !== null) {
    input.area = area;
  }

  if (typeof body.featured === "boolean") {
    input.featured = body.featured;
  }

  return input;
}