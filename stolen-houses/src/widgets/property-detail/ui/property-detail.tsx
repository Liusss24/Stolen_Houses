import Link from "next/link";

import type { Property } from "@/entities/property/model/property.types";
import {
  PROPERTY_DETAIL_TEXTS,
  type PropertyDetailTexts,
} from "@/i18n/es/property-detail";

import { PropertyDetailActions } from "./property-detail-actions";
import { PropertyDetailGallery } from "./property-detail-gallery";
import { PropertyDetailSummary } from "./property-detail-summary";
import styles from "./property-detail.module.css";

export type PropertyDetailProps = {
  property: Property;
  catalogHref: string;
  texts?: PropertyDetailTexts;
};

export function PropertyDetail({
  property,
  catalogHref,
  texts = PROPERTY_DETAIL_TEXTS,
}: PropertyDetailProps) {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="Migas de pan">
          <Link href={catalogHref} className={styles.breadcrumbLink}>
            {texts.breadcrumb.catalogLabel}
          </Link>
          <span className={styles.breadcrumbSeparator} aria-hidden="true">
            {texts.breadcrumb.separator}
          </span>
          <span className={styles.breadcrumbCurrent}>{property.title}</span>
        </nav>

        <PropertyDetailGallery
          property={property}
          texts={texts.gallery}
        />

        <div className={styles.contentGrid}>
          <PropertyDetailSummary
            property={property}
            texts={texts.summary}
          />

          <PropertyDetailActions
            property={property}
            texts={texts.actions}
            catalogHref={catalogHref}
            catalogLabel={texts.breadcrumb.backLabel}
          />
        </div>
      </div>
    </main>
  );
}
