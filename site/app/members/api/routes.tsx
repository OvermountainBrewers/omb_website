"server side";
import { getAllMembers, getClient } from "@/lib/sanity.client";

export async function getMemberData() {
  const client = getClient();
  const members = await getAllMembers(client);

  return {
    members,
  };
}
