import { Metadata } from "next";
import { getActivities } from "@/lib/sanity/sanity.endpoints";
import { SanityBrew, SanityEvent } from "@/lib/sanity/sanity.types";
import Main from "@/components/main";
import { ActivityFilter } from "@/app/activities/ActivityFilter";
import { Activities } from "@/app/activities/Activities";
import { P } from "@/components/typography";

export const metadata: Metadata = {
  title: {
    absolute: "Activities | Overmountain Brewers",
  },
  description: "Overmountain Brewers activities",
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
    brews.forEach((brew: SanityBrew) => {
      dateToActivity.set(brew.brewDates.endDate, brew);
    });
  events &&
    events.forEach((event: SanityEvent) => {
      dateToActivity.set(event.date, event);
    });

  // then sort the map by the key
  const sortedDateToActivity = new Map(
    Array.from(dateToActivity).sort(([a], [b]) => b.localeCompare(a)),
  );

  // then flatten the map into an array
  const sortedActivities = Array.from(sortedDateToActivity.values());

  // split the activities into upcoming and past
  const upcomingActivities = sortedActivities.filter((activity) => {
    if (activity._type == "event") {
      const event = activity as SanityEvent;
      return event.date ? new Date(event.date) >= new Date() : false;
    }
    if (activity._type == "brew") {
      const brew = activity as SanityBrew;
      return new Date(brew.brewDates.endDate) >= new Date();
    }
    return false;
  });
  const pastActivities = sortedActivities.filter((activity) => {
    if (activity._type == "event") {
      const event = activity as SanityEvent;
      return event.date ? new Date(event.date) < new Date() : false;
    }
    if (activity._type == "brew") {
      const brew = activity as SanityBrew;
      return new Date(brew.brewDates.endDate) < new Date();
    }
    return false;
  });

  // filter the sorted activities for events and get the first one
  const nextEvent = upcomingActivities.find(
    (activity) => activity._type == "event",
  ) as SanityEvent;

  return (
    <Main>
      <ActivityFilter className="flex justify-end my-4" />
      <Activities
        nextEvent={nextEvent}
        upcomingActivities={upcomingActivities}
        pastActivities={pastActivities}
      />
    </Main>
  );
}
