import {
  OPPORTUNITY_SOURCES,
  OPPORTUNITY_STATUSES,
  type OpportunitySource,
  type OpportunityStatus,
} from "@/entities/opportunity/model/opportunity.types";

export const MANAGE_OPPORTUNITIES_TEXTS = {
  header: {
    badge: "Stolen Houses · Admin",
    title: "Pipeline de oportunidades",
    description:
      "Registra oportunidades manualmente, conviértelas desde citas y lleva el seguimiento hasta formalizar la compra o desechar el caso.",
  },
  pipeline: {
    title: "Resumen del pipeline",
    totalLabel: "Oportunidades activas",
    valueLabel: "Valor estimado",
    closedWonLabel: "Cerradas con éxito",
    closedLostLabel: "Descartadas",
  },
  createForm: {
    sectionTitle: "Registrar nueva oportunidad",
    description:
      "Selecciona la propiedad de interés y registra el contacto del cliente.",
    fields: {
      propertyId: {
        label: "Propiedad",
        placeholder: "Selecciona una propiedad",
      },
      clientName: {
        label: "Nombre del cliente",
        placeholder: "Aaron Rodríguez",
      },
      clientEmail: {
        label: "Correo electrónico",
        placeholder: "cliente@correo.com",
      },
      clientPhone: {
        label: "Teléfono",
        placeholder: "+52 55 0000 0000",
      },
      status: {
        label: "Estado inicial",
      },
      estimatedValue: {
        label: "Valor estimado",
        placeholder: "Se autocompleta con el precio de la propiedad",
      },
      notes: {
        label: "Notas internas",
        placeholder:
          "Contexto del cliente, presupuesto real, urgencia, etc.",
      },
    },
    submit: "Registrar oportunidad",
    submitting: "Registrando...",
    clear: "Limpiar formulario",
    propertiesLoading: "Cargando catálogo...",
    feedback: {
      success: "Oportunidad registrada correctamente.",
      missingFields: "Faltan campos por completar.",
      noProperties:
        "No hay propiedades en el catálogo. Crea propiedades antes de registrar oportunidades.",
    },
  },
  list: {
    title: "Oportunidades registradas",
    summary: (visible: string, total: string) =>
      `${visible} de ${total} oportunidades`,
    loading: "Cargando oportunidades...",
    empty: "Aún no hay oportunidades registradas.",
    emptyFiltered: "No hay oportunidades en este estado.",
  },
  filters: {
    legend: "Filtrar por estado",
    allLabel: "Todas",
  },
  card: {
    propertyLabel: "Propiedad",
    clientLabel: "Cliente",
    contactLabel: "Contacto",
    sourceLabel: "Origen",
    statusLabel: "Estado",
    estimatedValueLabel: "Valor estimado",
    notesLabel: "Notas internas",
    noNotes: "Sin notas registradas.",
    referenceLabel: "Referencia",
    createdAtLabel: "Registrada",
    statusUpdating: "Actualizando...",
    deleteLabel: "Eliminar oportunidad",
    deleteConfirm: "¿Eliminar esta oportunidad?",
    appointmentLink: "Ver cita relacionada",
  },
  status: {
    new: "Nueva",
    contacted: "Contactado",
    visit_scheduled: "Visita agendada",
    negotiating: "En negociación",
    closed_won: "Cerrada con éxito",
    closed_lost: "Descartada",
  } as Record<OpportunityStatus, string>,
  source: {
    manual: "Registro manual",
    appointment: "Desde cita",
    preseleccion: "Desde preselección",
  } as Record<OpportunitySource, string>,
  messages: {
    statusUpdateSuccess: "Estado actualizado.",
    statusUpdateError: "No pudimos actualizar el estado.",
    deleteSuccess: "Oportunidad eliminada.",
    deleteError: "No pudimos eliminar la oportunidad.",
    loadError: "No pudimos cargar las oportunidades.",
  },
} as const;

export type ManageOpportunitiesTexts = typeof MANAGE_OPPORTUNITIES_TEXTS;

export { OPPORTUNITY_STATUSES, OPPORTUNITY_SOURCES };
