export const VIEW_360_TEXTS = {
  label: "3D Viewer · Interactive",
  sampleBadge: "Sample model",
  hint: "Drag to rotate · Scroll to zoom",
  loading: "Loading 3D model...",
  loadError: "Could not load the 3D model.",
  altPrefix: "Interactive 3D model of",
  toggle: {
    show3d: "View in 3D",
    showPhoto: "View photo",
  },
} as const;

export type View360Texts = typeof VIEW_360_TEXTS;
