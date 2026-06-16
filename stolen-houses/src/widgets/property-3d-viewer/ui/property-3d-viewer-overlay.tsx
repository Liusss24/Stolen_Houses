import type { View360Texts } from "@/i18n/es/view-360";

import styles from "./property-3d-viewer-overlay.module.css";

export type Property3dViewerOverlayProps = {
  texts: View360Texts;
  isSample: boolean;
};

export function Property3dViewerOverlay({
  texts,
  isSample,
}: Property3dViewerOverlayProps) {
  return (
    <div className={styles.overlay} aria-hidden="true">
      <span className={`${styles.cornerBracket} ${styles.cornerTL}`} />
      <span className={`${styles.cornerBracket} ${styles.cornerTR}`} />
      <span className={`${styles.cornerBracket} ${styles.cornerBL}`} />
      <span className={`${styles.cornerBracket} ${styles.cornerBR}`} />

      <span className={styles.label}>
        <span className={styles.bullet}>{"◆"}</span>
        {texts.label}
      </span>

      {isSample ? (
        <span className={styles.sampleBadge}>{texts.sampleBadge}</span>
      ) : null}

      <span className={styles.hint}>
        <span aria-hidden="true">{"<"}</span>
        {texts.hint}
        <span aria-hidden="true">{">"}</span>
      </span>
    </div>
  );
}
