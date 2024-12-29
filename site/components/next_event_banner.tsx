import { getActivities } from "@/lib/sanity/sanity.endpoints";
import { Event } from "@/lib/sanity/sanity.types";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Suspense } from "react";

export async function NextEventBanner() {
  return (
    <Suspense fallback={NextEventBannerFallback()}>
      <NextEventBannerPromise />
    </Suspense>
  );
}

function NextEventBannerFallback(): JSX.Element {
  return (
    <div className="h-16 bg-secondary/50 animate-pulse rounded-lg mb-6 w-full flex items-center justify-center">
      Checking for next event...
    </div>
  );
}

async function NextEventBannerPromise(): Promise<JSX.Element | undefined> {
  const maybeActivities = await getActivities();

  // Find the next event using the same logic from activities page
  const nextEvent = maybeActivities?.events?.find(
    (event: Event) =>
      event.date !== undefined && Date.parse(event.date) >= Date.now(),
  );

  return (
    nextEvent && (
      <Link href="/activities" className="block w-full max-w-2xl">
        <div className="flex justify-between items-center bg-secondary p-2 md:p-4 rounded-lg hover:bg-secondary/80 transition-colors">
          <div className="flex flex-col gap-1">
            <div className="pt-2 text-secondary-foreground">
              {nextEvent.name}
            </div>
            <div className="text-sm text-muted-foreground">
              {new Date(nextEvent.date!).toLocaleDateString()}
            </div>
          </div>
          <div className="flex justify-end items-center">
            <ChevronRight className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>
      </Link>
    )
  );
}
