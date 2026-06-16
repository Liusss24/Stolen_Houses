import {
  PRESELECCION_STEPS,
  type PreseleccionForm,
  type PreseleccionStep,
} from "./preseleccion.types";

export const PRESELECCION_DEFAULT_FORM: PreseleccionForm = {
  location: "",
  minPrice: "",
  maxPrice: "",
  minBedrooms: "",
  minBathrooms: "",
  minArea: "",
  keywords: "",
  featuredOnly: false,
  model3dOnly: false,
};

export const PRESELECCION_INPUT_STEPS: ReadonlyArray<PreseleccionStep> = [
  PRESELECCION_STEPS.location,
  PRESELECCION_STEPS.spaces,
  PRESELECCION_STEPS.style,
];

export const PRESELECCION_STEP_ORDER: ReadonlyArray<PreseleccionStep> = [
  ...PRESELECCION_INPUT_STEPS,
  PRESELECCION_STEPS.results,
];

/**
 * Threshold over which a ranked result is considered a true match (vs. a loose
 * suggestion). Tuned conservatively so that "matches" feel intentional.
 */
export const PRESELECCION_MATCH_THRESHOLD = 0.45;

/**
 * Maximum number of suggestion cards shown when no exact match exists, so the
 * fallback view stays curated.
 */
export const PRESELECCION_SUGGESTION_LIMIT = 6;
