import type { Property } from "@/entities/property/model/property.types";
import { PROPERTY_CRUD_TEXTS } from "@/i18n/es/property-crud";
import { formatCurrency } from "@/shared/lib/format-currency";

import styles from "./property-crud-list.module.css";

export interface PropertyCrudListProps {
  properties: Property[];
  isLoading: boolean;
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
}

export function PropertyCrudList({
  properties,
  isLoading,
  onEdit,
  onDelete,
}: PropertyCrudListProps) {
  const texts = PROPERTY_CRUD_TEXTS;

  return (
    <section className={styles.panel}>
      <h2 className={styles.sectionTitle}>{texts.list.title}</h2>

      {isLoading ? (
        <p className={styles.loadingText}>{texts.list.loading}</p>
      ) : properties.length === 0 ? (
        <p className={styles.emptyText}>{texts.list.empty}</p>
      ) : (
        <div className={styles.cardsGrid}>
          {properties.map((property) => (
            <article key={property.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleBlock}>
                  <h3 className={styles.cardTitle}>{property.title}</h3>
                  <p className={styles.cardLocation}>{property.location}</p>
                </div>

                {property.featured ? (
                  <span className={styles.featuredBadge}>
                    {texts.card.featured}
                  </span>
                ) : null}
              </div>

              <div className={styles.cardDetails}>
                <p>
                  <span className={styles.cardLabel}>{texts.card.price}:</span>{" "}
                  {formatCurrency(property.price)}
                </p>

                <p>
                  <span className={styles.cardLabel}>
                    {texts.card.bedrooms}:
                  </span>{" "}
                  {property.bedrooms}
                </p>

                <p>
                  <span className={styles.cardLabel}>
                    {texts.card.bathrooms}:
                  </span>{" "}
                  {property.bathrooms}
                </p>

                <p>
                  <span className={styles.cardLabel}>{texts.card.area}:</span>{" "}
                  {property.area} {texts.card.units.area}
                </p>
              </div>

              <p className={styles.cardDescription}>{property.description}</p>

              <div className={styles.cardActions}>
                <button
                  type="button"
                  onClick={() => onEdit(property)}
                  className={styles.editButton}
                >
                  {texts.card.edit}
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(property.id)}
                  className={styles.deleteButton}
                >
                  {texts.card.delete}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
