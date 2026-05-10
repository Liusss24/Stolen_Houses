import type { Property } from "@/entities/property/model/property.types";

export type PropertySearchFilters = {
  query: string;
  location: string;
  minPrice: string;
  maxPrice: string;
  minBedrooms: string;
  minBathrooms: string;
  minArea: string;
  featuredOnly: boolean;
  panoramaOnly: boolean;
};

export type RankedProperty = {
  property: Property;
  similarityScore: number;
};

export type PropertySearchFeedbackState = {
  type: "error";
  text: string;
} | null;