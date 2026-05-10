export type {
  CreatePropertyInput,
  Property,
  UpdatePropertyInput,
} from "./model/property.types";

export {
  PROPERTY_API_MESSAGES,
  PROPERTY_API_ROUTES,
} from "./model/property.constants";

export {
  createPropertyRequest,
  deletePropertyRequest,
  getProperties,
  updatePropertyRequest,
} from "./api/property.service";
