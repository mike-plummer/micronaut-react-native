import { MRN } from "../model";

/**
 * Holds access and refresh tokens in memory outside of easily-inspected locales like the Redux Store. Not strictly secure
 * since it exists in the heap - could be offloaded to device secure enclave storage if deemed highly sensitive.
 */
const TokenHolder = {
  accessToken: null,
  refreshToken: null
};

const buildHeaders = (): HeadersInit_ => {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': undefined
  };

  /*
  If we've already acquired an access token then add it as an Authorization Header using Bearer Token syntax
  Micronaut automatically understands this and will validate the token and setup an appropriate Principal in the request context
   */
  if (TokenHolder.accessToken) {
    headers.Authorization = `Bearer ${TokenHolder.accessToken}`
  }
  return headers;
};

/**
 * The Fetch API is kind of awful, manually check error statuses so they reject promises in a predictable way
 */
const translateResponseStatus = (response: Response): Response => {
  const { status } = response;
  if (status === 401) {
    throw new Error('Unauthorized');
  } else if (status === 403) {
    throw new Error('Forbidden');
  } else if (status >= 300) {
    throw new Error('Unknown error');
  }
  return response;
};

/**
 * After either an initial login or a token refresh, pull the resultant access and refresh tokens off the response
 * and persist into our TokenHolder.
 * @param response
 */
const handleAuthResponse = (response: Response): Promise<Response> => {
  return response.json()
    .then((body: MRN.Structs.LoginResponse | MRN.Structs.RefreshResponse): Response => {
      TokenHolder.accessToken = body.access_token;
      TokenHolder.refreshToken = body.refresh_token;

      // Since `json()` can only be called once, replace the original function with one that will return the value we already retrieved
      response.json = () => Promise.resolve(body);

      return response;
    })
};

/**
 * Call the token refresh endpoint to acquire a new access token. Note that refresh tokens don't expire,
 * so we get back the same refresh token and can keep using it
 */
export const refreshToken = (): Promise<Response> =>
  post('/oauth/access_token', {
    'refresh_token': TokenHolder.refreshToken,
    'grant_type': 'refresh_token'
  }).then(translateResponseStatus)
    .then(handleAuthResponse);

/**
 * Call the login endpoint to acquire access and refresh tokens
 * @param body
 */
export const acquireToken = (body: MRN.Structs.Credentials): Promise<Response> =>
  post('/login', body)
    .then(translateResponseStatus)
    .then(handleAuthResponse);

export const post = (path: string, body?: object): Promise<Response> =>
  fetch(`http://localhost:8080${path}`, {
    method: 'POST',
    headers: buildHeaders(),
    body: body ? JSON.stringify(body) : undefined
  }).then(translateResponseStatus);

export const get = (path: string): Promise<Response> =>
  fetch(`http://localhost:8080${path}`, {
    method: 'GET',
    headers: buildHeaders()
  }).then(translateResponseStatus);