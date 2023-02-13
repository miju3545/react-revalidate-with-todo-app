import token from './token';

export type AnyOBJ = {
  [key: string]: any;
};

const BASE_URL = 'http://localhost:8000';

export const fetcher = async ({
  method,
  path,
  body,
  params,
  auth,
}: {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  body?: AnyOBJ;
  params?: AnyOBJ;
  auth?: string;
}) => {
  let url = `${BASE_URL}${path}`;

  const options: RequestInit = {
    method,
    headers: auth
      ? {
          'Content-Type': 'application/json',
          Authorization: token.get(),
        }
      : {
          'Content-Type': 'application/json',
        },
  };

  if (body) options.body = JSON.stringify(body);

  if (params) {
    const searchParams = new URLSearchParams(params);
    url += '?' + searchParams.toString();
  }

  try {
    const res = await fetch(url, options);
    const json = await res.json();
    return json;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default fetcher;
