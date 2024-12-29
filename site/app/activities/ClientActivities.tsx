"use client";

import { H1, H2, H3 } from "@/components/typography";
import { useFilterStore } from "./store";
import { Event, Brew } from "@/lib/sanity/sanity.types";
import { SectionWrapper } from "./SectionWrapper";
import { Divider } from "@/components/divider";
import { P } from "@/components/typography";
import Link from "next/link";
import { Small } from "@/components/small";
import { cn } from "@/lib/utils";
import { cardStyle } from "@/components/card";

interface ClientActivitiesProps {
  nextEvent: Event | undefined;
  upcomingActivities: (Event | Brew)[];
  pastActivities: (Event | Brew)[];
}

// Helper function to convert URLs to links
const convertUrlsToLinks = (text: string | undefined) => {
  if (!text) return null;

  // Regex to match URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  return text.split(urlRegex).map((part, i) => {
    if (part.match(urlRegex)) {
      return (
        <Link
          key={i}
          href={part}
          className="text-paleGreen underline hover:text-paleGreen/80"
          target="_blank"
          rel="noopener noreferrer"
        >
          {part}
        </Link>
      );
    }
    return part;
  });
};

function buildSection(id: string, activities: any[]): JSX.Element {
  return (
    <section id={id}>
      <SectionWrapper>
        {activities
          .filter(
            (activity) => activity._type == "event" || activity._type == "brew",
          )
          .map((activity) => {
            if (activity._type == "event") {
              const event = activity as Event;

              return buildEvent(event);
            }
            if (activity._type == "brew") {
              const brew = activity as Brew;

              return buildBrew(brew);
            }
          })}
      </SectionWrapper>
    </section>
  );
}

function buildEvent(event: Event): JSX.Element {
  return (
    <li
      key={event._id}
      className={cn(cardStyle, "items-start", "border-l-4 border-paleBlue")}
    >
      <H2 className="tracking-tight leading-7 text-paleBlue">{event.name}</H2>
      {event.location && (
        <p className="tracking-wide leading-6 text-foreground/80">
          {" "}
          {event.location}{" "}
        </p>
      )}
      <Small className="tracking-wider leading-6 text-paleBlue/80">
        {event.date
          ? new Intl.DateTimeFormat("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            }).format(new Date(event.date))
          : "TBD"}
      </Small>
      {event.description && (
        <Small className="mt-6 tracking-wide leading-4 text-foreground/70">
          {convertUrlsToLinks(event.description)}
        </Small>
      )}
    </li>
  );
}

function buildBrew(brew: Brew): JSX.Element {
  return (
    <li
      key={brew._id}
      className={cn(
        cardStyle,
        "items-start col-span1 md:col-span-2 lg:col-span-3 my-12",
        "border-l-4 border-paleGreen",
        "bg-paleGreen/5",
      )}
    >
      <H2 className="text-paleGreen">{brew.name}</H2>
      <p className="text-foreground/80">
        {brew.brewer.name}&apos;s {brew.style}
      </p>
      <p className="mb-8 text-paleGreen/80">
        <span>
          Brewing{" - "}
          <Small>
            {brew.brewDates.brewDate
              ? new Intl.DateTimeFormat("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                }).format(new Date(brew.brewDates.brewDate))
              : "TBD"}
          </Small>
          {" - "}
          <Small>
            {brew.brewDates.endDate
              ? new Intl.DateTimeFormat("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                }).format(new Date(brew.brewDates.endDate))
              : "TBD"}
          </Small>
        </span>
      </p>
      <H3 className="text-paleGreen/90">Ingredients</H3>
      <ul className="list-disc list-inside lg:ml-4 text-foreground/80">
        {brew.ingredients.map((ingredient) => {
          return (
            <li
              key={`ingredient-${ingredient.amount}_${ingredient.unit}_${ingredient.name}`}
            >
              {ingredient.amount} {ingredient.unit}: {ingredient.name}
            </li>
          );
        })}
      </ul>
      {brew.description && (
        <p className="mt-9 text-wrap-pretty break-all lg:break-normal text-foreground/70">
          {convertUrlsToLinks(brew.description)}
        </p>
      )}
    </li>
  );
}

export function ClientActivities({
  nextEvent,
  upcomingActivities,
  pastActivities,
}: ClientActivitiesProps) {
  const { filterType } = useFilterStore();

  const filterActivities = (activities: (Event | Brew)[]) => {
    return activities.filter((activity) => {
      if (filterType === "all") return true;
      if (filterType === "events") return activity._type === "event";
      if (filterType === "brews") return activity._type === "brew";
      return true;
    });
  };

  const filteredNextEvent = nextEvent ? filterActivities([nextEvent])[0] : null;

  return (
    <>
      <H1>Next Event</H1>
      <section id="next-event">
        <SectionWrapper>
          {filteredNextEvent ? (
            buildEvent(filteredNextEvent)
          ) : (
            <P>
              No upcoming events. Chat with us on{" "}
              <Link className="underline" href="https://discord.gg/pvz3PW69yw">
                Discord
              </Link>{" "}
              or{" "}
              <Link className="underline" href="/contact">
                contact us
              </Link>{" "}
              through our website!
            </P>
          )}
        </SectionWrapper>
      </section>
      <Divider />
      <H1>Upcoming Activities</H1>
      {buildSection(
        "upcoming-activities",
        filterActivities(upcomingActivities),
      )}
      <Divider />
      <H1>Past Activities</H1>
      {buildSection("past-activities", filterActivities(pastActivities))}
    </>
  );
}
