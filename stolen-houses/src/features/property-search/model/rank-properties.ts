import type { Property } from "@/entities/property/model/property.types";

import {
  hasActiveRankingFilters,
  passesStrictFilters,
} from "./filter-status";
import { calculateSimilarityScore } from "./scoring";
import type {
  PropertySearchFilters,
  RankedProperty,
} from "./property-search.types";

function sortByDefaultPriority(first: Property, second: Property): number {
  if (first.featured !== second.featured) {
    return Number(second.featured) - Number(first.featured);
  }

  return (
    new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime()
  );
}

/**
 * Filters out properties that fail strict filters, then ranks the remainder by
 * similarity score (descending). Ties and no-filter cases fall back to a
 * default priority that prefers featured + most recently created properties.
 */
export function rankProperties(
  properties: Property[],
  filters: PropertySearchFilters,
): RankedProperty[] {
  const filteredProperties = properties.filter((property) =>
    passesStrictFilters(property, filters),
  );

  const rankedProperties = filteredProperties.map((property) => ({
    property,
    similarityScore: calculateSimilarityScore(property, filters),
  }));

  if (!hasActiveRankingFilters(filters)) {
    return rankedProperties.sort((first, second) =>
      sortByDefaultPriority(first.property, second.property),
    );
  }

  return rankedProperties.sort((first, second) => {
    if (second.similarityScore !== first.similarityScore) {
      return second.similarityScore - first.similarityScore;
    }

    return sortByDefaultPriority(first.property, second.property);
  });
}
