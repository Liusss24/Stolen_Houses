"use client";

import type { ChangeEvent } from "react";

import {
  OPPORTUNITY_STATUS_ORDER,
  type Opportunity,
  type OpportunityStatus,
} from "@/entities/opportunity/model/opportunity.types";
import type { ManageOpportunitiesTexts } from "@/i18n/es/manage-opportunities";
import { DEFAULT_LOCALE } from "@/shared/constants/intl.constants";
import { formatCurrency } from "@/shared/lib/format-currency";

import styles from "./opportunity-row.module.css";

export type OpportunityRowProps = {
  opportunity: Opportunity;
  texts: ManageOpportunitiesTexts;
  isPending: boolean;
  onStatusChange: (id: string, status: OpportunityStatus) => void;
  onDelete: (id: string) => void;
};

const STATUS_CLASS_MAP: Record<OpportunityStatus, string> = {
  new: "statusNew",
  contacted: "statusContacted",
  visit_scheduled: "statusVisitScheduled",
  negotiating: "statusNegotiating",
  closed_won: "statusClosedWon",
  closed_lost: "statusClosedLost",
};

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }

  return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function OpportunityRow({
  opportunity,
  texts,
  isPending,
  onStatusChange,
  onDelete,
}: OpportunityRowProps) {
  const statusModifier = STATUS_CLASS_MAP[opportunity.status];
  const statusClassName = `${styles.statusControl} ${
    styles[statusModifier as keyof typeof styles] ?? ""
  }`;

  const handleStatusSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(opportunity.id, event.target.value as OpportunityStatus);
  };

  return (
    <article
      className={styles.row}
      data-pending={isPending ? "true" : "false"}
    >
      <header className={styles.headerRow}>
        <div className={styles.propertyBlock}>
          <span className={styles.propertyEyebrow}>
            {texts.card.propertyLabel}
          </span>
          <h3 className={styles.propertyTitle}>{opportunity.propertyTitle}</h3>
          <span className={styles.propertyLocation}>
            {opportunity.propertyLocation}
          </span>
        </div>

        <div className={styles.statusBlock}>
          <label
            className={styles.statusLabel}
            htmlFor={`opportunity-status-${opportunity.id}`}
          >
            {isPending ? texts.card.statusUpdating : texts.card.statusLabel}
          </label>
          <select
            id={`opportunity-status-${opportunity.id}`}
            value={opportunity.status}
            onChange={handleStatusSelect}
            disabled={isPending}
            className={statusClassName}
          >
            {OPPORTUNITY_STATUS_ORDER.map((status) => (
              <option key={status} value={status}>
                {texts.status[status]}
              </option>
            ))}
          </select>
        </div>
      </header>

      <dl className={styles.detailsGrid}>
        <div className={styles.detail}>
          <dt className={styles.detailLabel}>{texts.card.clientLabel}</dt>
          <dd className={styles.detailValue}>{opportunity.clientName}</dd>
        </div>
        <div className={styles.detail}>
          <dt className={styles.detailLabel}>{texts.card.contactLabel}</dt>
          <dd className={styles.detailMuted}>
            {opportunity.clientEmail}
            <br />
            {opportunity.clientPhone}
          </dd>
        </div>
        <div className={styles.detail}>
          <dt className={styles.detailLabel}>
            {texts.card.estimatedValueLabel}
          </dt>
          <dd className={styles.detailValueAccent}>
            {formatCurrency(opportunity.estimatedValue)}
          </dd>
        </div>
        <div className={styles.detail}>
          <dt className={styles.detailLabel}>{texts.card.sourceLabel}</dt>
          <dd className={styles.detailMuted}>
            {texts.source[opportunity.source]}
          </dd>
        </div>
      </dl>

      <div className={styles.notesBlock}>
        <span className={styles.notesLabel}>{texts.card.notesLabel}</span>
        {opportunity.notes ? (
          <p className={styles.notesBody}>{opportunity.notes}</p>
        ) : (
          <p className={`${styles.notesBody} ${styles.notesEmpty}`}>
            {texts.card.noNotes}
          </p>
        )}
      </div>

      <footer className={styles.footerRow}>
        <span>
          {texts.card.createdAtLabel}: {formatDate(opportunity.createdAt)}
          {" · "}
          <span className={styles.reference}>
            {texts.card.referenceLabel}: {opportunity.id}
          </span>
        </span>

        <button
          type="button"
          className={styles.deleteButton}
          onClick={() => onDelete(opportunity.id)}
          disabled={isPending}
        >
          {texts.card.deleteLabel}
        </button>
      </footer>
    </article>
  );
}
