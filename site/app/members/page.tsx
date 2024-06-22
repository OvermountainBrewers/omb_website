import { Metadata } from "next";
import { getMemberData } from "./server/get_member_data";
import { SanityImage } from "../components/sanity_image";

export const metadata: Metadata = {
  title: {
    absolute: "Members",
  },
  description: "Over Mountain Brewers members",
};

export default async function Page() {
  const { members } = await getMemberData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
