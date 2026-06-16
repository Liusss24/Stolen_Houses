"use client";

import type { ChangeEvent } from "react";

import type { PropertySearchFilters } from "@/features/property-search/model/property-search.types";
import type { PropertySearchTexts } from "@/i18n/es/property-search";

import styles from "./filter-panel.module.css";

type FilterPanelProps = {
  texts: PropertySearchTexts;
  filters: PropertySearchFilters;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
};

export function FilterPanel({
  texts,
  filters,
  onChange,
  onReset,
}: FilterPanelProps) {
  return (
    <aside className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.title}>{texts.filters.title}</h2>
        <p className={styles.description}>{texts.filters.description}</p>
      </div>

      <div className={styles.form}>
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="query">
            {texts.filters.fields.query}
          </label>
          <input
            id="query"
            name="query"
            type="search"
            value={filters.query}
            onChange={onChange}
            className={styles.input}
            placeholder={texts.filters.placeholders.query}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="location">
            {texts.filters.fields.location}
          </label>
          <input
            id="location"
            name="location"
            type="text"
            value={filters.location}
            onChange={onChange}
            className={styles.input}
            placeholder={texts.filters.placeholders.location}
          />
        </div>

        <div className={styles.grid}>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="minPrice">
              {texts.filters.fields.minPrice}
            </label>
            <input
              id="minPrice"
              name="minPrice"
              type="number"
              min="0"
              step="1000"
              value={filters.minPrice}
              onChange={onChange}
              className={styles.input}
              placeholder={texts.filters.placeholders.minPrice}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="maxPrice">
              {texts.filters.fields.maxPrice}
            </label>
            <input
              id="maxPrice"
              name="maxPrice"
              type="number"
              min="0"
              step="1000"
              value={filters.maxPrice}
              onChange={onChange}
              className={styles.input}
              placeholder={texts.filters.placeholders.maxPrice}
            />
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="minBedrooms">
              {texts.filters.fields.minBedrooms}
            </label>
            <input
              id="minBedrooms"
              name="minBedrooms"
              type="number"
              min="0"
              step="1"
              value={filters.minBedrooms}
              onChange={onChange}
              className={styles.input}
              placeholder={texts.filters.placeholders.minBedrooms}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="minBathrooms">
              {texts.filters.fields.minBathrooms}
            </label>
            <input
              id="minBathrooms"
              name="minBathrooms"
              type="number"
              min="0"
              step="1"
              value={filters.minBathrooms}
              onChange={onChange}
              className={styles.input}
              placeholder={texts.filters.placeholders.minBathrooms}
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="minArea">
            {texts.filters.fields.minArea}
          </label>
          <div className={styles.inlineField}>
            <input
              id="minArea"
              name="minArea"
              type="number"
              min="0"
              step="1"
              value={filters.minArea}
              onChange={onChange}
              className={styles.input}
              placeholder={texts.filters.placeholders.minArea}
            />
            <span className={styles.helperText}>
              {texts.filters.helpers.areaUnit}
            </span>
          </div>
        </div>

        <label className={styles.checkboxRow} htmlFor="featuredOnly">
          <input
            id="featuredOnly"
            name="featuredOnly"
            type="checkbox"
            checked={filters.featuredOnly}
            onChange={onChange}
            className={styles.checkbox}
          />
          {texts.filters.fields.featuredOnly}
        </label>

        <label className={styles.checkboxRow} htmlFor="model3dOnly">
          <input
            id="model3dOnly"
            name="model3dOnly"
            type="checkbox"
            checked={filters.model3dOnly}
            onChange={onChange}
            className={styles.checkbox}
          />
          {texts.filters.fields.model3dOnly}
        </label>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={onReset}
            className={styles.resetButton}
          >
            {texts.filters.buttons.reset}
          </button>
        </div>
      </div>
    </aside>
  );
}