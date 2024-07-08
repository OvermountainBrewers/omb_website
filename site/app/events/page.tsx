import { Metadata } from "next";
import { getEvents } from "@/lib/sanity/sanity.endpoints";
import { H1, H2, P } from "@/components/typography";
import { cardStyle } from "@/components/card";
import { cn } from "@/lib/utils";
import { Small } from "@/components/small";
import { Lead } from "@/components/lead";
import { Large } from "@/components/large";

export const metadata: Metadata = {
  title: {
    absolute: "Events",
  },
  description: "Over Mountain Brewers events",
};

export default async function Page() {
  const events = await getEvents();

  return (
    <main className="flex flex-col p-4 lg:p-24">
      <H1>Events</H1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <ul>
          {events.map((event) => (
            <li key={event._id} className={cn(cardStyle, "items-start")}>
              <H2>{event.name}</H2>
              {event.location && <p> {event.location} </p>}
              <Small
                text={
                  event.date
                    ? new Intl.DateTimeFormat("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      }).format(new Date(event.date))
                    : "TBD"
                }
              />
              {event.description && (
                <Large text={event.description} className="mt-9" />
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
