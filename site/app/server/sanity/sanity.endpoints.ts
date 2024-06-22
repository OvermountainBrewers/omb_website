import "server-only";
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
import { Member, Post, membersQuery, postsQuery } from "./sanity.queries";
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
      ...(isDraftMode && { revalidate: 30 }),
      tags, // for tag-based revalidation
    },
    cache: "no-store",
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
