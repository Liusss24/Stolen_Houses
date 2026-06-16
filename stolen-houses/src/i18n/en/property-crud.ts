export const PROPERTY_CRUD_TEXTS = {
  header: {
    badge: "Stolen Houses - Admin",
    title: "Property management",
    description:
      "From here you can create, edit and delete properties stored in the local file data/properties.json.",
  },
  form: {
    createTitle: "New property",
    editTitle: "Edit property",
    labels: {
      title: "Title",
      price: "Price",
      location: "Location",
      bedrooms: "Bedrooms",
      bathrooms: "Bathrooms",
      area: "Area m²",
      image: "Image",
      model3d: "3D Model (URL .glb)",
      description: "Description",
    },
    placeholders: {
      title: "Modern House in Escazú",
      price: "185000",
      location: "Escazú, San José",
      image: "/images/properties/casa-1.jpg",
      model3d: "/models/casa-1.glb",
      description: "Describe the property...",
    },
    featured: "Mark as featured",
    buttons: {
      create: "Create property",
      update: "Update property",
      clear: "Clear form",
      saving: "Saving...",
    },
  },
  list: {
    title: "Registered properties",
    loading: "Loading properties...",
    empty: "No registered properties.",
  },
  card: {
    featured: "Featured",
    price: "Price",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    area: "Area",
    edit: "Edit",
    delete: "Delete",
    units: {
      area: "m²",
    },
  },
  messages: {
    createSuccess: "Property created successfully.",
    updateSuccess: "Property updated successfully.",
    deleteSuccess: "Property deleted successfully.",
    deleteConfirmation: "Are you sure you want to delete this property?",
    unexpectedLoadError: "An error occurred while loading properties.",
    unexpectedSaveError: "An error occurred while saving the property.",
    unexpectedDeleteError: "An error occurred while deleting the property.",
  },
} as const;
