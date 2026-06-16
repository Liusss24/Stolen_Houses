"use client";

import {
  APPOINTMENT_STATUS_ORDER,
  type AppointmentStatus,
} from "@/entities/appointment/model/appointment.types";
import { useManageAppointments } from "@/features/manage-appointments/hooks/use-manage-appointments";
import type { AppointmentStatusFilter } from "@/features/manage-appointments/model/manage-appointments.types";
import {
  MANAGE_APPOINTMENTS_TEXTS,
  type ManageAppointmentsTexts,
} from "@/i18n/es/manage-appointments";

import { AppointmentRow } from "./appointment-row";
import styles from "./appointments-table.module.css";

export type AppointmentsTableProps = {
  texts?: ManageAppointmentsTexts;
};

const FILTER_OPTIONS: ReadonlyArray<AppointmentStatusFilter> = [
  "all",
  ...APPOINTMENT_STATUS_ORDER,
];

export function AppointmentsTable({
  texts = MANAGE_APPOINTMENTS_TEXTS,
}: AppointmentsTableProps) {
  const {
    appointments,
    filteredAppointments,
    statusFilter,
    setStatusFilter,
    isLoading,
    pendingActionId,
    convertedAppointmentIds,
    feedback,
    handleStatusChange,
    handleDelete,
    handleConvertToOpportunity,
    countByStatus,
  } = useManageAppointments(texts);

  const totalCount = appointments.length;

  return (
    <section className={styles.panel}>
      <header className={styles.toolbar}>
        <div className={styles.titleBlock}>
          <h2 className={styles.title}>{texts.list.title}</h2>
          <span className={styles.summary}>
            {texts.list.summary(
              String(filteredAppointments.length),
              String(totalCount),
            )}
          </span>
        </div>

        <fieldset className={styles.filters}>
          <legend className="sr-only">{texts.filters.legend}</legend>
          {FILTER_OPTIONS.map((option) => {
            const isActive = statusFilter === option;
            const label =
              option === "all"
                ? texts.filters.allLabel
                : texts.status[option as AppointmentStatus];

            return (
              <button
                key={option}
                type="button"
                className={`${styles.filterChip} ${
                  isActive ? styles.filterActive : ""
                }`}
                onClick={() => setStatusFilter(option)}
                aria-pressed={isActive}
              >
                {label}
                <span className={styles.filterCount}>
                  {countByStatus[option] ?? 0}
                </span>
              </button>
            );
          })}
        </fieldset>
      </header>

      {feedback ? (
        <p
          role={feedback.type === "error" ? "alert" : "status"}
          className={`${styles.feedback} ${
            feedback.type === "success"
              ? styles.feedbackSuccess
              : styles.feedbackError
          }`}
        >
          {feedback.text}
        </p>
      ) : null}

      {isLoading ? (
        <p role="status" className={styles.status}>
          {texts.list.loading}
        </p>
      ) : totalCount === 0 ? (
        <p role="status" className={styles.status}>
          {texts.list.empty}
        </p>
      ) : filteredAppointments.length === 0 ? (
        <p role="status" className={styles.status}>
          {texts.list.emptyFiltered}
        </p>
      ) : (
        <div className={styles.list}>
          {filteredAppointments.map((appointment) => (
            <AppointmentRow
              key={appointment.id}
              appointment={appointment}
              texts={texts}
              isPending={pendingActionId === appointment.id}
              isConverted={convertedAppointmentIds.has(appointment.id)}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
              onConvert={handleConvertToOpportunity}
            />
          ))}
        </div>
      )}
    </section>
  );
}
