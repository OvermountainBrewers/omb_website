"use server";
import "server-only";

import { getAllMembers } from "@/app/server/sanity/sanity.endpoints";

export async function getMemberData() {
  const members = await getAllMembers();

  return {
    members,
  };
}
