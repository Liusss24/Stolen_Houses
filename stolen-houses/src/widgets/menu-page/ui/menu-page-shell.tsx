import type { ReactNode } from "react";

import styles from "./menu-page-shell.module.css";

export type MenuPageShellAccent = "default" | "accent";

export type MenuPageShellHeader = {
  badge: string;
  title: string;
  description?: string;
  badgeAccent?: MenuPageShellAccent;
};

export type MenuPageShellProps = {
  header: MenuPageShellHeader;
  children: ReactNode;
};

export function MenuPageShell({ header, children }: MenuPageShellProps) {
  const badgeClassName =
    header.badgeAccent === "accent"
      ? `${styles.badge} ${styles.badgeAccent}`
      : styles.badge;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.dividerRow}>
            <span className={styles.divider} aria-hidden="true" />
            <span className={badgeClassName}>{header.badge}</span>
            <span className={styles.divider} aria-hidden="true" />
          </div>

          <h1 className={styles.title}>{header.title}</h1>

          {header.description ? (
            <p className={styles.description}>{header.description}</p>
          ) : null}
        </header>

        {children}
      </div>
    </main>
  );
}
