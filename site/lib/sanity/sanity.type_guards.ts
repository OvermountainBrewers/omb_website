// A typescript type guard to check if a value is a SanityImageRef

import { SanityMetaAltImage } from "./sanity.types";

// This allows us to verify an object in JavaScript is a certain type in TypeScript based on the properties it has
export function isSanityMetaAltImageWithRef(
  value: unknown,
): value is SanityMetaAltImage {
  return (
    // verify non-null object
    typeof value === "object" &&
    value !== null &&
    // verify required properties
    "ref" in value &&
    "metadata" in value &&
    "alt" in value &&
    // verify required property types
    typeof value.alt === "string" &&
    typeof value.ref === "object" &&
    value.ref !== null &&
    "asset" in value.ref &&
    typeof value.ref.asset === "object" &&
    value.ref.asset !== null &&
    "_ref" in value.ref.asset &&
    typeof value.ref.asset._ref === "string"
  );
}
