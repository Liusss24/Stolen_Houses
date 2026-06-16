"use client";

import Link from "next/link";

import type {
  PreseleccionFeedback,
  PreseleccionForm,
  PreseleccionResult,
} from "@/features/preseleccion/model/preseleccion.types";
import type { PreseleccionTexts } from "@/i18n/es/preseleccion";
import { formatCurrency } from "@/shared/lib/format-currency";

import styles from "./preseleccion-results.module.css";

export type PreseleccionResultsProps = {
  form: PreseleccionForm;
  result: PreseleccionResult | null;
  isLoading: boolean;
  feedback: PreseleccionFeedback;
  texts: PreseleccionTexts;
  catalogHref: string;
  onRefine: () => void;
  onRestart: () => void;
};

const DETAIL_PATH_PREFIX = "/propiedades";

function formatBudgetSummary(
  form: PreseleccionForm,
  texts: PreseleccionTexts["results"]["summary"],
): string {
  const min = form.minPrice.trim();
  const max = form.maxPrice.trim();

  if (!min && !max) {
    return texts.anyBudget;
  }

  if (min && max) {
    return texts.budgetRange(
      formatCurrency(Number(min)),
      formatCurrency(Number(max)),
    );
  }

  if (min) {
    return texts.budgetMin(formatCurrency(Number(min)));
  }

  return texts.budgetMax(formatCurrency(Number(max)));
}

function formatSpacesSummary(
  form: PreseleccionForm,
  texts: PreseleccionTexts["results"]["summary"],
): string {
  const bedrooms = form.minBedrooms.trim();
  const bathrooms = form.minBathrooms.trim();
  const area = form.minArea.trim();

  if (!bedrooms && !bathrooms && !area) {
    return texts.spacesAny;
  }

  return texts.spacesValue(
    bedrooms || "0",
    bathrooms || "0",
    area || "0",
  );
}

function formatFiltersSummary(
  form: PreseleccionForm,
  texts: PreseleccionTexts["results"]["summary"],
): string {
  const active: string[] = [];

  if (form.featuredOnly) active.push(texts.filtersFeatured);
  if (form.model3dOnly) active.push(texts.filtersModel3d);

  return active.length === 0 ? texts.filtersNone : active.join(" · ");
}

