import type {
  CreatePropertyInput,
  Property,
} from "@/entities/property/model/property.types";
import type { PropertyFormState } from "@/features/manage-properties/model/property-crud.types";

export function mapPropertyToForm(property: Property): PropertyFormState {
  return {
    title: property.title,
    price: String(property.price),
    location: property.location,
    bedrooms: String(property.bedrooms),
    bathrooms: String(property.bathrooms),
    area: String(property.area),
    image: property.image,
    panorama: property.panorama ?? "",
    description: property.description,
    featured: property.featured,
  };
}

export function mapFormToPropertyPayload(
  form: PropertyFormState,
): CreatePropertyInput {
  return {
    title: form.title.trim(),
    price: Number(form.price),
    location: form.location.trim(),
    bedrooms: Number(form.bedrooms),
    bathrooms: Number(form.bathrooms),
    area: Number(form.area),
    image: form.image.trim(),
    panorama: form.panorama.trim() || undefined,
    description: form.description.trim(),
    featured: form.featured,
  };
}