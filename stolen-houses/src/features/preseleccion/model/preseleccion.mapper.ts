import { PROPERTY_SEARCH_DEFAULT_FILTERS } from "@/features/property-search/model/property-search.constants";
import type { PropertySearchFilters } from "@/features/property-search/model/property-search.types";

import type { PreseleccionForm } from "./preseleccion.types";

/**
 * Adapts the wizard form into the shape the existing ranking engine expects.
 * Strict filters (featured/model3d) keep their boolean shape; the rest are
 * passed as strings, since the ranking utilities already parse them.
 */
export function mapPreseleccionToFilters(
  form: PreseleccionForm,
): PropertySearchFilters {
  return {
    query: form.keywords,
    location: form.location,
    minPrice: form.minPrice,
    maxPrice: form.maxPrice,
    minBedrooms: form.minBedrooms,
    minBathrooms: form.minBathrooms,
    minArea: form.minArea,
    featuredOnly: form.featuredOnly,
    model3dOnly: form.model3dOnly,
  };
}

/**
 * Returns a copy of the filters with the strict toggles disabled. Used as the
 * fallback when strict filters eliminate every candidate so we can still show
 * suggestions.
 */
export function dropStrictFilters(
  filters: PropertySearchFilters,
): PropertySearchFilters {
  return {
    ...filters,
    featuredOnly: PROPERTY_SEARCH_DEFAULT_FILTERS.featuredOnly,
    model3dOnly: PROPERTY_SEARCH_DEFAULT_FILTERS.model3dOnly,
  };
}
