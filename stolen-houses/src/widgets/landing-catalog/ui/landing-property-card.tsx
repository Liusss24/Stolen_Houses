import Image from "next/image";

import type {
  LandingShowcaseProperty,
  LandingTexts,
} from "@/i18n/es/landing";

import styles from "./landing-property-card.module.css";

export type LandingPropertyCardProps = {
  property: LandingShowcaseProperty;
  labels: LandingTexts["catalog"]["cardLabels"];
};

export function LandingPropertyCard({
  property,
  labels,
}: LandingPropertyCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Image
          src={property.image}
          alt={property.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className={styles.image}
        />
        <div className={styles.mediaScrim} aria-hidden="true" />

        {property.featured ? (
          <span className={styles.featuredBadge}>{labels.featured}</span>
        ) : (
          <span className={styles.mediaLabel}>
            {labels.indexPrefix} {property.index} · {labels.panorama}
          </span>
        )}

        {!property.featured ? (
          <span className={styles.categoryBadge}>{property.category}</span>
        ) : null}
      </div>

      <div className={styles.body}>
        {property.featured ? (
          <p className={styles.indexLine}>
            {labels.indexPrefix} {property.index} · {property.category}
          </p>
        ) : null}

        <h3 className={styles.name}>{property.name}</h3>

        <p className={styles.location}>{property.location}</p>

        <div className={styles.priceRow}>
          <span className={styles.price}>{property.price}</span>
          <span className={styles.specs}>
            {property.bedrooms} {labels.bedrooms} · {property.bathrooms}{" "}
            {labels.bathrooms} · {property.area} {labels.areaUnit}
          </span>
        </div>
      </div>
    </article>
  );
}
