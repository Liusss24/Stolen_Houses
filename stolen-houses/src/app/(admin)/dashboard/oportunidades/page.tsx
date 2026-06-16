import type { Metadata } from "next";

import { MANAGE_OPPORTUNITIES_TEXTS } from "@/i18n/es/manage-opportunities";
import { AdminTopBar } from "@/shared/ui/admin-top-bar/admin-top-bar";
import { OpportunitiesBoard } from "@/widgets/opportunities-board";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: MANAGE_OPPORTUNITIES_TEXTS.header.title,
  description: MANAGE_OPPORTUNITIES_TEXTS.header.description,
};

export default function AdminOpportunitiesPage() {
  const texts = MANAGE_OPPORTUNITIES_TEXTS;

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

        <OpportunitiesBoard />
      </div>
    </main>
  );
}
