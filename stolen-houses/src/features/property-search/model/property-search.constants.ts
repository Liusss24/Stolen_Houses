import type { PropertySearchFilters } from "./property-search.types";

export const PROPERTY_SEARCH_DEFAULT_FILTERS: PropertySearchFilters = {
  query: "",
  location: "",
  minPrice: "",
  maxPrice: "",
  minBedrooms: "",
  minBathrooms: "",
  minArea: "",
  featuredOnly: false,
  panoramaOnly: false,
};

export const PROPERTY_SEARCH_SCORE_WEIGHTS = {
  query: 35,
  location: 20,
  price: 20,
  bedrooms: 10,
  bathrooms: 10,
  area: 5,
} as const;

export const PROPERTY_SEARCH_TEXT_FILTER_KEYS = [
  "query",
  "location",
] as const;

export const PROPERTY_SEARCH_NUMERIC_FILTER_KEYS = [
  "minPrice",
  "maxPrice",
  "minBedrooms",
  "minBathrooms",
  "minArea",
] as const;

export const PROPERTY_SEARCH_STRICT_FILTER_KEYS = [
  "featuredOnly",
  "panoramaOnly",
] as const;

export type PropertySearchTextFilterKey =
  (typeof PROPERTY_SEARCH_TEXT_FILTER_KEYS)[number];

export type PropertySearchNumericFilterKey =
  (typeof PROPERTY_SEARCH_NUMERIC_FILTER_KEYS)[number];

export type PropertySearchStrictFilterKey =
  (typeof PROPERTY_SEARCH_STRICT_FILTER_KEYS)[number];