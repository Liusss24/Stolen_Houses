"use client";

import { useCallback, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

export type LandingContactValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const INITIAL_VALUES: LandingContactValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

type ContactSubmitField = keyof LandingContactValues;

type UseLandingContactReturn = {
  values: LandingContactValues;
  isSubmitted: boolean;
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

/**
 * useLandingContact
 * Needs: nothing — fully local state.
 * Does: tracks the four contact-form fields, performs a no-op "submission"
 *       (this landing has no real back-end yet) that resets the form and
 *       toggles a success flag. When the contact endpoint exists, replace
 *       the body of `handleSubmit` with the real fetch call.
 * Returns: current values, submit-success flag, change handler keyed by the
 *          field name, and the submit handler.
 */
export function useLandingContact(): UseLandingContactReturn {
  const [values, setValues] = useState<LandingContactValues>(INITIAL_VALUES);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const name = event.target.name as ContactSubmitField;
      const value = event.target.value;

      setValues((previous) => ({ ...previous, [name]: value }));
    },
    [],
  );

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValues(INITIAL_VALUES);
    setIsSubmitted(true);
  }, []);

  return { values, isSubmitted, handleChange, handleSubmit };
}
