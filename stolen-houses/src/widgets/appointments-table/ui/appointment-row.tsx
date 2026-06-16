"use client";

import type { ChangeEvent } from "react";

import {
  APPOINTMENT_STATUS_ORDER,
  type Appointment,
  type AppointmentStatus,
} from "@/entities/appointment/model/appointment.types";
import type { ManageAppointmentsTexts } from "@/i18n/es/manage-appointments";
import { DEFAULT_LOCALE } from "@/shared/constants/intl.constants";

import styles from "./appointment-row.module.css";

export type AppointmentRowProps = {
  appointment: Appointment;
  texts: ManageAppointmentsTexts;
  isPending: boolean;
  isConverted: boolean;
  onStatusChange: (id: string, status: AppointmentStatus) => void;
  onDelete: (id: string) => void;
  onConvert: (appointment: Appointment) => void;
};

const STATUS_CLASS_MAP: Record<AppointmentStatus, string> = {
  pending: "statusPending",
  confirmed: "statusConfirmed",
  completed: "statusCompleted",
  cancelled: "statusCancelled",
};

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

export function AppointmentRow({
  appointment,
  texts,
  isPending,
  isConverted,
  onStatusChange,
  onDelete,
  onConvert,
}: AppointmentRowProps) {
  const statusModifier = STATUS_CLASS_MAP[appointment.status];
  const statusClassName = `${styles.statusControl} ${
    styles[statusModifier as keyof typeof styles] ?? ""
  }`;

  const handleStatusSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(appointment.id, event.target.value as AppointmentStatus);
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
          <h3 className={styles.propertyTitle}>{appointment.propertyTitle}</h3>
          <span className={styles.propertyLocation}>
            {appointment.propertyLocation}
          </span>
        </div>

        <div className={styles.statusBlock}>
          <label
            className={styles.statusLabel}
            htmlFor={`status-${appointment.id}`}
          >
            {isPending ? texts.card.statusUpdating : texts.card.statusLabel}
          </label>
          <select
            id={`status-${appointment.id}`}
            value={appointment.status}
            onChange={handleStatusSelect}
            disabled={isPending}
            className={statusClassName}
          >
            {APPOINTMENT_STATUS_ORDER.map((status) => (
              <option key={status} value={status}>
                {texts.status[status]}
              </option>
            ))}
          </select>
        </div>
      </header>

      <dl className={styles.detailsGrid}>
        <div className={styles.detail}>
          <dt className={styles.detailLabel}>
            {texts.card.scheduledForLabel}
          </dt>
          <dd className={styles.detailValue}>
            {formatDateTime(appointment.scheduledFor)}
          </dd>
        </div>
        <div className={styles.detail}>
          <dt className={styles.detailLabel}>{texts.card.clientLabel}</dt>
          <dd className={styles.detailValue}>{appointment.clientName}</dd>
        </div>
        <div className={styles.detail}>
          <dt className={styles.detailLabel}>{texts.card.contactLabel}</dt>
          <dd className={styles.detailMuted}>
            {appointment.clientEmail}
            <br />
            {appointment.clientPhone}
          </dd>
        </div>
      </dl>

      <div className={styles.notesBlock}>
        <span className={styles.notesLabel}>{texts.card.notesLabel}</span>
        {appointment.notes ? (
          <p className={styles.notesBody}>{appointment.notes}</p>
        ) : (
          <p className={`${styles.notesBody} ${styles.notesEmpty}`}>
            {texts.card.noNotes}
          </p>
        )}
      </div>

      <footer className={styles.footerRow}>
        <span>
          {texts.card.createdAtLabel}: {formatDate(appointment.createdAt)}
          {" · "}
          <span className={styles.reference}>
            {texts.card.referenceLabel}: {appointment.id}
          </span>
        </span>

        <div className={styles.footerActions}>
          <button
            type="button"
            className={styles.convertButton}
            onClick={() => onConvert(appointment)}
            disabled={isPending || isConverted}
          >
            {isConverted
              ? texts.card.convertedLabel
              : texts.card.convertLabel}
          </button>

          <button
            type="button"
            className={styles.deleteButton}
            onClick={() => onDelete(appointment.id)}
            disabled={isPending}
          >
            {texts.card.deleteLabel}
          </button>
        </div>
      </footer>
    </article>
  );
}
