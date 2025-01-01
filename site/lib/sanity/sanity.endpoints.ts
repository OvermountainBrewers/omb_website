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
  aboutQuery,
  activitiesQuery,
  allResourcesQuery,
  brewsQuery,
  eventsQuery,
  galleryImagesQuery,
  membersQuery,
  postsQuery,
} from "./sanity.queries";
import type {
  SanityAbout,
  SanityEvent,
  SanityLink,
  SanityPost,
  SanityMember,
  SanityBrew,
  SanityGalleryImage,
  SanityResource,
} from "./sanity.types";
import { createClient, type SanityClient } from "next-sanity";
import { client } from "./sanity_client";
import {
  buildImageWithHotspot,
  ImageBuilderResponse,
} from "../get_sanity_image";

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
  const { isEnabled: isDraftMode } = await draftMode();
  if (isDraftMode && !readToken) {
    throw new Error(
      "The `SANITY_API_READ_TOKEN` environment variable is required.",
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

export async function getAbout(): Promise<SanityAbout> {
  const abouts = await clientFetch<SanityAbout[]>({
    query: aboutQuery,
    tags: ["about"],
  }).catch((err) => console.error(err));

  return abouts && abouts.length ? abouts[0] : { body: [] };
}

/// The member object with the picture field converted to a SanityImageWithHotspot.
export interface Member extends Omit<SanityMember, "picture"> {
  picture?: ImageBuilderResponse;
}

function getMemberFromSanityMember(member: SanityMember): Member {
  return member.picture?.ref
    ? {
        ...member,
        picture: buildImageWithHotspot(member.picture, {
          width: 200,
          height: 200,
        }),
      }
    : (member as Member);
}

export async function getAllMembers(): Promise<Member[]> {
  const members = await clientFetch<SanityMember[]>({
    query: membersQuery,
    tags: ["member"],
  }).catch((err) => console.error(err));

  const processedMembers: Member[] | undefined = members?.map((member) =>
    getMemberFromSanityMember(member),
  );

  return processedMembers || [];
}

export async function getPosts(): Promise<SanityPost[]> {
  const posts = await clientFetch<SanityPost[]>({
    query: postsQuery,
    tags: ["post"],
  }).catch((err) => console.error(err));

  return posts || [];
}

export async function getEvents(): Promise<SanityEvent[]> {
  const events = await clientFetch<SanityEvent[]>({
    query: eventsQuery,
    tags: ["event"],
  }).catch((err) => console.error(err));

  return events || [];
}

export interface Brew extends Omit<SanityBrew, "brewer"> {
  brewer: Member;
}

export async function getAllBrews(): Promise<Brew[]> {
  const brews = await clientFetch<SanityBrew[]>({
    query: brewsQuery,
    tags: ["brew"],
  }).catch((err) => console.error(err));

  const processedBrews: Brew[] | undefined = brews?.map((brew) => ({
    ...brew,
    brewer: getMemberFromSanityMember(brew.brewer),
  }));

  return processedBrews || [];
}

interface Activities {
  brews: SanityBrew[];
  events: SanityEvent[];
}

export async function getActivities(): Promise<Activities | void> {
  const activities = await clientFetch<Activities>({
    query: activitiesQuery,
    tags: ["brew", "event"],
  }).catch((err) => console.error(err));

  return activities;
}

interface Resources {
  links: SanityLink[];
  resources: SanityResource[];
}

export async function getResources(): Promise<Resources | void> {
  const resources = await clientFetch<Resources>({
    query: allResourcesQuery,
    tags: ["link", "resource"],
  }).catch((err) => console.error(err));

  return resources;
}

export interface GalleryImage extends Omit<SanityGalleryImage, "image"> {
  image: ImageBuilderResponse;
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const galleryImages = await clientFetch<SanityGalleryImage[]>({
    query: galleryImagesQuery,
    tags: ["galleryImage"],
  }).catch((err) => console.error(err));

  const processedGalleryImages = galleryImages?.map((galleryImage) => ({
    ...galleryImage,
    image: buildImageWithHotspot(galleryImage.image)!,
  }));

  return processedGalleryImages || [];
}
