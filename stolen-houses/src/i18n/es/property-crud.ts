export const PROPERTY_CRUD_TEXTS = {
  header: {
    badge: "Stolen Houses - Admin",
    title: "CRUD de propiedades",
    description:
      "Desde aquí puedes crear, editar y eliminar propiedades guardadas en el archivo local data/properties.json.",
  },
  form: {
    createTitle: "Nueva propiedad",
    editTitle: "Editar propiedad",
    labels: {
      title: "Título",
      price: "Precio",
      location: "Ubicación",
      bedrooms: "Habitaciones",
      bathrooms: "Baños",
      area: "Área m²",
      image: "Imagen",
      model3d: "Modelo 3D (URL .glb)",
      description: "Descripción",
    },
    placeholders: {
      title: "Casa Moderna en Escazú",
      price: "185000",
      location: "Escazú, San José",
      image: "/images/properties/casa-1.jpg",
      model3d: "/models/casa-1.glb",
      description: "Describe la propiedad...",
    },
    featured: "Marcar como destacada",
    buttons: {
      create: "Crear propiedad",
      update: "Actualizar propiedad",
      clear: "Limpiar formulario",
      saving: "Guardando...",
    },
  },
  list: {
    title: "Propiedades registradas",
    loading: "Cargando propiedades...",
    empty: "No hay propiedades registradas.",
  },
  card: {
    featured: "Destacada",
    price: "Precio",
    bedrooms: "Habitaciones",
    bathrooms: "Baños",
    area: "Área",
    edit: "Editar",
    delete: "Eliminar",
    units: {
      area: "m²",
    },
  },
  messages: {
    createSuccess: "Propiedad creada correctamente.",
    updateSuccess: "Propiedad actualizada correctamente.",
    deleteSuccess: "Propiedad eliminada correctamente.",
    deleteConfirmation: "¿Seguro que deseas eliminar esta propiedad?",
    unexpectedLoadError: "Ocurrió un error al cargar las propiedades.",
    unexpectedSaveError: "Ocurrió un error al guardar la propiedad.",
    unexpectedDeleteError: "Ocurrió un error al eliminar la propiedad.",
  },
} as const;
