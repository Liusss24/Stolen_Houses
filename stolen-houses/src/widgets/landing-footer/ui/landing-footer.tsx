import type { LandingTexts } from "@/i18n/es/landing";

import styles from "./landing-footer.module.css";

export type LandingFooterProps = {
  brand: LandingTexts["brand"];
  footer: LandingTexts["footer"];
};

export function LandingFooter({ brand, footer }: LandingFooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.rights}>{footer.rights}</p>
        <p className={styles.brand}>{brand.name}</p>
        <p className={styles.tagline}>{brand.tagline}</p>
      </div>
    </footer>
  );
}
