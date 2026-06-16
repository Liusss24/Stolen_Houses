"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";

import { getProperties } from "@/entities/property/api/property.service";
import type { Property } from "@/entities/property/model/property.types";
import { rankProperties } from "@/features/property-search/model/rank-properties";

import {
  PRESELECCION_DEFAULT_FORM,
  PRESELECCION_INPUT_STEPS,
  PRESELECCION_MATCH_THRESHOLD,
  PRESELECCION_STEP_ORDER,
  PRESELECCION_SUGGESTION_LIMIT,
} from "@/features/preseleccion/model/preseleccion.constants";
import {
  dropStrictFilters,
  mapPreseleccionToFilters,
} from "@/features/preseleccion/model/preseleccion.mapper";
import {
  PRESELECCION_STEPS,
  type PreseleccionFeedback,
  type PreseleccionForm,
  type PreseleccionResult,
  type PreseleccionStep,
} from "@/features/preseleccion/model/preseleccion.types";

type WizardTexts = {
  loadError: string;
};

type UsePreseleccionWizardReturn = {
  step: PreseleccionStep;
  stepIndex: number;
  totalSteps: number;
  inputStepCount: number;
  form: PreseleccionForm;
  isLoading: boolean;
  feedback: PreseleccionFeedback;
  result: PreseleccionResult | null;
  isFirstStep: boolean;
  isLastInputStep: boolean;
  isResultsStep: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  goNext: () => void;
  goBack: () => void;
  goToStep: (next: PreseleccionStep) => void;
  reset: () => void;
};

function computeResult(
  properties: ReadonlyArray<Property>,
  form: PreseleccionForm,
): PreseleccionResult {
  if (properties.length === 0) {
    return { kind: "empty", items: [] };
  }

  const filters = mapPreseleccionToFilters(form);
  const strict = rankProperties([...properties], filters);

  if (strict.length > 0) {
    const topScore = strict[0]?.similarityScore ?? 0;
    const kind = topScore >= PRESELECCION_MATCH_THRESHOLD ? "matches" : "suggestions";

    return {
      kind,
      items:
        kind === "matches"
          ? strict
          : strict.slice(0, PRESELECCION_SUGGESTION_LIMIT),
    };
  }

  // Strict filters eliminated everything; relax them to expose suggestions.
  const loose = rankProperties([...properties], dropStrictFilters(filters));

  if (loose.length === 0) {
    return { kind: "empty", items: [] };
  }

  return {
    kind: "suggestions",
    items: loose.slice(0, PRESELECCION_SUGGESTION_LIMIT),
  };
}

/**
 * usePreseleccionWizard
 * Needs: localized error copy for the property fetch fallback.
 * Does: drives the multi-step preselection wizard. Holds form state, manages
 *       the current step, lazily fetches the property catalog when entering
 *       the results step, and recomputes the ranked result + suggestion
 *       fallback whenever inputs change.
 * Returns: current step + index, the form, change/navigation handlers,
 *          loading and feedback flags, and the computed result.
 */
export function usePreseleccionWizard(
  texts: WizardTexts,
): UsePreseleccionWizardReturn {
  const [step, setStep] = useState<PreseleccionStep>(
    PRESELECCION_STEP_ORDER[0],
  );
  const [form, setForm] = useState<PreseleccionForm>({
    ...PRESELECCION_DEFAULT_FORM,
  });
  const [properties, setProperties] = useState<ReadonlyArray<Property>>([]);
  const [hasLoadedProperties, setHasLoadedProperties] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<PreseleccionFeedback>(null);

  const stepIndex = PRESELECCION_STEP_ORDER.indexOf(step);
  const totalSteps = PRESELECCION_STEP_ORDER.length;
  const inputStepCount = PRESELECCION_INPUT_STEPS.length;
  const isFirstStep = stepIndex === 0;
  const isResultsStep = step === PRESELECCION_STEPS.results;
  const isLastInputStep = step === PRESELECCION_INPUT_STEPS[inputStepCount - 1];

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const target = event.target;
      const { name, value } = target;

      if (target.type === "checkbox") {
        const checked = target.checked;
        setForm((previous) => ({ ...previous, [name]: checked }));
        return;
      }

      setForm((previous) => ({ ...previous, [name]: value }));
    },
    [],
  );

  const goToStep = useCallback((next: PreseleccionStep) => {
    setStep(next);
  }, []);

  const goNext = useCallback(() => {
    setStep((current) => {
      const currentIndex = PRESELECCION_STEP_ORDER.indexOf(current);

      if (currentIndex === -1 || currentIndex === totalSteps - 1) {
        return current;
      }

      return PRESELECCION_STEP_ORDER[currentIndex + 1];
    });
  }, [totalSteps]);

  const goBack = useCallback(() => {
    setStep((current) => {
      const currentIndex = PRESELECCION_STEP_ORDER.indexOf(current);

      if (currentIndex <= 0) {
        return current;
      }

      return PRESELECCION_STEP_ORDER[currentIndex - 1];
    });
  }, []);

  const reset = useCallback(() => {
    setForm({ ...PRESELECCION_DEFAULT_FORM });
    setStep(PRESELECCION_STEP_ORDER[0]);
    setFeedback(null);
  }, []);

  // Lazily load the catalog only when the user reaches the results step. The
  // result is cached for the rest of the session so refining + re-checking
  // does not refetch.
  useEffect(() => {
    if (!isResultsStep || hasLoadedProperties) {
      return;
    }

    let mounted = true;
    setIsLoading(true);
    setFeedback(null);

    async function fetchCatalog() {
      try {
        const data = await getProperties();
        if (mounted) {
          setProperties(data);
          setHasLoadedProperties(true);
        }
      } catch (error) {
        if (mounted) {
          setFeedback({
            type: "error",
            text:
              error instanceof Error ? error.message : texts.loadError,
          });
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    void fetchCatalog();

    return () => {
      mounted = false;
    };
  }, [hasLoadedProperties, isResultsStep, texts.loadError]);

  const result = useMemo<PreseleccionResult | null>(() => {
    if (!isResultsStep || !hasLoadedProperties) {
      return null;
    }

    return computeResult(properties, form);
  }, [form, hasLoadedProperties, isResultsStep, properties]);

  return {
    step,
    stepIndex,
    totalSteps,
    inputStepCount,
    form,
    isLoading,
    feedback,
    result,
    isFirstStep,
    isLastInputStep,
    isResultsStep,
    handleChange,
    goNext,
    goBack,
    goToStep,
    reset,
  };
}
