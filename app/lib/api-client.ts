import type { ApiError } from "./types";

class ApiClientError extends Error implements ApiError {
  status: number;
  message: string;

  constructor(message: string, status: number) {
    super(message);
    this.message = message;
    this.status = status;
  }
}

async function request<T>(
  baseUrl: string,
  path: string,
  options: RequestInit & { token?: string }
): Promise<T> {
  const { token, ...init } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${baseUrl}${path}`, { ...init, headers });

  if (!response.ok) {
    let message = response.statusText;
    try {
      const body = await response.json();
      if (body?.detail) {
        message =
          typeof body.detail === "string"
            ? body.detail
            : JSON.stringify(body.detail);
      }
    } catch {
      // keep statusText
    }
    throw new ApiClientError(message, response.status);
  }

  // 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function createApiClient(baseUrl: string, token?: string) {
  const opts = { token };

  return {
    get<T>(path: string): Promise<T> {
      return request<T>(baseUrl, path, { method: "GET", ...opts });
    },
    post<T>(path: string, body?: unknown): Promise<T> {
      return request<T>(baseUrl, path, {
        method: "POST",
        body: JSON.stringify(body),
        ...opts,
      });
    },
    patch<T>(path: string, body: unknown): Promise<T> {
      return request<T>(baseUrl, path, {
        method: "PATCH",
        body: JSON.stringify(body),
        ...opts,
      });
    },
    delete(path: string): Promise<void> {
      return request<void>(baseUrl, path, { method: "DELETE", ...opts });
    },
  };
}

export { ApiClientError };
