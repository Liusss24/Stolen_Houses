import type { ChangeEvent, FormEvent } from "react";
import type { PropertyFormState } from "@/features/manage-properties/model/property-crud.types";
import styles from "./property-crud-form.module.css";
import { PROPERTY_CRUD_TEXTS } from "@/i18n/es/property-crud";

export interface PropertyCrudFormProps {
  form: PropertyFormState;
  isEditMode: boolean;
  isSaving: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
}

export function PropertyCrudForm({
  form,
  isEditMode,
  isSaving,
  onChange,
  onSubmit,
  onReset,
}: PropertyCrudFormProps) {
  const texts = PROPERTY_CRUD_TEXTS;

  return (
    <section className={styles.panel}>
      <h2 className={styles.sectionTitle}>
        {isEditMode ? texts.form.editTitle : texts.form.createTitle}
      </h2>

      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="title">
            {texts.form.labels.title}
          </label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={onChange}
            className={styles.input}
            placeholder={texts.form.placeholders.title}
            required
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="price">
            {texts.form.labels.price}
          </label>
          <input
            id="price"
            name="price"
            type="number"
            value={form.price}
            onChange={onChange}
            className={styles.input}
            placeholder={texts.form.placeholders.price}
            required
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="location">
            {texts.form.labels.location}
          </label>
          <input
            id="location"
            name="location"
            value={form.location}
            onChange={onChange}
            className={styles.input}
            placeholder={texts.form.placeholders.location}
            required
          />
        </div>

        <div className={styles.fieldsGrid}>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="bedrooms">
              {texts.form.labels.bedrooms}
            </label>
            <input
              id="bedrooms"
              name="bedrooms"
              type="number"
              value={form.bedrooms}
              onChange={onChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="bathrooms">
              {texts.form.labels.bathrooms}
            </label>
            <input
              id="bathrooms"
              name="bathrooms"
              type="number"
              value={form.bathrooms}
              onChange={onChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="area">
              {texts.form.labels.area}
            </label>
            <input
              id="area"
              name="area"
              type="number"
              value={form.area}
              onChange={onChange}
              className={styles.input}
              required
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="image">
            {texts.form.labels.image}
          </label>
          <input
            id="image"
            name="image"
            value={form.image}
            onChange={onChange}
            className={styles.input}
            placeholder={texts.form.placeholders.image}
            required
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="panorama">
            {texts.form.labels.panorama}
          </label>
          <input
            id="panorama"
            name="panorama"
            value={form.panorama}
            onChange={onChange}
            className={styles.input}
            placeholder={texts.form.placeholders.panorama}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="description">
            {texts.form.labels.description}
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={onChange}
            className={styles.textArea}
            placeholder={texts.form.placeholders.description}
            required
          />
        </div>

        <label className={styles.checkboxRow} htmlFor="featured">
          <input
            id="featured"
            name="featured"
            type="checkbox"
            checked={form.featured}
            onChange={onChange}
            className={styles.checkbox}
          />
          {texts.form.featured}
        </label>

        <div className={styles.actions}>
          <button
            type="submit"
            disabled={isSaving}
            className={styles.primaryButton}
          >
            {isSaving
              ? texts.form.buttons.saving
              : isEditMode
                ? texts.form.buttons.update
                : texts.form.buttons.create}
          </button>

          <button
            type="button"
            onClick={onReset}
            className={styles.secondaryButton}
          >
            {texts.form.buttons.clear}
          </button>
        </div>
      </form>
    </section>
  );
}