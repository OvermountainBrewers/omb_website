import { Metadata } from "next";
import { SanityImage } from "../../components/ui/sanity-image";
import { getAllMembers } from "@/lib/sanity/sanity.endpoints";
import { H1, H2 } from "@/components/typography";

export const metadata: Metadata = {
  title: {
    absolute: "Members",
  },
  description: "Over Mountain Brewers members",
};

export default async function Page() {
  const members = await getAllMembers();

  return (
    <main className="flex flex-col min-h-screen p-24">
      <H1>Members</H1>
      <section id="members" className="flex flex-row">
        {members.map((member) => (
          <div
            key={member.name}
            className="flex flex-col items-center m-2 p-12 bg-slate-800 rounded-xl"
          >
            {member.picture &&
              SanityImage({
                sanityImageSource: member.picture,
                alt: member.picture.alt,
                imageProps: { className: "rounded-full" },
              })}
            <H2>{member.name}</H2>
          </div>
        ))}
      </section>
    </main>
  );
}
