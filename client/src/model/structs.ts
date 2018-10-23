export interface Credentials {
  username: string;
  password: string;
}

export interface User {
  username: string;
  roles: string[];
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  username: string;
  roles: string[];
}

export interface RefreshResponse {
  access_token: string;
  refresh_token: string;
}