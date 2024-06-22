import { Metadata } from "next";
import { getEvents } from "../server/sanity/sanity.endpoints";

export const metadata: Metadata = {
  title: {
    absolute: "Events",
  },
  description: "Over Mountain Brewers events",
};

export default async function Page() {
  const events = await getEvents();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Events</h1>
      <section>
        <ul>
          {events.map((event) => (
            <li key={event._id}>
              <h2>{event.name}</h2>
              <p>
                {event.date
                  ? new Intl.DateTimeFormat("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    }).format(new Date(event.date))
                  : "TBD"}
              </p>
              <p>{event.location}</p>
              <p>{event.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
