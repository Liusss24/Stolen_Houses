import { SAMPLE_MODEL_URL } from "@/features/view-360/model/view-360.constants";
import type { LandingTexts } from "@/i18n/es/landing";
import { Property3dViewer } from "@/widgets/property-3d-viewer";

import styles from "./landing-hero-viewer.module.css";

export type LandingHeroViewerProps = {
  viewer: LandingTexts["hero"]["viewer"];
};

export function LandingHeroViewer({ viewer }: LandingHeroViewerProps) {
  return (
    <div className={styles.viewerFrame}>
      <Property3dViewer
        src={SAMPLE_MODEL_URL}
        alt={viewer.propertyName}
        posterImage={viewer.image}
        isSample
      />
    </div>
  );
}
