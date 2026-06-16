"use client";

import { useState } from "react";

import type { Property } from "@/entities/property/model/property.types";
import { usePropertyModel } from "@/features/view-360/hooks/use-property-model";
import type { PropertyDetailTexts } from "@/i18n/es/property-detail";
import { VIEW_360_TEXTS } from "@/i18n/es/view-360";
import { Property3dViewer } from "@/widgets/property-3d-viewer";

import styles from "./property-detail-gallery.module.css";

export type PropertyDetailGalleryProps = {
  property: Property;
  texts: PropertyDetailTexts["gallery"];
};

type GalleryMode = "photo" | "3d";

export function PropertyDetailGallery({
  property,
  texts,
}: PropertyDetailGalleryProps) {
  const [mode, setMode] = useState<GalleryMode>("photo");

  const hasImage = Boolean(property.image?.trim());
  const model = usePropertyModel(property);
  const viewerTexts = VIEW_360_TEXTS;

  const toggleLabel =
    mode === "photo" ? viewerTexts.toggle.show3d : viewerTexts.toggle.showPhoto;

  if (mode === "3d") {
    return (
      <div className={styles.galleryWrapper}>
        <Property3dViewer
          src={model.url}
          alt={property.title}
          posterImage={hasImage ? property.image : undefined}
          isSample={model.isSample}
        />

        <button
          type="button"
          className={styles.toggleButton}
          onClick={() => setMode("photo")}
        >
          {toggleLabel}
        </button>
      </div>
    );
  }

  return (
    <div className={styles.galleryWrapper}>
      <figure className={styles.gallery}>
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={property.image}
            alt={`${texts.altPrefix} ${property.title}`}
            className={styles.image}
          />
        ) : (
          <div className={styles.fallback}>{texts.noImage}</div>
        )}

        <div className={styles.scrim} aria-hidden="true" />

        <div className={styles.badgeRow}>
          {property.featured ? (
            <span className={styles.featuredBadge}>{texts.featuredBadge}</span>
          ) : (
            <span aria-hidden="true" />
          )}

          <span className={styles.model3dBadge}>
            <span className={styles.model3dBullet} aria-hidden="true">
              {"◆"}
            </span>
            {texts.model3dBadge}
          </span>
        </div>
      </figure>

      <button
        type="button"
        className={styles.toggleButton}
        onClick={() => setMode("3d")}
      >
        {toggleLabel}
      </button>
    </div>
  );
}
