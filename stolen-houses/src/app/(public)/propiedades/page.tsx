import type { Metadata } from "next";

import { getLocale } from "@/shared/lib/get-locale";
import { PROPERTY_SEARCH_TEXTS as ES_TEXTS } from "@/i18n/es/property-search";
import { PROPERTY_SEARCH_TEXTS as EN_TEXTS } from "@/i18n/en/property-search";
import { PropertySearchPage } from "./property-search-page";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const texts = (locale === "en" ? EN_TEXTS : ES_TEXTS) as typeof ES_TEXTS;
  return {
    title: texts.page.metadataTitle,
    description: texts.page.metadataDescription,
  };
}

export default async function PropertiesPage() {
  const locale = await getLocale();
  return <PropertySearchPage locale={locale} />;
}
