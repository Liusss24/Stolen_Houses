"use client";

import { PROPERTY_SEARCH_TEXTS } from "@/i18n/es/property-search";
import { usePropertySearch } from "@/features/property-search/hooks/use-property-search";
import { FilterPanel } from "@/widgets/filter-panel/ui/filter-panel";
import { PropertyCatalog } from "@/widgets/property-catalog/ui/property-catalog";

import styles from "./property-search-page.module.css";

export function PropertySearchPage() {
  const texts = PROPERTY_SEARCH_TEXTS;
  const {
    filters,
    results,
    totalProperties,
    isLoading,
    feedback,
    activeFiltersCount,
    hasRankingFilters,
    handleFilterChange,
    resetFilters,
  } = usePropertySearch(texts);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.dividerRow}>
          <span className={styles.divider} aria-hidden="true" />
          <span className={styles.eyebrow}>{texts.page.eyebrow}</span>
          <span className={styles.divider} aria-hidden="true" />
        </div>
        <h1 className={styles.title}>{texts.page.title}</h1>
        <p className={styles.description}>{texts.page.description}</p>
      </section>

      {feedback ? (
        <p role="alert" className={styles.feedback}>
          {feedback.text}
        </p>
      ) : null}

      <section className={styles.content}>
        <div className={styles.sidebar}>
          <FilterPanel
            texts={texts}
            filters={filters}
            onChange={handleFilterChange}
            onReset={resetFilters}
          />
        </div>

        <div className={styles.results}>
          <PropertyCatalog
            texts={texts}
            results={results}
            totalProperties={totalProperties}
            activeFiltersCount={activeFiltersCount}
            hasRankingFilters={hasRankingFilters}
            isLoading={isLoading}
          />
        </div>
      </section>
    </main>
  );
}