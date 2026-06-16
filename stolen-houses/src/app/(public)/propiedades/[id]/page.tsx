import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getLocale } from "@/shared/lib/get-locale";
import { PROPERTY_DETAIL_TEXTS as ES_TEXTS } from "@/i18n/es/property-detail";
import { PROPERTY_DETAIL_TEXTS as EN_TEXTS } from "@/i18n/en/property-detail";
import { getPropertyById } from "@/shared/lib/properties-file";
import { PropertyDetail } from "@/widgets/property-detail";

export const dynamic = "force-dynamic";

const CATALOG_HREF = "/propiedades";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const [{ id }, locale] = await Promise.all([params, getLocale()]);
  const texts = (locale === "en" ? EN_TEXTS : ES_TEXTS) as typeof ES_TEXTS;
  const property = await getPropertyById(id);

  if (!property) {
    return { title: texts.notFound.title };
  }

  return {
    title: property.title,
    description: `${texts.metadata.descriptionPrefix} ${property.title} ${texts.metadata.descriptionSuffix}`,
  };
}

export default async function PropertyDetailPage({ params }: RouteParams) {
  const [{ id }, locale] = await Promise.all([params, getLocale()]);
  const texts = (locale === "en" ? EN_TEXTS : ES_TEXTS) as typeof ES_TEXTS;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <PropertyDetail property={property} catalogHref={CATALOG_HREF} texts={texts} />
  );
}
