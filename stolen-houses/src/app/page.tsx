import type { Metadata } from "next";

import { LANDING_TEXTS } from "@/i18n/es/landing";
import { LandingCatalog } from "@/widgets/landing-catalog";
import { LandingContact } from "@/widgets/landing-contact";
import { LandingFooter } from "@/widgets/landing-footer";
import { LandingHeader } from "@/widgets/landing-header";
import { LandingHero } from "@/widgets/landing-hero";
import { LandingTestimonials } from "@/widgets/landing-testimonials";

export const metadata: Metadata = {
  title: LANDING_TEXTS.metadata.title,
  description: LANDING_TEXTS.metadata.description,
};

export default function LandingPage() {
  const texts = LANDING_TEXTS;

  return (
    <div>
      <LandingHeader brand={texts.brand} navigation={texts.navigation} />
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
