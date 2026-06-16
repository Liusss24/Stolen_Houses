import type { DetailedHTMLProps, HTMLAttributes } from "react";

/**
 * `@google/model-viewer` registers a custom element. We surface its attributes
 * to JSX so the wrapper component gets full IntelliSense + type-checking
 * without resorting to `any`.
 *
 * Only the props we actually use are declared. New ones can be added as the
 * UI grows.
 */
type ModelViewerAttributes = HTMLAttributes<HTMLElement> & {
  src?: string;
  alt?: string;
  poster?: string;
  "camera-controls"?: boolean | "";
  "auto-rotate"?: boolean | "";
  "auto-rotate-delay"?: string;
  "shadow-intensity"?: string;
  "shadow-softness"?: string;
  "camera-orbit"?: string;
  "camera-target"?: string;
  "field-of-view"?: string;
  exposure?: string;
  "interaction-prompt"?: "auto" | "when-focused" | "none";
  "tone-mapping"?: "auto" | "aces" | "agx" | "commerce" | "neutral";
  loading?: "auto" | "lazy" | "eager";
  reveal?: "auto" | "interaction" | "manual";
  ar?: boolean | "";
  "ar-modes"?: string;
  "ar-scale"?: "auto" | "fixed";
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": DetailedHTMLProps<
        ModelViewerAttributes,
        HTMLElement
      >;
    }
  }
}

export {};
