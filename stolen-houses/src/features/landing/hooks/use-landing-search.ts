"use client";

import { useCallback, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

const PROPERTY_SEARCH_ROUTE = "/propiedades";

export type LandingSearchValues = {
  location: string;
  type: string;
  budget: string;
};

const INITIAL_VALUES: LandingSearchValues = {
  location: "",
  type: "",
  budget: "",
};

type UseLandingSearchReturn = {
  values: LandingSearchValues;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

/**
 * useLandingSearch
 * Needs: nothing — relies on Next.js router and internal state only.
 * Does: tracks the three hero search inputs (location, type, budget) and on
 *       submit forwards the user to the public properties catalog with the
 *       location pre-filled as a `query` param so the search hook there can
 *       hydrate it.
 * Returns: current values, a generic input change handler keyed by `name`,
 *          and the submit handler that performs the navigation.
 */
export function useLandingSearch(): UseLandingSearchReturn {
  const router = useRouter();
  const [values, setValues] = useState<LandingSearchValues>(INITIAL_VALUES);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const params = new URLSearchParams();
      if (values.location.trim()) {
        params.set("location", values.location.trim());
      }
      if (values.type.trim()) {
        params.set("type", values.type.trim());
      }
      if (values.budget.trim()) {
        params.set("budget", values.budget.trim());
      }

      const queryString = params.toString();
      const destination = queryString
        ? `${PROPERTY_SEARCH_ROUTE}?${queryString}`
        : PROPERTY_SEARCH_ROUTE;

      router.push(destination);
    },
    [router, values],
  );

  return { values, handleChange, handleSubmit };
}
