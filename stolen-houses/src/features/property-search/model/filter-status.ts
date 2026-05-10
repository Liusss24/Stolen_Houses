import type { Property } from "@/entities/property/model/property.types";

import {
  PROPERTY_SEARCH_DEFAULT_FILTERS,
  PROPERTY_SEARCH_NUMERIC_FILTER_KEYS,
  PROPERTY_SEARCH_STRICT_FILTER_KEYS,
  PROPERTY_SEARCH_TEXT_FILTER_KEYS,
} from "./property-search.constants";
import {
  isPositiveNumberFilterActive,
  isTextValueActive,
} from "./filter-values";
import type { PropertySearchFilters } from "./property-search.types";

function hasPanorama(property: Property): boolean {
  return Boolean(property.panorama?.trim());
}

export function passesStrictFilters(
  property: Property,
  filters: PropertySearchFilters,
): boolean {
  if (filters.featuredOnly && !property.featured) {
    return false;
  }

  if (filters.panoramaOnly && !hasPanorama(property)) {
    return false;
  }

  return true;
}

export function hasActiveRankingFilters(
  filters: PropertySearchFilters,
): boolean {
  const hasActiveTextFilters = PROPERTY_SEARCH_TEXT_FILTER_KEYS.some((key) =>
    isTextValueActive(filters[key]),
  );

  const hasActiveNumericFilters = PROPERTY_SEARCH_NUMERIC_FILTER_KEYS.some(
    (key) => isPositiveNumberFilterActive(filters[key]),
  );

  return hasActiveTextFilters || hasActiveNumericFilters;
}

export function countActiveFilters(filters: PropertySearchFilters): number {
  const activeTextFilters = PROPERTY_SEARCH_TEXT_FILTER_KEYS.filter((key) =>
    isTextValueActive(filters[key]),
  ).length;

  const activeNumericFilters = PROPERTY_SEARCH_NUMERIC_FILTER_KEYS.filter(
    (key) => isPositiveNumberFilterActive(filters[key]),
  ).length;

  const activeStrictFilters = PROPERTY_SEARCH_STRICT_FILTER_KEYS.filter(
    (key) => filters[key],
  ).length;

  return activeTextFilters + activeNumericFilters + activeStrictFilters;
}

export function resettableFilters(): PropertySearchFilters {
  return {
    ...PROPERTY_SEARCH_DEFAULT_FILTERS,
  };
}
