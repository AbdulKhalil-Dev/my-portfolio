import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

function isPlainObject(item: unknown): item is Record<string, unknown> {
  return (
    typeof item === "object" &&
    item !== null &&
    !Array.isArray(item) &&
    Object.prototype.toString.call(item) === "[object Object]"
  );
}

export function deepMerge<
  T extends Record<string, unknown>,
  S extends Record<string, unknown>
>(target: T, source: S): T & S {
  const result = { ...target } as Record<string, unknown>;

  for (const key of Object.keys(source)) {
    // Prevent prototype pollution
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      continue;
    }

    const sVal = source[key];
    const tVal = result[key];

    if (isPlainObject(sVal) && isPlainObject(tVal)) {
      result[key] = deepMerge(tVal, sVal);
    } else {
      result[key] = sVal;
    }
  }

  return result as T & S;
}

export function sanitizePhone(phone: string): string {
  return phone.replace(/\s+/g, "");
}