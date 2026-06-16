import Link from "next/link";

import type { Property } from "@/entities/property/model/property.types";
import type { PropertyDetailTexts } from "@/i18n/es/property-detail";
import { formatCurrency } from "@/shared/lib/format-currency";

import styles from "./property-detail-actions.module.css";

export type PropertyDetailActionsProps = {
  property: Property;
  texts: PropertyDetailTexts["actions"];
  catalogHref: string;
  catalogLabel: string;
};

export function PropertyDetailActions({
  property,
  texts,
  catalogHref,
  catalogLabel,
}: PropertyDetailActionsProps) {
  return (
    <aside className={styles.panel} aria-label={texts.title}>
      <div>
        <span className={styles.eyebrow}>{texts.priceLabel}</span>
        <h2 className={styles.title}>{texts.title}</h2>
      </div>

      <div className={styles.priceBlock}>
        <span className={styles.priceLabel}>{texts.priceLabel}</span>
        <span className={styles.price}>{formatCurrency(property.price)}</span>
      </div>

      <div className={styles.buttonStack}>
        <Link
          href={`${catalogHref}/${property.id}/agendar`}
          className={styles.primaryButton}
        >
          {texts.scheduleLabel}
          <span aria-hidden="true">{">"}</span>
        </Link>

        <button
          type="button"
          className={styles.secondaryButton}
          disabled
          aria-disabled="true"
          title={texts.pendingNote}
        >
          {texts.saveLabel}
        </button>

        <p className={styles.note}>{texts.pendingNote}</p>
      </div>

      <Link href={catalogHref} className={styles.backLink}>
        <span aria-hidden="true">{"<"}</span>
        {catalogLabel}
      </Link>
    </aside>
  );
}
