import type { Metadata } from "next";

import { MANAGE_APPOINTMENTS_TEXTS } from "@/i18n/es/manage-appointments";
import { AdminTopBar } from "@/shared/ui/admin-top-bar/admin-top-bar";
import { AppointmentsTable } from "@/widgets/appointments-table";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: MANAGE_APPOINTMENTS_TEXTS.header.title,
  description: MANAGE_APPOINTMENTS_TEXTS.header.description,
};

export default function AdminAppointmentsPage() {
  const texts = MANAGE_APPOINTMENTS_TEXTS;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <AdminTopBar backHref="/dashboard" />
        <header className={styles.header}>
          <div className={styles.dividerRow}>
            <span className={styles.divider} aria-hidden="true" />
            <span className={styles.badge}>{texts.header.badge}</span>
            <span className={styles.divider} aria-hidden="true" />
          </div>
          <h1 className={styles.title}>{texts.header.title}</h1>
          <p className={styles.description}>{texts.header.description}</p>
        </header>

        <AppointmentsTable />
      </div>
    </main>
  );
}
