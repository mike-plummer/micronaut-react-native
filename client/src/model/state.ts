import { MRN } from ".";

export interface State {
  auth: Auth
}

export interface Auth {
  loaded: boolean;
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  user: MRN.Structs.User | null
}