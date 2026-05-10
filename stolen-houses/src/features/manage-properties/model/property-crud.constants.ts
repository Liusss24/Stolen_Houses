import type { PropertyFormState } from "@/features/manage-properties/model/property-crud.types";

export const PROPERTY_CRUD_DEFAULT_FORM: PropertyFormState = {
  title: "",
  price: "",
  location: "",
  bedrooms: "",
  bathrooms: "",
  area: "",
  image: "",
  panorama: "",
  description: "",
  featured: false,
};
