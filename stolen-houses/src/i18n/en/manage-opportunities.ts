import {
  OPPORTUNITY_SOURCES,
  OPPORTUNITY_STATUSES,
  type OpportunitySource,
  type OpportunityStatus,
} from "@/entities/opportunity/model/opportunity.types";

export const MANAGE_OPPORTUNITIES_TEXTS = {
  header: {
    badge: "Stolen Houses · Admin",
    title: "Opportunities pipeline",
    description:
      "Register opportunities manually, convert them from appointments and track them until closing or discarding each case.",
  },
  pipeline: {
    title: "Pipeline summary",
    totalLabel: "Active opportunities",
    valueLabel: "Estimated value",
    closedWonLabel: "Successfully closed",
    closedLostLabel: "Discarded",
  },
  createForm: {
    sectionTitle: "Register new opportunity",
    description:
      "Select the property of interest and register the client's contact.",
    fields: {
      propertyId: {
        label: "Property",
        placeholder: "Select a property",
      },
      clientName: {
        label: "Client name",
        placeholder: "Aaron Rodriguez",
      },
      clientEmail: {
        label: "Email address",
        placeholder: "client@email.com",
      },
      clientPhone: {
        label: "Phone",
        placeholder: "+52 55 0000 0000",
      },
      status: {
        label: "Initial status",
      },
      estimatedValue: {
        label: "Estimated value",
        placeholder: "Auto-filled with the property price",
      },
      notes: {
        label: "Internal notes",
        placeholder: "Client context, real budget, urgency, etc.",
      },
    },
    submit: "Register opportunity",
    submitting: "Registering...",
    clear: "Clear form",
    propertiesLoading: "Loading catalog...",
    feedback: {
      success: "Opportunity registered successfully.",
      missingFields: "Some fields are missing.",
      noProperties:
        "There are no properties in the catalog. Create properties before registering opportunities.",
    },
  },
  list: {
    title: "Registered opportunities",
    summary: (visible: string, total: string) =>
      `${visible} of ${total} opportunities`,
    loading: "Loading opportunities...",
    empty: "No opportunities registered yet.",
    emptyFiltered: "No opportunities in this status.",
  },
  filters: {
    legend: "Filter by status",
    allLabel: "All",
  },
  card: {
    propertyLabel: "Property",
    clientLabel: "Client",
    contactLabel: "Contact",
    sourceLabel: "Source",
    statusLabel: "Status",
    estimatedValueLabel: "Estimated value",
    notesLabel: "Internal notes",
    noNotes: "No notes registered.",
    referenceLabel: "Reference",
    createdAtLabel: "Registered",
    statusUpdating: "Updating...",
    deleteLabel: "Delete opportunity",
    deleteConfirm: "Delete this opportunity?",
    appointmentLink: "View related appointment",
  },
  status: {
    new: "New",
    contacted: "Contacted",
    visit_scheduled: "Visit scheduled",
    negotiating: "Negotiating",
    closed_won: "Successfully closed",
    closed_lost: "Discarded",
  } as Record<OpportunityStatus, string>,
  source: {
    manual: "Manual registration",
    appointment: "From appointment",
    preseleccion: "From pre-selection",
  } as Record<OpportunitySource, string>,
  messages: {
    statusUpdateSuccess: "Status updated.",
    statusUpdateError: "Could not update the status.",
    deleteSuccess: "Opportunity deleted.",
    deleteError: "Could not delete the opportunity.",
    loadError: "Could not load opportunities.",
  },
} as const;

export type ManageOpportunitiesTexts = typeof MANAGE_OPPORTUNITIES_TEXTS;

export { OPPORTUNITY_STATUSES, OPPORTUNITY_SOURCES };
