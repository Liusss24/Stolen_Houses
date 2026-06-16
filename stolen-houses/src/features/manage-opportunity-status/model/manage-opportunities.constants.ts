import { OPPORTUNITY_STATUSES } from "@/entities/opportunity/model/opportunity.types";

import type { CreateOpportunityFormState } from "./manage-opportunities.types";

export const CREATE_OPPORTUNITY_DEFAULT_FORM: CreateOpportunityFormState = {
  propertyId: "",
  clientName: "",
  clientEmail: "",
  clientPhone: "",
  status: OPPORTUNITY_STATUSES.new,
  estimatedValue: "",
  notes: "",
};
