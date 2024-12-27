import { Metadata } from "next";
import { getActivities } from "@/lib/sanity/sanity.endpoints";
import { H1, H2, H3, P } from "@/components/typography";
import { cardStyle } from "@/components/card";
import { cn } from "@/lib/utils";
import { Small } from "@/components/small";
import { Large } from "@/components/large";
import { Brew, Event } from "@/lib/sanity/sanity.types";
import { PropsWithChildren } from "react";
import { Divider } from "@/components/divider";
import Main from "@/components/main";

export const metadata: Metadata = {
  title: {
    absolute: "Activities",
  },
  description: "Over Mountain Brewers activities",
};

export default async function Page() {
  const maybeActivities = await getActivities();

  if (maybeActivities === undefined) {
    return <P>We don&apos;t have any upcoming events!</P>;
  }

  const { brews, events } = maybeActivities;

  // add all the brews and events to a map where the key is their event date or brew end date
  // it's okay if the map has duplicate keys
  const dateToActivity = new Map();
  brews &&
    brews.forEach((brew: Brew) => {
      dateToActivity.set(brew.brewDates.endDate, brew);
    });
  events &&
    events.forEach((event: Event) => {
      dateToActivity.set(event.date, event);
    });

  // then sort the map by the key
  const sortedDateToActivity = new Map(
    Array.from(dateToActivity).sort(([a], [b]) => a.localeCompare(b))
  );

  // then flatten the map into an array
  const sortedActivities = Array.from(sortedDateToActivity.values());

  // split the activities into upcoming and past
  const upcomingActivities = sortedActivities.filter((activity) => {
    if (activity._type == "event") {
      const event = activity as Event;
      return event.date ? new Date(event.date) >= new Date() : false;
    }
    if (activity._type == "brew") {
      const brew = activity as Brew;
      return new Date(brew.brewDates.endDate) >= new Date();
    }
    return false;
  });
  const pastActivities = sortedActivities.filter((activity) => {
    if (activity._type == "event") {
      const event = activity as Event;
      return event.date ? new Date(event.date) < new Date() : false;
    }
    if (activity._type == "brew") {
      const brew = activity as Brew;
      return new Date(brew.brewDates.endDate) < new Date();
    }
    return false;
  });

  // filter the sorted activities for events and get the first one
  const nextEvent = upcomingActivities.find(
    (activity) => activity._type == "event"
  ) as Event;

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
        {event.description && (
          <Large text={event.description} className="mt-9" />
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
          "items-start col-span1 md:col-span-2 lg:col-span-3 my-12"
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

  function SectionWrapper({ children }: PropsWithChildren): JSX.Element {
    return (
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {children}
      </ul>
    );
  }

  function buildSection(id: string, activities: any[]): JSX.Element {
    return (
      <section id={id}>
        <SectionWrapper>
          {activities
            .filter(
              (activity) =>
                activity._type == "event" || activity._type == "brew"
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

  return (
    <Main>
      <H1>Next Event</H1>
      <SectionWrapper>
        {nextEvent ? buildEvent(nextEvent) : <P>No upcoming events</P>}
      </SectionWrapper>
      <Divider />
      <H1>Upcoming Activities</H1>
      {buildSection("upcoming-activities", upcomingActivities)}
      <Divider />
      <H1>Past Activities</H1>
      {buildSection("past-activities", pastActivities)}
    </Main>
  );
}
