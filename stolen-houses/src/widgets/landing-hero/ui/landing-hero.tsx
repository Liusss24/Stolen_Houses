import Link from "next/link";

import type { LandingTexts } from "@/i18n/es/landing";

import { LandingHeroSearch } from "./landing-hero-search";
import { LandingHeroViewer } from "./landing-hero-viewer";
import styles from "./landing-hero.module.css";

export type LandingHeroProps = {
  hero: LandingTexts["hero"];
};

export function LandingHero({ hero }: LandingHeroProps) {
  return (
    <section className={styles.section} id="visor">
      <div className={styles.container}>
        <div className={styles.copy}>
          <span className={styles.kicker}>{hero.kicker}</span>

          <h1 className={styles.title}>
            {hero.titleLeading}
            <span className={styles.titleItalic}>{hero.titleTrailing}</span>
          </h1>

          <div className={styles.dividerRow}>
            <span className={styles.divider} aria-hidden="true" />
            <span className={styles.dividerLabel}>{hero.edition}</span>
            <span className={styles.divider} aria-hidden="true" />
          </div>

          <p className={styles.description}>{hero.description}</p>

          <div className={styles.ctaRow}>
            <Link href={hero.ctaPrimary.href} className={styles.ctaPrimary}>
              {hero.ctaPrimary.label}
              <span aria-hidden="true">{">"}</span>
            </Link>
            <Link href={hero.ctaSecondary.href} className={styles.ctaSecondary}>
              <span aria-hidden="true">{">"}</span>
              {hero.ctaSecondary.label}
            </Link>
          </div>

          <ul className={styles.pillRow}>
            {hero.pills.map((pill) => (
              <li key={pill} className={styles.pill}>
                {pill}
              </li>
            ))}
          </ul>

          <LandingHeroSearch search={hero.search} />
        </div>

        <div className={styles.viewerColumn}>
          <LandingHeroViewer viewer={hero.viewer} />

          <div className={styles.statsRow}>
            {hero.stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <span className={styles.statLabel}>{stat.label}</span>
                <span className={styles.statValue}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
