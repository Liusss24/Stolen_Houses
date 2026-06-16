"use client";

import type { ChangeEvent, FormEvent } from "react";

import {
  OPPORTUNITY_STATUS_ORDER,
  type OpportunityStatus,
} from "@/entities/opportunity/model/opportunity.types";
import type { Property } from "@/entities/property/model/property.types";
import type { CreateOpportunityFormState } from "@/features/manage-opportunity-status/model/manage-opportunities.types";
import type { ManageOpportunitiesTexts } from "@/i18n/es/manage-opportunities";
import { formatCurrency } from "@/shared/lib/format-currency";

import styles from "./opportunity-create-form.module.css";

export type OpportunityCreateFormProps = {
  texts: ManageOpportunitiesTexts;
  form: CreateOpportunityFormState;
  properties: Property[];
  isLoadingProperties: boolean;
  isCreating: boolean;
  onChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
};

const FIELD_IDS = {
  propertyId: "opportunity-property",
  clientName: "opportunity-client-name",
  clientEmail: "opportunity-client-email",
  clientPhone: "opportunity-client-phone",
  status: "opportunity-status",
  estimatedValue: "opportunity-estimated-value",
  notes: "opportunity-notes",
} as const;

export function OpportunityCreateForm({
  texts,
  form,
  properties,
  isLoadingProperties,
  isCreating,
  onChange,
  onSubmit,
  onReset,
}: OpportunityCreateFormProps) {
  const hasProperties = properties.length > 0;

  return (
    <section className={styles.panel} aria-label={texts.createForm.sectionTitle}>
      <header className={styles.header}>
        <h2 className={styles.sectionTitle}>{texts.createForm.sectionTitle}</h2>
        <p className={styles.description}>{texts.createForm.description}</p>
      </header>

      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={styles.fieldsGrid}>
          <div className={`${styles.field} ${styles.fieldFull}`}>
            <label className={styles.label} htmlFor={FIELD_IDS.propertyId}>
              {texts.createForm.fields.propertyId.label}
            </label>
            {isLoadingProperties ? (
              <p className={styles.empty}>
                {texts.createForm.propertiesLoading}
              </p>
            ) : hasProperties ? (
              <select
                id={FIELD_IDS.propertyId}
                name="propertyId"
                value={form.propertyId}
                onChange={onChange}
                className={styles.select}
                required
              >
                <option value="" disabled>
                  {texts.createForm.fields.propertyId.placeholder}
                </option>
                {properties.map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.title} — {property.location} ·{" "}
                    {formatCurrency(property.price)}
                  </option>
                ))}
              </select>
            ) : (
              <p className={styles.empty}>
                {texts.createForm.feedback.noProperties}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor={FIELD_IDS.clientName}>
              {texts.createForm.fields.clientName.label}
            </label>
            <input
              id={FIELD_IDS.clientName}
              name="clientName"
              type="text"
              value={form.clientName}
              onChange={onChange}
              placeholder={texts.createForm.fields.clientName.placeholder}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor={FIELD_IDS.clientEmail}>
              {texts.createForm.fields.clientEmail.label}
            </label>
            <input
              id={FIELD_IDS.clientEmail}
              name="clientEmail"
              type="email"
              value={form.clientEmail}
              onChange={onChange}
              placeholder={texts.createForm.fields.clientEmail.placeholder}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor={FIELD_IDS.clientPhone}>
              {texts.createForm.fields.clientPhone.label}
            </label>
            <input
              id={FIELD_IDS.clientPhone}
              name="clientPhone"
              type="tel"
              value={form.clientPhone}
              onChange={onChange}
              placeholder={texts.createForm.fields.clientPhone.placeholder}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor={FIELD_IDS.status}>
              {texts.createForm.fields.status.label}
            </label>
            <select
              id={FIELD_IDS.status}
              name="status"
              value={form.status}
              onChange={onChange}
              className={styles.select}
            >
              {OPPORTUNITY_STATUS_ORDER.map((status) => (
                <option key={status} value={status}>
                  {texts.status[status as OpportunityStatus]}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor={FIELD_IDS.estimatedValue}>
              {texts.createForm.fields.estimatedValue.label}
            </label>
            <input
              id={FIELD_IDS.estimatedValue}
              name="estimatedValue"
              type="number"
              min="0"
              step="1000"
              value={form.estimatedValue}
              onChange={onChange}
              placeholder={texts.createForm.fields.estimatedValue.placeholder}
              className={styles.input}
            />
          </div>

          <div className={`${styles.field} ${styles.fieldFull}`}>
            <label className={styles.label} htmlFor={FIELD_IDS.notes}>
              {texts.createForm.fields.notes.label}
            </label>
            <textarea
              id={FIELD_IDS.notes}
              name="notes"
              value={form.notes}
              onChange={onChange}
              placeholder={texts.createForm.fields.notes.placeholder}
              className={styles.textarea}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={onReset}
            className={styles.resetButton}
            disabled={isCreating}
          >
            {texts.createForm.clear}
          </button>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isCreating || !hasProperties}
          >
            {isCreating
              ? texts.createForm.submitting
              : texts.createForm.submit}
            <span aria-hidden="true">{">"}</span>
          </button>
        </div>
      </form>
    </section>
  );
}
