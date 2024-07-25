import type { QueryParams } from "next-sanity";
import { draftMode } from "next/headers";
import {
  apiVersion,
  dataset,
  projectId,
  readToken,
  studioUrl,
  useCdn,
} from "./sanity.api";
import {
  activitiesQuery,
  allResourcesQuery,
  brewsQuery,
  eventsQuery,
  membersQuery,
  postsQuery,
} from "./sanity.queries";
import type { Brew, Event, Link, Member, Post, Resource } from "./sanity.types";
import { createClient, type SanityClient } from "next-sanity";
import { client } from "./sanity_client";

export function getClient(preview?: { token: string }): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: "published",
    stega: {
      enabled: preview?.token ? true : false,
      studioUrl,
    },
  });
  if (preview) {
    if (!preview.token) {
      throw new Error("You must provide a token to preview drafts");
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: "previewDrafts",
    });
  }
  return client;
}

const DEFAULT_PARAMS = {} as QueryParams;
const DEFAULT_TAGS = [] as string[];

export async function clientFetch<QueryResponse>({
  query,
  params = DEFAULT_PARAMS,
  tags = DEFAULT_TAGS,
}: {
  query: string;
  params?: QueryParams;
  tags: string[];
}): Promise<QueryResponse> {
  const isDraftMode = draftMode().isEnabled;
  if (isDraftMode && !readToken) {
    throw new Error(
      "The `SANITY_API_READ_TOKEN` environment variable is required."
    );
  }

  return client.fetch<QueryResponse>(query, params, {
    token: readToken,
    ...(isDraftMode && {
      perspective: "previewDrafts",
    }),
    next: {
      // ...(isDraftMode && { revalidate: 30 }),
      revalidate: 0, // no-cache but allows nextjs to build a static page
      tags, // for tag-based revalidation
    },
  });
}

export async function getAllMembers(): Promise<Member[]> {
  const members = await clientFetch<Member[]>({
    query: membersQuery,
    tags: ["member"],
  }).catch((err) => console.error(err));

  return members || [];
}

export async function getPosts(): Promise<Post[]> {
  const posts = await clientFetch<Post[]>({
    query: postsQuery,
    tags: ["post"],
  }).catch((err) => console.error(err));

  return posts || [];
}

export async function getEvents(): Promise<Event[]> {
  const events = await clientFetch<Event[]>({
    query: eventsQuery,
    tags: ["event"],
  }).catch((err) => console.error(err));

  return events || [];
}

export async function getAllBrews(): Promise<Brew[]> {
  const brews = await clientFetch<Brew[]>({
    query: brewsQuery,
    tags: ["brew"],
  }).catch((err) => console.error(err));

  return brews || [];
}

interface Activities {
  brews: Brew[];
  events: Event[];
}

export async function getActivities(): Promise<Activities | void> {
  const activities = await clientFetch<Activities>({
    query: activitiesQuery,
    tags: ["brew", "event"],
  }).catch((err) => console.error(err));

  return activities;
}

interface Resources {
  links: Link[];
  resources: Resource[];
}

export async function getResources(): Promise<Resources | void> {
  const resources = await clientFetch<Resources>({
    query: allResourcesQuery,
    tags: ["link", "resource"],
  }).catch((err) => console.error(err));

  return resources;
}
