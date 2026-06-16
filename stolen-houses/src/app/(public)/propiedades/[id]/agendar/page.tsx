import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getLocale } from "@/shared/lib/get-locale";
import { SCHEDULE_APPOINTMENT_TEXTS as ES_TEXTS } from "@/i18n/es/schedule-appointment";
import { SCHEDULE_APPOINTMENT_TEXTS as EN_TEXTS } from "@/i18n/en/schedule-appointment";
import { formatCurrency } from "@/shared/lib/format-currency";
import { getPropertyById } from "@/shared/lib/properties-file";
import { ScheduleAppointmentForm } from "@/widgets/schedule-appointment-form";

import styles from "./page.module.css";

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
    return { title: texts.metadata.titlePrefix };
  }

  return {
    title: `${texts.metadata.titlePrefix} — ${property.title}`,
    description: `${texts.metadata.descriptionPrefix} ${property.title}.`,
  };
}

export default async function ScheduleAppointmentPage({
  params,
}: RouteParams) {
  const [{ id }, locale] = await Promise.all([params, getLocale()]);
  const texts = (locale === "en" ? EN_TEXTS : ES_TEXTS) as typeof ES_TEXTS;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  const propertyHref = `${CATALOG_HREF}/${property.id}`;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="Migas de pan">
          <Link href={CATALOG_HREF} className={styles.breadcrumbLink}>
            {texts.breadcrumb.catalogLabel}
          </Link>
          <span className={styles.breadcrumbSeparator} aria-hidden="true">
            {texts.breadcrumb.separator}
          </span>
          <Link href={propertyHref} className={styles.breadcrumbLink}>
            {property.title}
          </Link>
          <span className={styles.breadcrumbSeparator} aria-hidden="true">
            {texts.breadcrumb.separator}
          </span>
          <span className={styles.breadcrumbCurrent}>
            {texts.breadcrumb.currentLabel}
          </span>
        </nav>

        <header className={styles.header}>
          <div className={styles.dividerRow}>
            <span className={styles.eyebrow}>{texts.header.eyebrow}</span>
            <span className={styles.divider} aria-hidden="true" />
          </div>
          <h1 className={styles.title}>{texts.header.title}</h1>
          <p className={styles.description}>{texts.header.description}</p>
        </header>

        <div className={styles.contentGrid}>
          <aside
            className={styles.propertyPanel}
            aria-label={texts.property.sectionTitle}
          >
            <span className={styles.propertyEyebrow}>
              {texts.property.sectionTitle}
            </span>
            <h2 className={styles.propertyTitle}>{property.title}</h2>
            <p className={styles.propertyLocation}>{property.location}</p>

            <dl className={styles.propertyMeta}>
              <div className={styles.metaItem}>
                <dt className={styles.metaLabel}>
                  {texts.property.locationLabel}
                </dt>
                <dd className={styles.metaValue}>{property.location}</dd>
              </div>
              <div className={styles.metaItem}>
                <dt className={styles.metaLabel}>
                  {texts.property.priceLabel}
                </dt>
                <dd className={styles.metaValue}>
                  {formatCurrency(property.price)}
                </dd>
              </div>
            </dl>

            <dl className={styles.specsRow}>
              <div className={styles.specItem}>
                <dt className={styles.specLabel}>
                  {texts.property.areaLabel}
                </dt>
                <dd className={styles.specValue}>
                  {property.area}
                  <span className="sr-only"> {texts.property.areaUnit}</span>
                </dd>
              </div>
              <div className={styles.specItem}>
                <dt className={styles.specLabel}>
                  {texts.property.bedroomsLabel}
                </dt>
                <dd className={styles.specValue}>
                  {String(property.bedrooms).padStart(2, "0")}
                </dd>
              </div>
              <div className={styles.specItem}>
                <dt className={styles.specLabel}>
                  {texts.property.bathroomsLabel}
                </dt>
                <dd className={styles.specValue}>
                  {String(property.bathrooms).padStart(2, "0")}
                </dd>
              </div>
            </dl>
          </aside>

          <ScheduleAppointmentForm
            property={property}
            catalogHref={CATALOG_HREF}
            texts={texts}
          />
        </div>
      </div>
    </main>
  );
}
