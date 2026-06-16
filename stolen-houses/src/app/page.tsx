import { cookies } from "next/headers";
import type { Metadata } from "next";

import { AUTH_COOKIE_NAME, AUTH_ROLES } from "@/features/auth";
import { getLocale } from "@/shared/lib/get-locale";
import { LANDING_TEXTS as ES_TEXTS } from "@/i18n/es/landing";
import { LANDING_TEXTS as EN_TEXTS } from "@/i18n/en/landing";
import { LandingCatalog } from "@/widgets/landing-catalog";
import { LandingContact } from "@/widgets/landing-contact";
import { LandingFooter } from "@/widgets/landing-footer";
import { LandingHeader } from "@/widgets/landing-header";
import { LandingHero } from "@/widgets/landing-hero";
import { LandingTestimonials } from "@/widgets/landing-testimonials";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const texts = (locale === "en" ? EN_TEXTS : ES_TEXTS) as typeof ES_TEXTS;
  return {
    title: texts.metadata.title,
    description: texts.metadata.description,
  };
}

export default async function LandingPage() {
  const locale = await getLocale();
  const texts = (locale === "en" ? EN_TEXTS : ES_TEXTS) as typeof ES_TEXTS;

  const cookieStore = await cookies();
  const role = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  const showLogin = role !== AUTH_ROLES.client;

  return (
    <div>
      <LandingHeader
        brand={texts.brand}
        navigation={texts.navigation}
        activeLocale={locale}
        showLogin={showLogin}
      />
      <LandingHero hero={texts.hero} />
      <LandingCatalog catalog={texts.catalog} />
      <LandingTestimonials
        testimonials={texts.testimonials}
        indexPrefix={texts.catalog.cardLabels.indexPrefix}
      />
      <LandingContact contact={texts.contact} />
      <LandingFooter brand={texts.brand} footer={texts.footer} />
    </div>
  );
}
