export const OPPORTUNITY_STATUSES = {
  new: "new",
  contacted: "contacted",
  visitScheduled: "visit_scheduled",
  negotiating: "negotiating",
  closedWon: "closed_won",
  closedLost: "closed_lost",
} as const;

export type OpportunityStatus =
  (typeof OPPORTUNITY_STATUSES)[keyof typeof OPPORTUNITY_STATUSES];

export const OPPORTUNITY_STATUS_ORDER: ReadonlyArray<OpportunityStatus> = [
  OPPORTUNITY_STATUSES.new,
  OPPORTUNITY_STATUSES.contacted,
  OPPORTUNITY_STATUSES.visitScheduled,
  OPPORTUNITY_STATUSES.negotiating,
  OPPORTUNITY_STATUSES.closedWon,
  OPPORTUNITY_STATUSES.closedLost,
];

export const OPPORTUNITY_SOURCES = {
  manual: "manual",
  appointment: "appointment",
  preseleccion: "preseleccion",
} as const;

export type OpportunitySource =
  (typeof OPPORTUNITY_SOURCES)[keyof typeof OPPORTUNITY_SOURCES];

export type Opportunity = {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  propertyPrice: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  status: OpportunityStatus;
  source: OpportunitySource;
  appointmentId: string | null;
  estimatedValue: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateOpportunityInput = {
  propertyId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  status?: OpportunityStatus;
  source?: OpportunitySource;
  appointmentId?: string | null;
  estimatedValue?: number;
  notes?: string;
};

export type UpdateOpportunityInput = Partial<
  Pick<Opportunity, "status" | "estimatedValue" | "notes">
>;
