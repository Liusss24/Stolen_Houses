import type { Property } from "@/entities/property/model/property.types";
import type { PropertyDetailTexts } from "@/i18n/es/property-detail";
import { DEFAULT_LOCALE } from "@/shared/constants/intl.constants";

import styles from "./property-detail-summary.module.css";

export type PropertyDetailSummaryProps = {
  property: Property;
  texts: PropertyDetailTexts["summary"];
};

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }

  return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function PropertyDetailSummary({
  property,
  texts,
}: PropertyDetailSummaryProps) {
  return (
    <section className={styles.summary}>
      <header className={styles.head}>
        <span className={styles.eyebrow}>{texts.eyebrow}</span>
        <h1 className={styles.title}>{property.title}</h1>
        <p className={styles.location}>{property.location}</p>
      </header>

      <dl className={styles.specsRow}>
        <div className={styles.stat}>
          <dt className={styles.statLabel}>{texts.specs.areaLabel}</dt>
          <dd className={styles.statValue}>{property.area}</dd>
        </div>
        <div className={styles.stat}>
          <dt className={styles.statLabel}>{texts.specs.bedroomsLabel}</dt>
          <dd className={styles.statValue}>
            {String(property.bedrooms).padStart(2, "0")}
          </dd>
        </div>
        <div className={styles.stat}>
          <dt className={styles.statLabel}>{texts.specs.bathroomsLabel}</dt>
          <dd className={styles.statValue}>
            {String(property.bathrooms).padStart(2, "0")}
          </dd>
        </div>
      </dl>

      <div className={styles.descriptionBlock}>
        <h2 className={styles.descriptionTitle}>{texts.descriptionTitle}</h2>
        <p className={styles.descriptionBody}>{property.description}</p>
      </div>

      <div className={styles.metaBlock}>
        <h3 className={styles.metaTitle}>{texts.metaTitle}</h3>
        <dl className={styles.metaList}>
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>{texts.metaLabels.identifier}</dt>
            <dd className={styles.metaValue}>{property.id}</dd>
          </div>
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>{texts.metaLabels.createdAt}</dt>
            <dd className={styles.metaValue}>{formatDate(property.createdAt)}</dd>
          </div>
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>{texts.metaLabels.updatedAt}</dt>
            <dd className={styles.metaValue}>{formatDate(property.updatedAt)}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
