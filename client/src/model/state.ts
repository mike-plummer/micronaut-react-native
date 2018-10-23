import { MRN } from ".";

export interface State {
  auth: Auth,
  data: Data
}

export interface Auth {
  autoRefresh: boolean;
  loading: boolean;
  error: string | null;
  user: MRN.Structs.User | null;
  lastTokenRefresh: string | null;
  expired: boolean;
}

export interface Data {
  loading: boolean;
  error: string | null;
  data: string | null;
}