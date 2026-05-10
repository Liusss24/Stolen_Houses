import Link from "next/link";

import styles from "./menu-grid.module.css";

export type MenuGridItem = {
  href: string;
  title: string;
  description: string;
  cta: string;
};

export type MenuGridProps = {
  items: ReadonlyArray<MenuGridItem>;
  ariaLabel: string;
};

const INDEX_PREFIX = "№";

function formatIndex(index: number): string {
  return String(index + 1).padStart(3, "0");
}

export function MenuGrid({ items, ariaLabel }: MenuGridProps) {
  return (
    <section className={styles.grid} aria-label={ariaLabel}>
      {items.map((item, index) => (
        <Link key={item.href} href={item.href} className={styles.card}>
          <span className={styles.indexLine}>
            {INDEX_PREFIX} {formatIndex(index)}
          </span>
          <h2 className={styles.cardTitle}>{item.title}</h2>
          <p className={styles.cardDescription}>{item.description}</p>
          <span className={styles.cardCta}>
            {item.cta}
            <span aria-hidden="true">{">"}</span>
          </span>
        </Link>
      ))}
    </section>
  );
}
