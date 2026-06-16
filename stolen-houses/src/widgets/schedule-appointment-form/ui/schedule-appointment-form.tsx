"use client";

import Link from "next/link";

import type { Property } from "@/entities/property/model/property.types";
import { useScheduleAppointment } from "@/features/schedule-appointment/hooks/use-schedule-appointment";
import {
  SCHEDULE_APPOINTMENT_TEXTS,
  type ScheduleAppointmentTexts,
} from "@/i18n/es/schedule-appointment";
import { DEFAULT_LOCALE } from "@/shared/constants/intl.constants";

import styles from "./schedule-appointment-form.module.css";

export type ScheduleAppointmentFormProps = {
  property: Property;
  catalogHref: string;
  texts?: ScheduleAppointmentTexts;
};

const FIELD_IDS = {
  name: "appointment-name",
  email: "appointment-email",
  phone: "appointment-phone",
  scheduledFor: "appointment-scheduled-for",
  notes: "appointment-notes",
} as const;

function formatDateTime(isoDate: string): string {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }

  return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function ScheduleAppointmentForm({
  property,
  catalogHref,
  texts = SCHEDULE_APPOINTMENT_TEXTS,
}: ScheduleAppointmentFormProps) {
  const propertyHref = `${catalogHref}/${property.id}`;

  const {
    form,
    isSubmitting,
    submittedAppointment,
    feedback,
    handleChange,
    handleSubmit,
  } = useScheduleAppointment(property, texts);

  if (submittedAppointment) {
    return (
      <section className={styles.successPanel} aria-live="polite">
        <span className={styles.successEyebrow}>{texts.success.eyebrow}</span>
        <h2 className={styles.successTitle}>{texts.success.title}</h2>
        <p className={styles.successDescription}>{texts.success.description}</p>

        <h3 className={styles.summaryTitle}>{texts.success.summaryTitle}</h3>
        <dl className={styles.summaryList}>
          <div className={styles.summaryItem}>
            <dt className={styles.summaryLabel}>
              {texts.success.summaryClient}
            </dt>
            <dd className={styles.summaryValue}>
              {submittedAppointment.clientName}
            </dd>
          </div>
          <div className={styles.summaryItem}>
            <dt className={styles.summaryLabel}>
              {texts.success.summaryEmail}
            </dt>
            <dd className={styles.summaryValue}>
              {submittedAppointment.clientEmail}
            </dd>
          </div>
          <div className={styles.summaryItem}>
            <dt className={styles.summaryLabel}>
              {texts.success.summaryScheduledFor}
            </dt>
            <dd className={styles.summaryValue}>
              {formatDateTime(submittedAppointment.scheduledFor)}
            </dd>
          </div>
        </dl>

        <div className={styles.successActions}>
          <Link href={propertyHref} className={styles.successPrimary}>
            <span aria-hidden="true">{"<"}</span>
            {texts.success.backToProperty}
          </Link>
          <Link href={catalogHref} className={styles.successSecondary}>
            {texts.success.backToCatalog}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.formPanel} onSubmit={handleSubmit} noValidate>
        <h2 className={styles.sectionTitle}>{texts.form.sectionTitle}</h2>

        <div className={styles.fieldGrid}>
          <div className={`${styles.field} ${styles.fieldFull}`}>
            <label className={styles.label} htmlFor={FIELD_IDS.name}>
              {texts.form.fields.name.label}
            </label>
            <input
              id={FIELD_IDS.name}
              name="clientName"
              type="text"
              value={form.clientName}
              onChange={handleChange}
              placeholder={texts.form.fields.name.placeholder}
              className={styles.input}
              autoComplete="name"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor={FIELD_IDS.email}>
              {texts.form.fields.email.label}
            </label>
            <input
              id={FIELD_IDS.email}
              name="clientEmail"
              type="email"
              value={form.clientEmail}
              onChange={handleChange}
              placeholder={texts.form.fields.email.placeholder}
              className={styles.input}
              autoComplete="email"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor={FIELD_IDS.phone}>
              {texts.form.fields.phone.label}
            </label>
            <input
              id={FIELD_IDS.phone}
              name="clientPhone"
              type="tel"
              value={form.clientPhone}
              onChange={handleChange}
              placeholder={texts.form.fields.phone.placeholder}
              className={styles.input}
              autoComplete="tel"
              required
            />
          </div>

          <div className={`${styles.field} ${styles.fieldFull}`}>
            <label className={styles.label} htmlFor={FIELD_IDS.scheduledFor}>
              {texts.form.fields.scheduledFor.label}
            </label>
            <input
              id={FIELD_IDS.scheduledFor}
              name="scheduledFor"
              type="datetime-local"
              value={form.scheduledFor}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={`${styles.field} ${styles.fieldFull}`}>
            <label className={styles.label} htmlFor={FIELD_IDS.notes}>
              {texts.form.fields.notes.label}
            </label>
            <textarea
              id={FIELD_IDS.notes}
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder={texts.form.fields.notes.placeholder}
              className={styles.textarea}
            />
          </div>
        </div>

        {feedback ? (
          <p role="alert" className={styles.feedback}>
            {feedback.text}
          </p>
        ) : null}

        <div className={styles.actions}>
          <Link href={propertyHref} className={styles.backLink}>
            <span aria-hidden="true">{"<"}</span>
            {texts.form.backLink}
          </Link>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? texts.form.submitting : texts.form.submit}
            <span aria-hidden="true">{">"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
