import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// className={twMerge("")}

export function getPeruTimestamp(): string {
  const parts = new Date().toLocaleString("sv", {
    timeZone: "America/Lima",
    hour12: false,
  });
  return parts.replace(/\D/g, "").slice(0, 14);
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export function parseJwt<T = any>(token: string): T | null {
  try {
    const base64Payload = token.split(".")[1];
    const json = atob(base64Payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}
