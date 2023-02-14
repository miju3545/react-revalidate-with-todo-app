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
  authNeeded,
}: {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  body?: AnyOBJ;
  params?: AnyOBJ;
  authNeeded?: boolean;
}) => {
  let url = `${BASE_URL}${path}`;

  const options: RequestInit = {
    method,
    headers: authNeeded
      ? {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': BASE_URL,
          Authorization: token.get(),
        }
      : {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': BASE_URL,
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
    return error;
  }
};

export default fetcher;
