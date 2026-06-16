import type { Property } from "@/entities/property/model/property.types";

import {
  SAMPLE_MODEL_URL,
  SUPPORTED_MODEL_EXTENSIONS,
} from "@/features/view-360/model/view-360.constants";
import type { Model3dSource } from "@/features/view-360/model/view-360.types";

function hasSupportedExtension(url: string): boolean {
  const lowercase = url.toLowerCase().split("?")[0]?.split("#")[0] ?? "";
  const dotIndex = lowercase.lastIndexOf(".");

  if (dotIndex < 0) {
    return false;
  }

  return SUPPORTED_MODEL_EXTENSIONS.has(lowercase.slice(dotIndex));
}

/**
 * Picks the GLB/glTF source to render for a property. When the property has
 * no real `model3d` URL (or the URL is not a supported format) we fall back to
 * the bundled sample so every card stays interactive in the demo phase. The
 * returned `isSample` flag lets the UI annotate which case is being rendered.
 *
 * Pure helper (no React) so it can run anywhere; named with `use*` keeps the
 * call site readable when invoked from components.
 */
export function usePropertyModel(property: Property): Model3dSource {
  const candidate = property.model3d?.trim() ?? "";

  if (candidate.length > 0 && hasSupportedExtension(candidate)) {
    return { url: candidate, isSample: false };
  }

  return { url: SAMPLE_MODEL_URL, isSample: true };
}
