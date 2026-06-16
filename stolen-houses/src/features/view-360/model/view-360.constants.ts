import type { CameraDefaults } from "./view-360.types";

/**
 * Self-hosted CC-BY sample model. Used as a placeholder until each property
 * has its own real `model3d` URL. Lives under `public/models/`.
 */
export const SAMPLE_MODEL_URL = "/models/sample-house.glb";

/**
 * Lowercase extensions accepted by `<model-viewer>`. Stored as a Set so the
 * lookup stays O(1) when validating an incoming URL.
 */
export const SUPPORTED_MODEL_EXTENSIONS: ReadonlySet<string> = new Set([
  ".glb",
  ".gltf",
]);

/**
 * Default camera orbit string follows model-viewer's notation:
 *   "<theta> <phi> <radius>"
 * theta = horizontal rotation, phi = vertical rotation, radius = distance.
 * Tuned so the sample model lands centered on first paint.
 */
export const VIEW_360_CAMERA_DEFAULTS: CameraDefaults = {
  cameraOrbit: "45deg 75deg 110%",
  fieldOfView: "30deg",
  cameraTarget: "auto auto auto",
  exposure: "1",
  shadowIntensity: "0.6",
  shadowSoftness: "0.8",
  autoRotateDelay: "6000",
};
