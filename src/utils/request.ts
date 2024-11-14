const BASE_URL = 'http://localhost:3000';

interface RequestOptions extends RequestInit {
  url: string;
  method?: string;
  body?: any;
}

export async function request<T>({ url, method = 'GET', body, ...rest }: RequestOptions): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    ...(rest.headers || {}),
  };

  const response = await fetch(`${BASE_URL}${url}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
  }

  if (response.status === 204) {
    return null as unknown as T;
  }

  const data: T = await response.json();
  return data;
}
