import Link from "next/link";

import type { Locale } from "@/shared/constants/locale";
import type { LandingTexts } from "@/i18n/es/landing";

import styles from "./landing-header.module.css";

export type LandingHeaderProps = {
  brand: LandingTexts["brand"];
  navigation: LandingTexts["navigation"];
  activeLocale: Locale;
  showLogin?: boolean;
};

export function LandingHeader({
  brand,
  navigation,
  activeLocale,
  showLogin = true,
}: LandingHeaderProps) {
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
            <a
              href="/api/locale?lang=es&returnTo=/"
              className={`${styles.localeButton} ${
                activeLocale === "es"
                  ? styles.localeActive
                  : styles.localeInactive
              }`}
            >
              {navigation.locales.es}
            </a>
            <span className={styles.localeDivider} aria-hidden="true">
              |
            </span>
            <a
              href="/api/locale?lang=en&returnTo=/"
              className={`${styles.localeButton} ${
                activeLocale === "en"
                  ? styles.localeActive
                  : styles.localeInactive
              }`}
            >
              {navigation.locales.en}
            </a>
          </div>

          {showLogin ? (
            <Link href={navigation.loginHref} className={styles.loginButton}>
              {navigation.loginLabel}
            </Link>
          ) : (
            <form action={navigation.logoutHref} method="POST">
              <button type="submit" className={styles.loginButton}>
                {navigation.logoutLabel}
              </button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
}
