import type { Metadata } from "next";

import { PROPERTY_SEARCH_TEXTS } from "@/i18n/es/property-search";
import { PropertySearchPage } from "./property-search-page";

export const metadata: Metadata = {
  title: PROPERTY_SEARCH_TEXTS.page.metadataTitle,
  description: PROPERTY_SEARCH_TEXTS.page.metadataDescription,
};

export default function PropertiesPage() {
  return <PropertySearchPage />;
}