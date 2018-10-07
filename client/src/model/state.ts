import { MRN } from ".";

export interface State {
  auth: Auth,
  data: Data
}

export interface Auth {
  loaded: boolean;
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  user: MRN.Structs.User | null
}

export interface Data {
  loading: boolean;
  error: string | null;
  data: string | null;
}