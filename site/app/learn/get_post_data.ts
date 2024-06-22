"use server";
import "server-only";

import { getPosts } from "@/app/server/sanity/sanity.endpoints";

export async function getPostData() {
  const posts = await getPosts();

  return {
    posts,
  };
}
