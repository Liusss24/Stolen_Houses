import type { Property } from "@/entities/property/model/property.types";

import { PROPERTY_SEARCH_SCORE_WEIGHTS } from "./property-search.constants";
import {
  clamp,
  isTextValueActive,
  parseNonNegativeNumber,
} from "./filter-values";
import { normalizeText, tokenize } from "./text-normalization";
import type { PropertySearchFilters } from "./property-search.types";

const LOCATION_INCLUDES_BASELINE_SCORE = 0.75;
const LOCATION_INCLUDES_LENGTH_BONUS = 0.25;
const LOCATION_TOKEN_OVERLAP_WEIGHT = 0.6;

function getQueryScore(property: Property, query: string): number {
  const tokens = tokenize(query);

  if (tokens.length === 0) {
    return 0;
  }

  const searchableContent = [
    property.title,
    property.location,
    property.description,
  ].map(normalizeText);

  let matchedTokens = 0;

  for (const token of tokens) {
    if (searchableContent.some((text) => text.includes(token))) {
      matchedTokens += 1;
    }
  }

  return matchedTokens / tokens.length;
}

function getLocationScore(property: Property, location: string): number {
  const normalizedSearchLocation = normalizeText(location);

  if (!normalizedSearchLocation) {
    return 0;
  }

  const normalizedPropertyLocation = normalizeText(property.location);

  if (normalizedPropertyLocation === normalizedSearchLocation) {
    return 1;
  }

  if (
    normalizedPropertyLocation.includes(normalizedSearchLocation) ||
    normalizedSearchLocation.includes(normalizedPropertyLocation)
  ) {
    const shortestLength = Math.min(
      normalizedSearchLocation.length,
      normalizedPropertyLocation.length,
    );
    const longestLength = Math.max(
      normalizedSearchLocation.length,
      normalizedPropertyLocation.length,
    );

    return (
      LOCATION_INCLUDES_BASELINE_SCORE +
      (shortestLength / longestLength) * LOCATION_INCLUDES_LENGTH_BONUS
    );
  }

  const propertyTokens = new Set(tokenize(property.location));
  const searchTokens = tokenize(location);

  if (searchTokens.length === 0) {
    return 0;
  }

  let matches = 0;

  for (const token of searchTokens) {
    if (propertyTokens.has(token)) {
      matches += 1;
    }
  }

  return (matches / searchTokens.length) * LOCATION_TOKEN_OVERLAP_WEIGHT;
}

function getMinimumThresholdScore(
  propertyValue: number,
  requestedValue: number | null,
): number {
  if (requestedValue === null) {
    return 0;
  }

  if (propertyValue >= requestedValue) {
    return 1;
  }

  return clamp(propertyValue / requestedValue);
}

function getRangeScore(
  propertyValue: number,
  minValue: number | null,
  maxValue: number | null,
): number {
  if (minValue === null && maxValue === null) {
    return 0;
  }

  if (minValue !== null && maxValue !== null) {
    const lowerBound = Math.min(minValue, maxValue);
    const upperBound = Math.max(minValue, maxValue);

    if (propertyValue >= lowerBound && propertyValue <= upperBound) {
      return 1;
    }

    const rangeSize = upperBound - lowerBound;

    if (rangeSize === 0) {
      const referenceValue = Math.max(upperBound, 1);
      const distance = Math.abs(propertyValue - upperBound);

      return clamp(1 - distance / referenceValue);
    }

    const distanceToRange =
      propertyValue < lowerBound
        ? lowerBound - propertyValue
        : propertyValue - upperBound;

    return clamp(1 - distanceToRange / rangeSize);
  }

  if (minValue !== null) {
    if (propertyValue >= minValue) {
      return 1;
    }

    return clamp(propertyValue / Math.max(minValue, 1));
  }

  if (maxValue !== null) {
    if (propertyValue <= maxValue) {
      return 1;
    }

    return clamp(maxValue / Math.max(propertyValue, 1));
  }

  return 0;
}

function activeOrNull(value: string): number | null {
  const parsed = parseNonNegativeNumber(value);

  return parsed !== null && parsed > 0 ? parsed : null;
}

/**
 * Aggregates the per-criterion scores into a single similarity value in [0,1].
 * Each active criterion contributes proportionally to its configured weight,
 * so non-active criteria do not dilute the score.
 */
export function calculateSimilarityScore(
  property: Property,
  filters: PropertySearchFilters,
): number {
  const minPrice = activeOrNull(filters.minPrice);
  const maxPrice = activeOrNull(filters.maxPrice);
  const minBedrooms = activeOrNull(filters.minBedrooms);
  const minBathrooms = activeOrNull(filters.minBathrooms);
  const minArea = activeOrNull(filters.minArea);

  const criteria = [
    {
      isActive: isTextValueActive(filters.query),
      weight: PROPERTY_SEARCH_SCORE_WEIGHTS.query,
      score: getQueryScore(property, filters.query),
    },
    {
      isActive: isTextValueActive(filters.location),
      weight: PROPERTY_SEARCH_SCORE_WEIGHTS.location,
      score: getLocationScore(property, filters.location),
    },
    {
      isActive: minPrice !== null || maxPrice !== null,
      weight: PROPERTY_SEARCH_SCORE_WEIGHTS.price,
      score: getRangeScore(property.price, minPrice, maxPrice),
    },
    {
      isActive: minBedrooms !== null,
      weight: PROPERTY_SEARCH_SCORE_WEIGHTS.bedrooms,
      score: getMinimumThresholdScore(property.bedrooms, minBedrooms),
    },
    {
      isActive: minBathrooms !== null,
      weight: PROPERTY_SEARCH_SCORE_WEIGHTS.bathrooms,
      score: getMinimumThresholdScore(property.bathrooms, minBathrooms),
    },
    {
      isActive: minArea !== null,
      weight: PROPERTY_SEARCH_SCORE_WEIGHTS.area,
      score: getMinimumThresholdScore(property.area, minArea),
    },
  ];

  const activeCriteria = criteria.filter((criterion) => criterion.isActive);

  if (activeCriteria.length === 0) {
    return 1;
  }

  const totalWeight = activeCriteria.reduce(
    (accumulator, criterion) => accumulator + criterion.weight,
    0,
  );

  const weightedScore = activeCriteria.reduce(
    (accumulator, criterion) =>
      accumulator + criterion.score * criterion.weight,
    0,
  );

  return clamp(weightedScore / totalWeight);
}
