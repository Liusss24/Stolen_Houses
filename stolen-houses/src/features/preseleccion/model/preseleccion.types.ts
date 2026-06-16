import type { RankedProperty } from "@/features/property-search/model/property-search.types";

export const PRESELECCION_STEPS = {
  location: "location",
  spaces: "spaces",
  style: "style",
  results: "results",
} as const;

export type PreseleccionStep =
  (typeof PRESELECCION_STEPS)[keyof typeof PRESELECCION_STEPS];

export type PreseleccionForm = {
  location: string;
  minPrice: string;
  maxPrice: string;
  minBedrooms: string;
  minBathrooms: string;
  minArea: string;
  keywords: string;
  featuredOnly: boolean;
  model3dOnly: boolean;
};

export type PreseleccionResultKind = "matches" | "suggestions" | "empty";

export type PreseleccionResult = {
  kind: PreseleccionResultKind;
  items: ReadonlyArray<RankedProperty>;
};

export type PreseleccionFeedback = {
  type: "error";
  text: string;
} | null;
