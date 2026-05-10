import Image from "next/image";

import type { LandingTexts } from "@/i18n/es/landing";

import styles from "./landing-hero-viewer.module.css";

export type LandingHeroViewerProps = {
  viewer: LandingTexts["hero"]["viewer"];
};

export function LandingHeroViewer({ viewer }: LandingHeroViewerProps) {
  return (
    <figure className={styles.viewer} aria-label={viewer.label}>
      <Image
        src={viewer.image}
        alt={viewer.propertyName}
        fill
        priority
        sizes="(min-width: 768px) 45vw, 100vw"
        className={styles.image}
      />
      <div className={styles.scrim} aria-hidden="true" />

      <figcaption className={styles.label}>{viewer.label}</figcaption>

      <div className={styles.coreRing} aria-hidden="true">
        <span className={styles.coreLabel}>{viewer.propertyName}</span>
      </div>

      <div className={styles.footer}>
        <span className={styles.controlChip} aria-hidden="true">
          {"<"}
        </span>
        <span>{viewer.hint}</span>
        <span className={styles.controlChip} aria-hidden="true">
          {">"}
        </span>
      </div>
    </figure>
  );
}
