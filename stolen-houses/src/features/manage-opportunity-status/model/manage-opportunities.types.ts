import type { OpportunityStatus } from "@/entities/opportunity/model/opportunity.types";

export type OpportunityStatusFilter = OpportunityStatus | "all";

export type ManageOpportunitiesFeedback = {
  type: "success" | "error";
  text: string;
} | null;

export type CreateOpportunityFormState = {
  propertyId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  status: OpportunityStatus;
  estimatedValue: string;
  notes: string;
};
