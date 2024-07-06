import { Metadata } from "next";
import { SanityImage } from "../../components/ui/sanity-image";
import { getAllMembers } from "@/lib/sanity/sanity.endpoints";
import { H1, H2 } from "@/components/typography";
import { Card } from "@/components/card";

export const metadata: Metadata = {
  title: {
    absolute: "Members",
  },
  description: "Over Mountain Brewers members",
};

export default async function Page() {
  const members = await getAllMembers();

  return (
    <main className="flex flex-col p-24">
      <H1>Members</H1>
      <section id="members" className="flex flex-row">
        {members.map((member) => (
          <Card key={member.name}>
            {member.picture &&
              SanityImage({
                sanityImageSource: member.picture,
                alt: member.picture.alt,
                imageProps: { className: "rounded-full" },
              })}
            <H2>{member.name}</H2>
          </Card>
        ))}
      </section>
    </main>
  );
}
