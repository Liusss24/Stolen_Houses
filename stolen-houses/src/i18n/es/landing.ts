export const LANDING_TEXTS = {
  metadata: {
    title: "Bienes raíces editoriales",
    description:
      "Catálogo selecto de propiedades con visor 3D, asesoría dedicada y financiamiento flexible.",
  },
  brand: {
    name: "STOLEN HOUSES",
    established: "EST · MMXXVI",
    tagline: "COMPRA CON CLASE · SIN IMPORTAR TU CLASE",
    edition: "EDICIÓN MMXXVI",
  },
  navigation: {
    items: [
      { label: "Catálogo", href: "/propiedades" },
      { label: "Visor 3D", href: "/#visor" },
      { label: "Servicios", href: "/#servicios" },
      { label: "Nosotros", href: "/#nosotros" },
    ],
    locales: {
      es: "ES",
      en: "EN",
      activeLocale: "es" as "es" | "en",
    },
    loginLabel: "INICIAR SESIÓN",
    loginHref: "/login",
    logoutLabel: "CERRAR SESIÓN",
    logoutHref: "/api/auth/logout",
  },
  hero: {
    kicker: "Bienes raíces · Edición MMXXVI",
    titleLeading: "EL HOGAR",
    titleTrailing: "que mereces",
    edition: "№ 001 — 026",
    description:
      "Recorre cada propiedad en 3D antes de visitarla. Lujo accesible para todos.",
    ctaPrimary: {
      label: "Explorar catálogo",
      href: "/propiedades",
    },
    ctaSecondary: {
      label: "Ver demo del visor",
      href: "/#visor",
    },
    pills: [
      "Tour virtual 3D",
      "Asesoría dedicada",
      "Financiamiento flexible",
    ],
    viewer: {
      label: "VISOR 3D · INTERACTIVO",
      propertyName: "VILLA ASTORIA · 3D",
      hint: "Arrastra para rotar",
      image: "/images/landing/villa-astoria.jpg",
    },
    stats: [
      { label: "M²", value: "620" },
      { label: "RECÁMARAS", value: "05" },
      { label: "BAÑOS", value: "04" },
    ],
    search: {
      title: "Encuentra tu próxima dirección",
      fields: {
        location: { label: "Ubicación", placeholder: "Polanco, CDMX" },
        type: { label: "Tipo", placeholder: "Casa · Departamento" },
        budget: { label: "Precio", placeholder: "$2.4M – $8M" },
      },
      submit: "BUSCAR",
    },
  },
  catalog: {
    kicker: "Catálogo selecto",
    title: "Propiedades en escena",
    description:
      "Una colección viva, desde estudios urbanos hasta haciendas privadas.",
    cardLabels: {
      featured: "FEATURED · 3D",
      model3d: "3D",
      indexPrefix: "№",
      bedrooms: "REC",
      bathrooms: "BA",
      areaUnit: "m²",
    },
    properties: [
      {
        id: "villa-astoria",
        index: "001",
        category: "LUJO",
        name: "Villa Astoria",
        location: "POLANCO, CDMX",
        price: "$8,400,000",
        bedrooms: 5,
        bathrooms: 4,
        area: 620,
        featured: true,
        image: "/images/landing/villa-astoria.jpg",
      },
      {
        id: "casa-solaria",
        index: "002",
        category: "FAMILIAR",
        name: "Casa Solaria",
        location: "MÉRIDA, YUCATÁN",
        price: "$3,950,000",
        bedrooms: 4,
        bathrooms: 3,
        area: 380,
        featured: false,
        image: "/images/landing/casa-solaria.jpg",
      },
      {
        id: "loft-bellecour",
        index: "003",
        category: "URBANA",
        name: "Loft Bellecour",
        location: "GUADALAJARA",
        price: "$1,720,000",
        bedrooms: 2,
        bathrooms: 2,
        area: 140,
        featured: false,
        image: "/images/landing/loft-bellecour.jpg",
      },
      {
        id: "hacienda-sevilla",
        index: "004",
        category: "LUJO",
        name: "Hacienda Sevilla",
        location: "SAN MIGUEL DE ALLENDE",
        price: "$12,100,000",
        bedrooms: 7,
        bathrooms: 6,
        area: 1240,
        featured: true,
        image: "/images/landing/hacienda-sevilla.jpg",
      },
      {
        id: "casa-jardin",
        index: "005",
        category: "FAMILIAR",
        name: "Casa Jardín",
        location: "QUERÉTARO",
        price: "$2,480,000",
        bedrooms: 3,
        bathrooms: 2,
        area: 210,
        featured: false,
        image: "/images/landing/casa-jardin.jpg",
      },
      {
        id: "estudio-marais",
        index: "006",
        category: "MODESTA",
        name: "Estudio Marais",
        location: "TIJUANA",
        price: "$890,000",
        bedrooms: 1,
        bathrooms: 1,
        area: 62,
        featured: false,
        image: "/images/landing/estudio-marais.jpg",
      },
    ],
    carousel: {
      previous: "Anterior",
      next: "Siguiente",
    },
  },
  testimonials: {
    kicker: "Voces",
    title: "Lo que dicen nuestros propietarios",
    items: [
      {
        id: "isabela",
        index: "001",
        quote:
          "Recorrer la casa en 3D me dio la confianza que necesitaba. La compra se sintió como un evento, no un trámite.",
        author: "Isabela Marín",
        role: "Compradora · CDMX",
      },
      {
        id: "andres",
        index: "002",
        quote:
          "No buscábamos lujo, buscábamos hogar. Aquí encontramos las dos cosas, sin pretensiones.",
        author: "Andrés Cortés",
        role: "Familia · Querétaro",
      },
      {
        id: "lucia",
        index: "003",
        quote:
          "El estilo de la plataforma me hizo confiar antes incluso de hablar con un asesor.",
        author: "Lucía Vargas",
        role: "Inversionista · Mérida",
      },
    ],
  },
  contact: {
    kicker: "Contáctanos",
    title: "Inicia tu próxima dirección",
    description: "Un asesor te responderá en menos de 24 horas.",
    info: [
      { label: "OFICINA", value: "Av. Reforma 222, CDMX" },
      { label: "TELÉFONO", value: "+52 55 4000 1925" },
      { label: "CORREO", value: "hola@stolenhouses.casa" },
    ],
    form: {
      fields: {
        name: { label: "Nombre completo", placeholder: "Aaron Rodríguez" },
        email: { label: "Correo electrónico", placeholder: "tu@correo.com" },
        phone: { label: "Teléfono", placeholder: "+52 55 0000 0000" },
        message: {
          label: "Mensaje",
          placeholder:
            "Cuéntanos qué buscas, presupuesto aproximado y zonas de interés.",
        },
      },
      submit: "ENVIAR SOLICITUD",
      success: "Recibimos tu solicitud. Te contactaremos pronto.",
    },
  },
  footer: {
    rights: "© MMXXVI · TODOS LOS DERECHOS RESERVADOS",
  },
} as const;

export type LandingTexts = typeof LANDING_TEXTS;
export type LandingShowcaseProperty =
  (typeof LANDING_TEXTS.catalog.properties)[number];
export type LandingTestimonial =
  (typeof LANDING_TEXTS.testimonials.items)[number];
