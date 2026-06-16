"use client";

import Link from "next/link";

import { formatCurrency } from "@/shared/lib/format-currency";
import type { RankedProperty } from "@/features/property-search/model/property-search.types";
import type { PropertySearchTexts } from "@/i18n/es/property-search";

import styles from "./property-catalog.module.css";

const DETAIL_PATH_PREFIX = "/propiedades";

type PropertyCatalogProps = {
  texts: PropertySearchTexts;
  results: RankedProperty[];
  totalProperties: number;
  activeFiltersCount: number;
  hasRankingFilters: boolean;
  isLoading: boolean;
};

export function PropertyCatalog({
  texts,
  results,
  totalProperties,
  activeFiltersCount,
  hasRankingFilters,
  isLoading,
}: PropertyCatalogProps) {
  return (
    <section className={styles.panel}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>{texts.results.title}</h2>
          <p className={styles.summary}>
            {texts.results.summary(
              String(results.length),
              String(totalProperties),
            )}
          </p>
        </div>

        <div className={styles.meta}>
          {activeFiltersCount > 0 ? (
            <span className={styles.metaBadge}>
              {texts.results.activeFilters(String(activeFiltersCount))}
            </span>
          ) : null}
        </div>
      </div>

      {!hasRankingFilters && activeFiltersCount === 0 ? (
        <p className={styles.note}>{texts.results.defaultOrder}</p>
      ) : null}

      {isLoading ? (
        <p role="status" className={styles.status}>
          {texts.results.loading}
        </p>
      ) : totalProperties === 0 ? (
        <p role="status" className={styles.status}>
          {texts.results.emptyCatalog}
        </p>
      ) : results.length === 0 ? (
        <p role="status" className={styles.status}>
          {texts.results.noResults}
        </p>
      ) : (
        <div className={styles.grid}>
          {results.map(({ property, similarityScore }) => {
            const hasImage = Boolean(property.image?.trim());
            const showModel3d = Boolean(property.model3d?.trim());
            const similarityPercentage = String(
              Math.round(similarityScore * 100),
            );

            return (
              <Link
                key={property.id}
                href={`${DETAIL_PATH_PREFIX}/${property.id}`}
                className={styles.cardLink}
              >
                <article className={styles.card}>
                  <div className={styles.media}>
                    {hasImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={property.image}
                        alt={`${texts.card.imageAltPrefix}: ${property.title}`}
                        className={styles.image}
                        loading="lazy"
                      />
                    ) : (
                      <div className={styles.imageFallback}>
                        {texts.card.noImage}
                      </div>
                    )}
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.cardHeader}>
                      <div className={styles.titleBlock}>
                        <h3 className={styles.cardTitle}>{property.title}</h3>
                        <p className={styles.location}>{property.location}</p>
                      </div>

                      <div className={styles.badges}>
                        {property.featured ? (
                          <span className={styles.badgePrimary}>
                            {texts.card.featured}
                          </span>
                        ) : null}

                        {showModel3d ? (
                          <span className={styles.badgeSecondary}>
                            {texts.card.model3d}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <div className={styles.priceBlock}>
                      <p className={styles.priceLabel}>
                        {texts.card.labels.price}
                      </p>
                      <p className={styles.price}>
                        {formatCurrency(property.price)}
                      </p>
                    </div>

                    {hasRankingFilters ? (
                      <p className={styles.match}>
                        {texts.card.match(similarityPercentage)}
                      </p>
                    ) : null}

                    <dl className={styles.details}>
                      <div className={styles.detailItem}>
                        <dt className={styles.detailLabel}>
                          {texts.card.labels.bedrooms}
                        </dt>
                        <dd className={styles.detailValue}>
                          {property.bedrooms}
                        </dd>
                      </div>

                      <div className={styles.detailItem}>
                        <dt className={styles.detailLabel}>
                          {texts.card.labels.bathrooms}
                        </dt>
                        <dd className={styles.detailValue}>
                          {property.bathrooms}
                        </dd>
                      </div>

                      <div className={styles.detailItem}>
                        <dt className={styles.detailLabel}>
                          {texts.card.labels.area}
                        </dt>
                        <dd className={styles.detailValue}>
                          {property.area} {texts.card.units.area}
                        </dd>
                      </div>
                    </dl>

                    <p className={styles.description}>
                      {property.description}
                    </p>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
