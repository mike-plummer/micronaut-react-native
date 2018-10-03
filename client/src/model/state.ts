export interface State {
  auth: Auth
}

export interface Auth {
  loaded: boolean;
  token: string | null;
  user: {
    name: string,
    roles: string[]
  } | null
}