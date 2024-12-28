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
import { Large } from "@/components/large";
import { cardStyle } from "@/components/card";

interface ClientActivitiesProps {
  nextEvent: Event | undefined;
  upcomingActivities: (Event | Brew)[];
  pastActivities: (Event | Brew)[];
}

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
      {event.description && <Large text={event.description} className="mt-9" />}
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
      )}
    >
      <H2>{brew.name}</H2>
      <p>
        {brew.brewer.name}&apos;s {brew.style}
      </p>
      <p className="mb-8">
        <span>
          Brewing{" - "}
          <Small
            text={
              brew.brewDates.brewDate
                ? new Intl.DateTimeFormat("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  }).format(new Date(brew.brewDates.brewDate))
                : "TBD"
            }
          />
          {" - "}
          <Small
            text={
              brew.brewDates.endDate
                ? new Intl.DateTimeFormat("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  }).format(new Date(brew.brewDates.endDate))
                : "TBD"
            }
          />
        </span>
      </p>
      <H3>Ingredients</H3>
      <ul className="list-disc list-inside lg:ml-4">
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
        <p className="mt-9 text-wrap-pretty break-all lg:break-normal">
          {brew.description}
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

  return (
    <>
      <H1>Next Event</H1>
      <SectionWrapper>
        {nextEvent ? (
          buildEvent(nextEvent)
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
