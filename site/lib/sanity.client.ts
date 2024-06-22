import {
  apiVersion,
  dataset,
  projectId,
  studioUrl,
  useCdn,
} from "./sanity.api";
import { Member, membersQuery } from "./sanity.queries";
import { createClient, type SanityClient } from "next-sanity";

export const getSanityImageConfig = () => getClient();

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

export async function getAllMembers(client: SanityClient): Promise<Member[]> {
  return (await client.fetch(membersQuery)) || [];
}
