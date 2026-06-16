export const VIEW_360_TEXTS = {
  label: "Visor 3D · Interactivo",
  sampleBadge: "Modelo de muestra",
  hint: "Arrastra para rotar · Desplaza para acercar",
  loading: "Cargando modelo 3D...",
  loadError: "No pudimos cargar el modelo 3D.",
  altPrefix: "Modelo 3D interactivo de",
  toggle: {
    show3d: "Ver en 3D",
    showPhoto: "Ver foto",
  },
} as const;

export type View360Texts = typeof VIEW_360_TEXTS;
