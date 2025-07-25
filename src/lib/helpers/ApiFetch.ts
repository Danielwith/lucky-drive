import { SpinnerService } from "@/services/init/spinner_service";
import { ApiFetchTypes } from "../types/types";
import { useAuthStore } from "../store/auth_store";

const BASE_URL = import.meta.env.XPLORA_API_URL;
const { token } = useAuthStore.getState();

function buildUrl(
  endpoint: ApiFetchTypes.ApiEndpoint,
  params?: Record<string, string | number>, // ESTO ES PARA METODO GET
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
  SpinnerService.show(options?.message);

  const url = buildUrl(endpoint, options?.params, customApiUrl);

  const fetchOptions: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
    // EL RESPONSE DEL BACK END SI O SI DEBE TENER nRetorno y sRetorno
    const data = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (data?.response.nRetorno !== 1) throw new Error(data?.response.sRetorno);
    if (options?.log) console.log(`[API] ${url}`, data);
    return { success: true, response: data?.response };
  } catch (error) {
    if (options?.log) console.error(`[API] ${url}`, error);
    throw new ApiFetchTypes.ApiError((error as Error).message);
  } finally {
    SpinnerService.hide();
  }
}
