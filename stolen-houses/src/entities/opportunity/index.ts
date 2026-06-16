export type {
  CreateOpportunityInput,
  Opportunity,
  OpportunitySource,
  OpportunityStatus,
  UpdateOpportunityInput,
} from "./model/opportunity.types";

export {
  OPPORTUNITY_SOURCES,
  OPPORTUNITY_STATUSES,
  OPPORTUNITY_STATUS_ORDER,
} from "./model/opportunity.types";

export {
  OPPORTUNITY_API_MESSAGES,
  OPPORTUNITY_API_ROUTES,
} from "./model/opportunity.constants";

export {
  createOpportunityRequest,
  deleteOpportunityRequest,
  getOpportunities,
  updateOpportunityRequest,
} from "./api/opportunity.service";
