import { ApiFetchTypes } from "../types/types";

const BASE_URL = import.meta.env.XPLORA_API_URL;

function buildUrl(
  endpoint: ApiFetchTypes.ApiEndpoint,
  params?: Record<string, string | number>,
  customApiUrl?: string
): string {
  const query = params
    ? "?" + new URLSearchParams(params as Record<string, string>).toString()
    : "";

  return `${customApiUrl ?? BASE_URL}/${endpoint.controller}/${
    endpoint.method
  }${query}`;
}

export async function apiFetch<T>(
  endpoint: ApiFetchTypes.ApiEndpoint,
  options?: ApiFetchTypes.ApiFetchOptions,
  customApiUrl?: string
): Promise<ApiFetchTypes.ApiResponse<T>> {
  const url = buildUrl(endpoint, options?.params, customApiUrl);

  const fetchOptions: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      // eslint-disable-next-line @typescript-eslint/no-misused-spread
      ...options?.headers,
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  };

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      const errorText = await response.text();
      if (options?.log) console.error(`[API] ${url}`, errorText);
      return {
        success: false,
        errors: `Error ${response.status}: ${errorText}`,
      };
    }

    const data = (await response.json()) as T;
    if (options?.log) console.log(`[API] ${url}`, data);

    return { success: true, response: data };
  } catch (error) {
    if (options?.log) console.error(`[API] ${url}`, error);
    return { success: false, errors: (error as Error).message };
  }
}
