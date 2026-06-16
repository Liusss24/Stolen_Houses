"use client";

import { useEffect, useState } from "react";

import { VIEW_360_CAMERA_DEFAULTS } from "@/features/view-360/model/view-360.constants";
import {
  VIEW_360_TEXTS,
  type View360Texts,
} from "@/i18n/es/view-360";

import { Property3dViewerOverlay } from "./property-3d-viewer-overlay";
import styles from "./property-3d-viewer.module.css";

export type Property3dViewerProps = {
  src: string;
  alt: string;
  posterImage?: string;
  isSample: boolean;
  texts?: View360Texts;
};

/**
 * Wraps Google's `<model-viewer>` web component. The element registers itself
 * with `customElements.define` on import, which requires a browser global, so
 * the import is deferred to a `useEffect` and gated by an `isReady` flag.
 * Until the script finishes loading we show the property photo as a poster +
 * a loading hint, so the user never sees a blank box.
 */
export function Property3dViewer({
  src,
  alt,
  posterImage,
  isSample,
  texts = VIEW_360_TEXTS,
}: Property3dViewerProps) {
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    import("@google/model-viewer")
      .then(() => {
        if (!cancelled) {
          setIsReady(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setHasError(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <figure className={styles.viewer} aria-label={`${texts.altPrefix} ${alt}`}>
      {posterImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={posterImage}
          alt={alt}
          className={styles.posterImage}
          aria-hidden="true"
        />
      ) : null}
      <div className={styles.posterScrim} aria-hidden="true" />

      {hasError ? (
        <div className={styles.errorPanel} role="alert">
          <p className={styles.errorText}>{texts.loadError}</p>
        </div>
      ) : isReady ? (
        <model-viewer
          src={src}
          alt={`${texts.altPrefix} ${alt}`}
          camera-controls
          interaction-prompt="auto"
          tone-mapping="neutral"
          camera-orbit={VIEW_360_CAMERA_DEFAULTS.cameraOrbit}
          field-of-view={VIEW_360_CAMERA_DEFAULTS.fieldOfView}
          exposure={VIEW_360_CAMERA_DEFAULTS.exposure}
          shadow-intensity={VIEW_360_CAMERA_DEFAULTS.shadowIntensity}
          shadow-softness={VIEW_360_CAMERA_DEFAULTS.shadowSoftness}
          auto-rotate-delay={VIEW_360_CAMERA_DEFAULTS.autoRotateDelay}
          reveal="auto"
          loading="lazy"
          className={styles.modelHost}
        />
      ) : (
        <p className={styles.loadingText} role="status">
          {texts.loading}
        </p>
      )}

      <Property3dViewerOverlay texts={texts} isSample={isSample} />
    </figure>
  );
}
