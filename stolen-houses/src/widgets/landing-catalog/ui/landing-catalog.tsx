import type { LandingTexts } from "@/i18n/es/landing";

import { LandingPropertyCard } from "./landing-property-card";
import styles from "./landing-catalog.module.css";

export type LandingCatalogProps = {
  catalog: LandingTexts["catalog"];
};

export function LandingCatalog({ catalog }: LandingCatalogProps) {
  return (
    <section className={styles.section} id="servicios">
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div>
            <p className={styles.kicker}>— {catalog.kicker} —</p>
            <h2 className={styles.title}>{catalog.title}</h2>
            <p className={styles.description}>{catalog.description}</p>
          </div>

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.controlButton}
              aria-label={catalog.carousel.previous}
            >
              {"<"}
            </button>
            <button
              type="button"
              className={`${styles.controlButton} ${styles.controlButtonPrimary}`}
              aria-label={catalog.carousel.next}
            >
              {">"}
            </button>
          </div>
        </div>

        <div className={styles.grid}>
          {catalog.properties.map((property) => (
            <LandingPropertyCard
              key={property.id}
              property={property}
              labels={catalog.cardLabels}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
