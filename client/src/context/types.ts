export type ErrCallbackType = (err: { [key: string]: string }) => void;

export type LoginParams = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

type Params = {
  user: UserData;
  token: string;
  rememberMe?: boolean;
};

export type UserDataType = {
  id: number;

  user_id: string;
  role: string;
  email: string;
  fullName: string;
  username: string;
  password: string;
  avatar?: string | null;
};

export type AuthValuesType = {
  loading: boolean;
  logout: () => void;
  user: UserData | null;
  setLoading: (value: boolean) => void;
  setUser: (value: UserData | null) => void;
  login: (params: Params, errorCallback?: ErrCallbackType) => void;
  register: (params: Params, errorCallback?: ErrCallbackType) => void;
};

export type Response<T> = {
  data: T[];
  function_call_type: string;
  msg: string;
  status: number;
};

export type ObjResponse<T> = {
  data: T;
  function_call_type: string;
  msg: string;
  status: number;
};

export type UserData = {
  user_id: any;
  id: number;
  emp_code: string;
  email: string;
  mobile: string;
  user_roles: number[];
  is_active: boolean;
  name: string;
};

export type LoginResponse = {
  status: number;
  msg: string;
  data: UserData;
  token: string;
};

export type TLCoverageData = {
  cse_codes: any;
  id: number;
  zone_code: string;
  equip_cat_code: string;
  plant_code: string;
  tl_emp_code: string;
  pincodes: string;
};

export type CustomerPolicyData = {
  equipment_category_id: any;
  team_lead_id: any;
  customer_id: any;
  id: number;
  cust_code: string;
  equip_cat_name: string;
  tl_emp_code: string;
  tl_name: string;
  cust_name: string;
  equip_cat_code: string;
  machine_cat_name: string;
  tl_emp_name: string;
};

export type EquipmentCategoryData = {
  id: number;
  code: string;
  name: string;
  description: string;
  display_order: any;
  is_active: any;
  created_by: any;
  created_date: any;
};

export type TeamLeadsData = {
  id: number;
  emp_code: string;
  name: string;
  email: string;
  mobile: string;
  designation_id: string;
  user_roles: Array<number>;
  is_active: boolean;
  created_date: any;
  created_by: any;
  last_modified_date: string;
  last_modified_by: string;
  user_role_names: string;
};

export type ZoneData = {
  zone_code: string;
};

export type BranchData = {
  branch_code: string;
  branch_name: string;
  city_name: string;
  po_code: string;
  street1: string;
  street2: string;
  street3: string;
  street4: string;
  country_code: string;
  region_code: string;
  hub_code: string;
  active: string;
  isonline: any;
  created_at_c: string;
  updated_at_c: string;
};

export type AddNewCoveragePayload = {
  data: {
    equip_cat_code: string;
    zone_code: string;
    tl_emp_code: string;
    plant_code: string;
  };
};

export type UpdateCoveragePayload = {
  data: {
    id: number;
    zone_name: string;
    plant_code: string;
    plant_name: string;
  };
};

export type ReAllocateTeamLeadPayload = {
  data: {
    id: number;
    psm_code: string;
    psm_name: string;
    uid: number;
  };
};
