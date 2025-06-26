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
