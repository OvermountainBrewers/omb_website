import { Metadata } from "next";
import { SanityImage } from "../components/sanity_image";
import { getAllMembers } from "../server/sanity/sanity.endpoints";

export const metadata: Metadata = {
  title: {
    absolute: "Members",
  },
  description: "Over Mountain Brewers members",
};

export default async function Page() {
  const members = await getAllMembers();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Members</h1>
      {members.map((member) => (
        <div key={member.name} className="flex flex-col items-center">
          {member.picture &&
            SanityImage({
              sanityImageSource: member.picture,
              alt: member.picture.alt,
            })}
          <h2 className="text-xl font-bold">{member.name}</h2>
        </div>
      ))}
    </main>
  );
}
