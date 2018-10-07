export const TokenHolder = {
  accessToken: null,
  refreshToken: null
};

export const post = (path: string, body: object): Promise<Response> =>
  fetch(`http://localhost:8080${path}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(response => {
      const { status } = response;
      if (status === 401) {
        throw new Error('Incorrect username/password');
      } else if (status >= 300) {
        throw new Error('Unknown error');
      }
      return response;
    });

export const get = (path: string): Promise<Response> =>
  fetch(`http://localhost:8080${path}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });