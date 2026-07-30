import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines Tailwind classes conditionally and resolves conflict classes cleanly.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Helper to check if a value is a plain JS Object (and not null, array, or dynamic instance).
 */
function isPlainObject(item: unknown): item is Record<string, unknown> {
  return (
    typeof item === "object" &&
    item !== null &&
    !Array.isArray(item) &&
    Object.prototype.toString.call(item) === "[object Object]"
  );
}

/**
 * Recursively merges source properties into a target object safely.
 */
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

/**
 * Removes all whitespace characters from a phone number string.
 */
export function sanitizePhone(phone: string): string {
  return phone.replace(/\s+/g, "");
}