"use client";

import { useLandingSearch } from "@/features/landing/hooks/use-landing-search";
import type { LandingTexts } from "@/i18n/es/landing";

import styles from "./landing-hero-search.module.css";

export type LandingHeroSearchProps = {
  search: LandingTexts["hero"]["search"];
};

const FIELD_IDS = {
  location: "landing-search-location",
  type: "landing-search-type",
  budget: "landing-search-budget",
} as const;

export function LandingHeroSearch({ search }: LandingHeroSearchProps) {
  const { values, handleChange, handleSubmit } = useLandingSearch();

  return (
    <form className={styles.searchCard} onSubmit={handleSubmit}>
      <p className={styles.title}>{search.title}</p>

      <div className={styles.fields}>
        <label className={styles.field} htmlFor={FIELD_IDS.location}>
          <span className={styles.label}>{search.fields.location.label}</span>
          <input
            id={FIELD_IDS.location}
            name="location"
            type="text"
            value={values.location}
            onChange={handleChange}
            placeholder={search.fields.location.placeholder}
            className={styles.input}
          />
        </label>

        <label className={styles.field} htmlFor={FIELD_IDS.type}>
          <span className={styles.label}>{search.fields.type.label}</span>
          <input
            id={FIELD_IDS.type}
            name="type"
            type="text"
            value={values.type}
            onChange={handleChange}
            placeholder={search.fields.type.placeholder}
            className={styles.input}
          />
        </label>

        <label className={styles.field} htmlFor={FIELD_IDS.budget}>
          <span className={styles.label}>{search.fields.budget.label}</span>
          <input
            id={FIELD_IDS.budget}
            name="budget"
            type="text"
            value={values.budget}
            onChange={handleChange}
            placeholder={search.fields.budget.placeholder}
            className={styles.input}
          />
        </label>

        <button type="submit" className={styles.submit}>
          {search.submit}
        </button>
      </div>
    </form>
  );
}
