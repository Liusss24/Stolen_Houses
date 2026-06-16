"use client";

import type { ChangeEvent } from "react";

import type {
  PreseleccionForm,
  PreseleccionStep,
} from "@/features/preseleccion/model/preseleccion.types";
import type { PreseleccionTexts } from "@/i18n/es/preseleccion";

import styles from "./preseleccion-step-form.module.css";

export type PreseleccionStepFormProps = {
  step: Exclude<PreseleccionStep, "results">;
  form: PreseleccionForm;
  texts: PreseleccionTexts;
  isFirstStep: boolean;
  isLastInputStep: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBack: () => void;
  onNext: () => void;
};

const FIELD_IDS = {
  location: "preseleccion-location",
  minPrice: "preseleccion-min-price",
  maxPrice: "preseleccion-max-price",
  minBedrooms: "preseleccion-min-bedrooms",
  minBathrooms: "preseleccion-min-bathrooms",
  minArea: "preseleccion-min-area",
  keywords: "preseleccion-keywords",
  featuredOnly: "preseleccion-featured-only",
  model3dOnly: "preseleccion-model3d-only",
} as const;

export function PreseleccionStepForm({
  step,
  form,
  texts,
  isFirstStep,
  isLastInputStep,
  onChange,
  onBack,
  onNext,
}: PreseleccionStepFormProps) {
  const stepTexts = texts.steps[step];

  return (
    <section className={styles.panel} aria-labelledby="preseleccion-step-title">
      <header className={styles.header}>
        <span className={styles.eyebrow}>{stepTexts.eyebrow}</span>
        <h2 id="preseleccion-step-title" className={styles.title}>
          {stepTexts.title}
        </h2>
        <p className={styles.description}>{stepTexts.description}</p>
      </header>

      {step === "location" ? (
        <div className={styles.fields}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor={FIELD_IDS.location}>
              {texts.steps.location.fields.location.label}
            </label>
            <input
              id={FIELD_IDS.location}
              name="location"
              type="text"
              value={form.location}
              onChange={onChange}
              placeholder={texts.steps.location.fields.location.placeholder}
              className={styles.input}
            />
          </div>

          <div className={styles.fieldsGrid}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor={FIELD_IDS.minPrice}>
                {texts.steps.location.fields.minPrice.label}
              </label>
              <input
                id={FIELD_IDS.minPrice}
                name="minPrice"
                type="number"
                min="0"
                step="1000"
                value={form.minPrice}
                onChange={onChange}
                placeholder={texts.steps.location.fields.minPrice.placeholder}
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor={FIELD_IDS.maxPrice}>
                {texts.steps.location.fields.maxPrice.label}
              </label>
              <input
                id={FIELD_IDS.maxPrice}
                name="maxPrice"
                type="number"
                min="0"
                step="1000"
                value={form.maxPrice}
                onChange={onChange}
                placeholder={texts.steps.location.fields.maxPrice.placeholder}
                className={styles.input}
              />
            </div>
          </div>
        </div>
      ) : null}

      {step === "spaces" ? (
        <div className={styles.fieldsGridThree}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor={FIELD_IDS.minBedrooms}>
              {texts.steps.spaces.fields.minBedrooms.label}
            </label>
            <input
              id={FIELD_IDS.minBedrooms}
              name="minBedrooms"
              type="number"
              min="0"
              step="1"
              value={form.minBedrooms}
              onChange={onChange}
              placeholder={texts.steps.spaces.fields.minBedrooms.placeholder}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor={FIELD_IDS.minBathrooms}>
              {texts.steps.spaces.fields.minBathrooms.label}
            </label>
            <input
              id={FIELD_IDS.minBathrooms}
              name="minBathrooms"
              type="number"
              min="0"
              step="1"
              value={form.minBathrooms}
              onChange={onChange}
              placeholder={texts.steps.spaces.fields.minBathrooms.placeholder}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor={FIELD_IDS.minArea}>
              {texts.steps.spaces.fields.minArea.label}
            </label>
            <div className={styles.inlineField}>
              <input
                id={FIELD_IDS.minArea}
                name="minArea"
                type="number"
                min="0"
                step="1"
                value={form.minArea}
                onChange={onChange}
                placeholder={texts.steps.spaces.fields.minArea.placeholder}
                className={styles.input}
              />
              <span className={styles.inlineUnit}>
                {texts.steps.spaces.fields.minArea.unitLabel}
              </span>
            </div>
          </div>
        </div>
      ) : null}

      {step === "style" ? (
        <div className={styles.fields}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor={FIELD_IDS.keywords}>
              {texts.steps.style.fields.keywords.label}
            </label>
            <input
              id={FIELD_IDS.keywords}
              name="keywords"
              type="text"
              value={form.keywords}
              onChange={onChange}
              placeholder={texts.steps.style.fields.keywords.placeholder}
              className={styles.input}
            />
          </div>

          <label className={styles.checkboxRow} htmlFor={FIELD_IDS.featuredOnly}>
            <input
              id={FIELD_IDS.featuredOnly}
              name="featuredOnly"
              type="checkbox"
              checked={form.featuredOnly}
              onChange={onChange}
              className={styles.checkbox}
            />
            <span className={styles.checkboxText}>
              <span className={styles.checkboxLabel}>
                {texts.steps.style.fields.featuredOnly.label}
              </span>
              <span className={styles.checkboxHint}>
                {texts.steps.style.fields.featuredOnly.hint}
              </span>
            </span>
          </label>

          <label className={styles.checkboxRow} htmlFor={FIELD_IDS.model3dOnly}>
            <input
              id={FIELD_IDS.model3dOnly}
              name="model3dOnly"
              type="checkbox"
              checked={form.model3dOnly}
              onChange={onChange}
              className={styles.checkbox}
            />
            <span className={styles.checkboxText}>
              <span className={styles.checkboxLabel}>
                {texts.steps.style.fields.model3dOnly.label}
              </span>
              <span className={styles.checkboxHint}>
                {texts.steps.style.fields.model3dOnly.hint}
              </span>
            </span>
          </label>
        </div>
      ) : null}

      <div className={styles.navigation}>
        <button
          type="button"
          className={styles.previousButton}
          onClick={onBack}
          disabled={isFirstStep}
        >
          <span aria-hidden="true">{"<"}</span>
          {texts.navigation.previousLabel}
        </button>

        <button
          type="button"
          className={styles.nextButton}
          onClick={onNext}
        >
          {isLastInputStep
            ? texts.navigation.finishLabel
            : texts.navigation.nextLabel}
          <span aria-hidden="true">{">"}</span>
        </button>
      </div>
    </section>
  );
}
