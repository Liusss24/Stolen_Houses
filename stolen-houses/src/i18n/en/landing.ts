export const LANDING_TEXTS = {
  metadata: {
    title: "Editorial Real Estate",
    description:
      "Curated property catalog with 3D viewer, dedicated advisory, and flexible financing.",
  },
  brand: {
    name: "STOLEN HOUSES",
    established: "EST · MMXXVI",
    tagline: "BUY WITH CLASS · REGARDLESS OF YOUR CLASS",
    edition: "EDITION MMXXVI",
  },
  navigation: {
    items: [
      { label: "Catalog", href: "/propiedades" },
      { label: "3D Viewer", href: "/#visor" },
      { label: "Services", href: "/#servicios" },
      { label: "About", href: "/#nosotros" },
    ],
    locales: {
      es: "ES",
      en: "EN",
      activeLocale: "en" as "es" | "en",
    },
    loginLabel: "SIGN IN",
    loginHref: "/login",
    logoutLabel: "SIGN OUT",
    logoutHref: "/api/auth/logout",
  },
  hero: {
    kicker: "Real Estate · Edition MMXXVI",
    titleLeading: "THE HOME",
    titleTrailing: "you deserve",
    edition: "№ 001 — 026",
    description:
      "Walk through every property in 3D before visiting. Accessible luxury for everyone.",
    ctaPrimary: {
      label: "Explore catalog",
      href: "/propiedades",
    },
    ctaSecondary: {
      label: "See viewer demo",
      href: "/#visor",
    },
    pills: ["Virtual 3D tour", "Dedicated advisory", "Flexible financing"],
    viewer: {
      label: "3D VIEWER · INTERACTIVE",
      propertyName: "VILLA ASTORIA · 3D",
      hint: "Drag to rotate",
      image: "/images/landing/villa-astoria.jpg",
    },
    stats: [
      { label: "SQ M", value: "620" },
      { label: "BEDROOMS", value: "05" },
      { label: "BATHROOMS", value: "04" },
    ],
    search: {
      title: "Find your next address",
      fields: {
        location: { label: "Location", placeholder: "Polanco, CDMX" },
        type: { label: "Type", placeholder: "House · Apartment" },
        budget: { label: "Price", placeholder: "$2.4M – $8M" },
      },
      submit: "SEARCH",
    },
  },
  catalog: {
    kicker: "Curated catalog",
    title: "Properties on stage",
    description: "A living collection, from urban studios to private haciendas.",
    cardLabels: {
      featured: "FEATURED · 3D",
      model3d: "3D",
      indexPrefix: "№",
      bedrooms: "BD",
      bathrooms: "BA",
      areaUnit: "m²",
    },
    properties: [
      {
        id: "villa-astoria",
        index: "001",
        category: "LUXURY",
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
        category: "FAMILY",
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
        category: "URBAN",
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
        category: "LUXURY",
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
        category: "FAMILY",
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
        category: "MODEST",
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
      previous: "Previous",
      next: "Next",
    },
  },
  testimonials: {
    kicker: "Voices",
    title: "What our homeowners say",
    items: [
      {
        id: "isabela",
        index: "001",
        quote:
          "Walking through the house in 3D gave me the confidence I needed. The purchase felt like an event, not a formality.",
        author: "Isabela Marín",
        role: "Buyer · CDMX",
      },
      {
        id: "andres",
        index: "002",
        quote:
          "We weren't looking for luxury, we were looking for a home. Here we found both, without pretension.",
        author: "Andrés Cortés",
        role: "Family · Querétaro",
      },
      {
        id: "lucia",
        index: "003",
        quote:
          "The platform's style made me trust it before even speaking with an advisor.",
        author: "Lucía Vargas",
        role: "Investor · Mérida",
      },
    ],
  },
  contact: {
    kicker: "Contact us",
    title: "Start your next address",
    description: "An advisor will respond in less than 24 hours.",
    info: [
      { label: "OFFICE", value: "Av. Reforma 222, CDMX" },
      { label: "PHONE", value: "+52 55 4000 1925" },
      { label: "EMAIL", value: "hello@stolenhouses.casa" },
    ],
    form: {
      fields: {
        name: { label: "Full name", placeholder: "Aaron Rodriguez" },
        email: { label: "Email address", placeholder: "you@email.com" },
        phone: { label: "Phone", placeholder: "+52 55 0000 0000" },
        message: {
          label: "Message",
          placeholder:
            "Tell us what you're looking for, approximate budget, and areas of interest.",
        },
      },
      submit: "SEND REQUEST",
      success: "We received your request. We'll be in touch soon.",
    },
  },
  footer: {
    rights: "© MMXXVI · ALL RIGHTS RESERVED",
  },
} as const;

export type LandingTexts = typeof LANDING_TEXTS;
export type LandingShowcaseProperty =
  (typeof LANDING_TEXTS.catalog.properties)[number];
export type LandingTestimonial =
  (typeof LANDING_TEXTS.testimonials.items)[number];
