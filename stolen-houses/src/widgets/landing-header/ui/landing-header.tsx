import Link from "next/link";

import type { LandingTexts } from "@/i18n/es/landing";

import styles from "./landing-header.module.css";

export type LandingHeaderProps = {
  brand: LandingTexts["brand"];
  navigation: LandingTexts["navigation"];
};

export function LandingHeader({ brand, navigation }: LandingHeaderProps) {
  const activeLocale = navigation.locales.activeLocale;

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <nav className={styles.nav} aria-label="Principal">
          {navigation.items.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.brand}>
          <span className={styles.kicker}>{brand.established}</span>
          <span className={styles.brandName}>{brand.name}</span>
        </div>

        <div className={styles.actions}>
          <div className={styles.localeGroup} role="group" aria-label="Idioma">
            <button
              type="button"
              className={`${styles.localeButton} ${
                activeLocale === "es"
                  ? styles.localeActive
                  : styles.localeInactive
              }`}
            >
              {navigation.locales.es}
            </button>
            <span className={styles.localeDivider} aria-hidden="true">
              |
            </span>
            <button
              type="button"
              className={`${styles.localeButton} ${
                activeLocale === "en"
                  ? styles.localeActive
                  : styles.localeInactive
              }`}
            >
              {navigation.locales.en}
            </button>
          </div>

          <Link href={navigation.loginHref} className={styles.loginButton}>
            {navigation.loginLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}