export function PreseleccionResults({
  form,
  result,
  isLoading,
  feedback,
  texts,
  catalogHref,
  onRefine,
  onRestart,
}: PreseleccionResultsProps) {
  const summaryTexts = texts.results.summary;
  const listTexts = texts.results.list;
  const cardTexts = texts.results.card;

  const renderHeader = () => {
    if (!result || result.kind === "matches") {
      const count = result?.items.length ?? 0;
      return (
        <header className={styles.header}>
          <span className={styles.headerEyebrow}>
            {texts.steps.results.eyebrow}
          </span>
          <h2 className={styles.headerTitle}>{listTexts.matchesTitle}</h2>
          <p className={styles.headerDescription}>
            {listTexts.matchesSummary(String(count))}
          </p>
        </header>
      );
    }

    if (result.kind === "suggestions") {
      return (
        <header className={styles.header}>
          <span className={styles.headerEyebrow}>
            {texts.steps.results.eyebrow}
          </span>
          <h2 className={styles.headerTitle}>{listTexts.suggestionsTitle}</h2>
          <p className={styles.headerDescription}>
            {listTexts.suggestionsSummary}
          </p>
        </header>
      );
    }

    return (
      <header className={styles.header}>
        <span className={styles.headerEyebrow}>
          {texts.steps.results.eyebrow}
        </span>
        <h2 className={styles.headerTitle}>{listTexts.emptyTitle}</h2>
        <p className={styles.headerDescription}>{listTexts.emptySummary}</p>
      </header>
    );
  };

  return (
    <div className={styles.results}>
      <aside className={styles.summaryPanel} aria-label={texts.results.summaryTitle}>
        <span className={styles.summaryTitle}>{texts.results.summaryTitle}</span>

        <dl className={styles.summaryGrid}>
          <div className={styles.summaryItem}>
            <dt className={styles.summaryLabel}>{summaryTexts.location}</dt>
            <dd className={styles.summaryValue}>
              {form.location.trim() || summaryTexts.anyLocation}
            </dd>
          </div>
          <div className={styles.summaryItem}>
            <dt className={styles.summaryLabel}>{summaryTexts.budget}</dt>
            <dd className={styles.summaryValue}>
              {formatBudgetSummary(form, summaryTexts)}
            </dd>
          </div>
          <div className={styles.summaryItem}>
            <dt className={styles.summaryLabel}>{summaryTexts.spaces}</dt>
            <dd className={styles.summaryValue}>
              {formatSpacesSummary(form, summaryTexts)}
            </dd>
          </div>
          <div className={styles.summaryItem}>
            <dt className={styles.summaryLabel}>{summaryTexts.filters}</dt>
            <dd className={styles.summaryValue}>
              {formatFiltersSummary(form, summaryTexts)}
            </dd>
          </div>
        </dl>
      </aside>

      {feedback ? (
        <p role="alert" className={styles.feedback}>
          {feedback.text}
        </p>
      ) : null}

      {renderHeader()}

      {isLoading ? (
        <p role="status" className={styles.status}>
          {listTexts.loading}
        </p>
      ) : result && result.items.length > 0 ? (
        <div className={styles.grid}>
          {result.items.map(({ property, similarityScore }) => {
            const hasImage = Boolean(property.image?.trim());
            const hasModel3d = Boolean(property.model3d?.trim());
            const percentage = String(Math.round(similarityScore * 100));

            return (
              <Link
                key={property.id}
                href={`${DETAIL_PATH_PREFIX}/${property.id}`}
                className={styles.card}
              >
                <div className={styles.media}>
                  {hasImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={property.image}
                      alt={`${cardTexts.imageAltPrefix}: ${property.title}`}
                      className={styles.image}
                      loading="lazy"
                    />
                  ) : (
                    <div className={styles.imageFallback}>
                      {cardTexts.noImage}
                    </div>
                  )}
                  <div className={styles.scrim} aria-hidden="true" />

                  <div className={styles.badgeRow}>
                    {property.featured ? (
                      <span className={styles.featuredBadge}>
                        {cardTexts.featuredBadge}
                      </span>
                    ) : (
                      <span aria-hidden="true" />
                    )}
                    {hasModel3d ? (
                      <span className={styles.model3dBadge}>
                        {cardTexts.model3dBadge}
                      </span>
                    ) : null}
                  </div>

                  <span className={styles.matchPill}>
                    {cardTexts.matchLabel(percentage)}
                  </span>
                </div>

                <div className={styles.body}>
                  <h3 className={styles.cardTitle}>{property.title}</h3>
                  <p className={styles.cardLocation}>{property.location}</p>

                  <div className={styles.priceRow}>
                    <span className={styles.price}>
                      {formatCurrency(property.price)}
                    </span>
                    <span className={styles.specs}>
                      {property.bedrooms} {cardTexts.bedroomsLabel} ·{" "}
                      {property.bathrooms} {cardTexts.bathroomsLabel} ·{" "}
                      {property.area} {cardTexts.areaUnit}
                    </span>
                  </div>

                  <span className={styles.cardCta}>
                    {cardTexts.cta}
                    <span aria-hidden="true">{">"}</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : !isLoading ? (
        <p role="status" className={styles.status}>
          {listTexts.emptySummary}
        </p>
      ) : null}

      {result && result.kind !== "matches" ? (
        <aside className={styles.fallbackPanel}>
          <h3 className={styles.fallbackTitle}>
            {texts.results.fallback.title}
          </h3>
          <p className={styles.fallbackDescription}>
            {texts.results.fallback.description}
          </p>
        </aside>
      ) : null}

      <div className={styles.actions}>
        <button
          type="button"
          onClick={onRefine}
          className={styles.actionSecondary}
        >
          <span aria-hidden="true">{"<"}</span>
          {texts.navigation.refineLabel}
        </button>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={onRestart}
            className={styles.actionSecondary}
          >
            {texts.navigation.restartLabel}
          </button>

          <Link href={catalogHref} className={styles.actionPrimary}>
            {texts.navigation.catalogLabel}
            <span aria-hidden="true">{">"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
