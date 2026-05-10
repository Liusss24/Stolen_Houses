import Link from "next/link";

import styles from "./placeholder-panel.module.css";

export type PlaceholderPanelAction = {
  href: string;
  label: string;
};

export type PlaceholderPanelProps = {
  message: string;
  ariaLabel: string;
  action: PlaceholderPanelAction;
};

export function PlaceholderPanel({
  message,
  ariaLabel,
  action,
}: PlaceholderPanelProps) {
  return (
    <section className={styles.panel} aria-label={ariaLabel}>
      <p className={styles.panelText}>{message}</p>

      <div className={styles.panelActions}>
        <Link href={action.href} className={styles.primaryButton}>
          {action.label}
          <span aria-hidden="true">{">"}</span>
        </Link>
      </div>
    </section>
  );
}
