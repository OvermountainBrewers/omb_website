import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/// Used to dynamically combine classnames from a variable and string with appropriate spacing.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
