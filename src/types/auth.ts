export interface User {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
}

export enum UserRole {
  ADMIN = "Admin",
  CONTRACTOR = "Contractor",
  SUPPLIER = "Supplier",
  CUSTOMER = "Customer",
  FIELD_ENGINEER = "Field Engineer",
  COMPLIANCE_OFFICER = "Compliance Officer"
}

export enum PERMISSIONS {
  // Marketplace permissions
  VIEW_MARKETPLACE = "view_marketplace",
  CREATE_PROJECT = "create_project",
  SUBMIT_BID = "submit_bid",
  ACCEPT_BID = "accept_bid",
  
  // CRM permissions
  VIEW_LEADS = "view_leads",
  CREATE_LEAD = "create_lead",
  VIEW_WORK_ORDERS = "view_work_orders",
  CREATE_WORK_ORDER = "create_work_order",
  
  // Structural Awareness permissions
  VIEW_STRUCTURES = "view_structures",
  REGISTER_STRUCTURE = "register_structure",
  VIEW_SENSOR_DATA = "view_sensor_data",
  ADD_SENSOR = "add_sensor",
  GENERATE_COMPLIANCE_REPORT = "generate_compliance_report",
  
  // BIM Integration permissions
  UPLOAD_BIM_MODEL = "upload_bim_model",
  VIEW_BIM_MODELS = "view_bim_models"
}

// Define which roles have which permissions
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  [UserRole.ADMIN]: Object.values(PERMISSIONS),
  
  [UserRole.CONTRACTOR]: [
    PERMISSIONS.VIEW_MARKETPLACE,
    PERMISSIONS.CREATE_PROJECT,
    PERMISSIONS.ACCEPT_BID,
    PERMISSIONS.VIEW_LEADS,
    PERMISSIONS.VIEW_WORK_ORDERS,
    PERMISSIONS.VIEW_STRUCTURES,
    PERMISSIONS.VIEW_SENSOR_DATA,
    PERMISSIONS.VIEW_BIM_MODELS
  ],
  
  [UserRole.SUPPLIER]: [
    PERMISSIONS.VIEW_MARKETPLACE,
    PERMISSIONS.SUBMIT_BID,
    PERMISSIONS.VIEW_WORK_ORDERS,
    PERMISSIONS.VIEW_STRUCTURES
  ],
  
  [UserRole.CUSTOMER]: [
    PERMISSIONS.VIEW_MARKETPLACE,
    PERMISSIONS.CREATE_PROJECT,
    PERMISSIONS.ACCEPT_BID,
    PERMISSIONS.VIEW_STRUCTURES,
    PERMISSIONS.VIEW_SENSOR_DATA
  ],
  
  [UserRole.FIELD_ENGINEER]: [
    PERMISSIONS.VIEW_WORK_ORDERS,
    PERMISSIONS.CREATE_WORK_ORDER,
    PERMISSIONS.VIEW_STRUCTURES,
    PERMISSIONS.VIEW_SENSOR_DATA,
    PERMISSIONS.ADD_SENSOR,
    PERMISSIONS.VIEW_BIM_MODELS,
    PERMISSIONS.UPLOAD_BIM_MODEL
  ],
  
  [UserRole.COMPLIANCE_OFFICER]: [
    PERMISSIONS.VIEW_STRUCTURES,
    PERMISSIONS.VIEW_SENSOR_DATA,
    PERMISSIONS.REGISTER_STRUCTURE,
    PERMISSIONS.GENERATE_COMPLIANCE_REPORT,
    PERMISSIONS.VIEW_BIM_MODELS,
    PERMISSIONS.UPLOAD_BIM_MODEL
  ]
};
