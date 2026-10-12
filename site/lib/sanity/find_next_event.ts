import type { SanityEvent } from "./sanity.types";

/// Returns the earliest event at or after `now`.
///
/// `events` must be newest-first, as `eventsQuery` returns them, so a reversed
/// copy is searched oldest-first. The input is not mutated: the previous inline
/// version called `.reverse()` on the fetched array itself.
export function findNextEvent(
  events: readonly SanityEvent[],
  now: number,
): SanityEvent | undefined {
  return [...events]
    .reverse()
    .find((event) => event.date !== undefined && Date.parse(event.date) >= now);
}
