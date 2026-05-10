"use client";

import { useLandingContact } from "@/features/landing/hooks/use-landing-contact";
import type { LandingTexts } from "@/i18n/es/landing";

import styles from "./landing-contact-form.module.css";

export type LandingContactFormProps = {
  form: LandingTexts["contact"]["form"];
};

const FIELD_IDS = {
  name: "landing-contact-name",
  email: "landing-contact-email",
  phone: "landing-contact-phone",
  message: "landing-contact-message",
} as const;

export function LandingContactForm({ form }: LandingContactFormProps) {
  const { values, isSubmitted, handleChange, handleSubmit } =
    useLandingContact();

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor={FIELD_IDS.name}>
          {form.fields.name.label}
        </label>
        <input
          id={FIELD_IDS.name}
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          placeholder={form.fields.name.placeholder}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={FIELD_IDS.email}>
            {form.fields.email.label}
          </label>
          <input
            id={FIELD_IDS.email}
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            placeholder={form.fields.email.placeholder}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={FIELD_IDS.phone}>
            {form.fields.phone.label}
          </label>
          <input
            id={FIELD_IDS.phone}
            name="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            placeholder={form.fields.phone.placeholder}
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={FIELD_IDS.message}>
          {form.fields.message.label}
        </label>
        <textarea
          id={FIELD_IDS.message}
          name="message"
          value={values.message}
          onChange={handleChange}
          placeholder={form.fields.message.placeholder}
          className={`${styles.input} ${styles.textarea}`}
          required
        />
      </div>

      <div className={styles.submitRow}>
        {isSubmitted ? (
          <span className={styles.success} role="status">
            {form.success}
          </span>
        ) : (
          <span aria-hidden="true" />
        )}
        <button type="submit" className={styles.submit}>
          {form.submit}
          <span aria-hidden="true">{">"}</span>
        </button>
      </div>
    </form>
  );
}
