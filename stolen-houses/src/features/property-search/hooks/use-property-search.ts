"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";

import { getProperties } from "@/entities/property/api/property.service";
import type { Property } from "@/entities/property/model/property.types";
import type { PropertySearchTexts } from "@/i18n/es/property-search";

import {
  countActiveFilters,
  hasActiveRankingFilters,
  resettableFilters,
} from "@/features/property-search/model/filter-status";
import { rankProperties } from "@/features/property-search/model/rank-properties";
import type {
  PropertySearchFeedbackState,
  PropertySearchFilters,
} from "@/features/property-search/model/property-search.types";

type BooleanFilterKey = "featuredOnly" | "panoramaOnly";
type StringFilterKey = Exclude<keyof PropertySearchFilters, BooleanFilterKey>;

type UsePropertySearchReturn = {
  filters: PropertySearchFilters;
  results: ReturnType<typeof rankProperties>;
  totalProperties: number;
  isLoading: boolean;
  feedback: PropertySearchFeedbackState;
  activeFiltersCount: number;
  hasRankingFilters: boolean;
  handleFilterChange: (event: ChangeEvent<HTMLInputElement>) => void;
  resetFilters: () => void;
  reloadProperties: () => Promise<void>;
};

/**
 * usePropertySearch
 * Needs: localized property-search texts (`PROPERTY_SEARCH_TEXTS`) for the
 *        feedback message displayed on load failures.
 * Does: fetches the property catalog on mount, holds the live filter state,
 *       and recomputes ranked results, active-filter counters and ranking
 *       flags whenever filters or properties change.
 * Returns: filter state + setters, derived ranked results, totals, loading
 *          and feedback flags, plus a manual reload trigger.
 */
export function usePropertySearch(
  texts: PropertySearchTexts,
): UsePropertySearchReturn {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<PropertySearchFilters>(
    resettableFilters(),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] =
    useState<PropertySearchFeedbackState>(null);

  const loadProperties = useCallback(async () => {
    setIsLoading(true);
    setFeedback(null);

    try {
      const data = await getProperties();
      setProperties(data);
    } catch (error) {
      setFeedback({
        type: "error",
        text:
          error instanceof Error ? error.message : texts.feedback.loadError,
      });
    } finally {
      setIsLoading(false);
    }
  }, [texts.feedback.loadError]);

  useEffect(() => {
    let mounted = true;

    async function fetchInitialData() {
      setIsLoading(true);
      setFeedback(null);

      try {
        const data = await getProperties();
        if (mounted) {
          setProperties(data);
        }
      } catch (error) {
        if (mounted) {
          setFeedback({
            type: "error",
            text:
              error instanceof Error
                ? error.message
                : texts.feedback.loadError,
          });
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    void fetchInitialData();

    return () => {
      mounted = false;
    };
  }, [texts.feedback.loadError]);

  const results = useMemo(
    () => rankProperties(properties, filters),
    [properties, filters],
  );

  const totalProperties = properties.length;

  const activeFiltersCount = useMemo(
    () => countActiveFilters(filters),
    [filters],
  );

  const hasRankingFilters = useMemo(
    () => hasActiveRankingFilters(filters),
    [filters],
  );

  const handleFilterChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, type } = event.target;

      if (type === "checkbox") {
        const key = name as BooleanFilterKey;
        const checked = event.target.checked;

        setFilters((previousFilters) => ({
          ...previousFilters,
          [key]: checked,
        }));

        return;
      }

      const key = name as StringFilterKey;
      const value = event.target.value;

      setFilters((previousFilters) => ({
        ...previousFilters,
        [key]: value,
      }));
    },
    [],
  );

  const resetFilters = useCallback(() => {
    setFilters(resettableFilters());
  }, []);

  return {
    filters,
    results,
    totalProperties,
    isLoading,
    feedback,
    activeFiltersCount,
    hasRankingFilters,
    handleFilterChange,
    resetFilters,
    reloadProperties: loadProperties,
  };
}
