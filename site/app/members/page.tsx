import { Metadata } from "next";
import { getAllMembers, Member } from "@/lib/sanity/sanity.endpoints";
import { H1 } from "@/components/typography";
import { H2 } from "@/components/typography";
import { Card } from "@/components/card";
import { User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Large } from "@/components/large";
import Main from "@/components/main";
import { SanityImage } from "@/components/ui/sanity-image";

export const metadata: Metadata = {
  title: {
    absolute: "Members | Overmountain Brewers",
  },
  description: "Overmountain Brewers members",
};

export default async function Page() {
  const members = await getAllMembers();
  const sortedMembers = [...members].sort((a, b) => {
    if (a.officerPosition && b.officerPosition) {
      const officerOrder = [
        "president",
        "vice president",
        "treasurer",
        "secretary",
        "membership director",
        "technologist",
      ];
      const aIndex = officerOrder.indexOf(a.officerPosition.toLowerCase());
      const bIndex = officerOrder.indexOf(b.officerPosition.toLowerCase());
      return aIndex < bIndex ? -1 : 1;
    } else if (a.officerPosition && !b.officerPosition) {
      return -1;
    } else if (!a.officerPosition && b.officerPosition) {
      return 1;
    }

    return 0;
  });

  return (
    <Main>
      <H1>Members</H1>
      <section
        id="members"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {sortedMembers
          .sort((a, b) => {
            if (!a.officerPosition && !b.officerPosition) {
              return a.name < b.name ? -1 : 1;
            }
            return 0;
          })
          .map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
      </section>
    </Main>
  );
}

function convertBadgeToTitle(badge: string) {
  switch (badge) {
    case "bjcpCertified":
      return "BJCP Certified";
    case "homebrewer":
      return "Homebrewer";
    case "brewEnthusiast":
      return "Brew Enthusiast";
    default:
      return badge;
  }
}

function MemberCard({ member }: { member: Member }) {
  return (
    <Card key={member.name}>
      {member.picture?.url ? (
        <SanityImage
          {...{
            figureProps: {
              className: "w-[200px] h-[200px]",
            },
            image: member.picture,
            imageProps: {
              className: "rounded-full",
              unoptimized: true,
            },
            isSquare: true,
          }}
        />
      ) : (
        <div className="w-[200px] h-[200px] flex items-center justify-center">
          <User className="w-[150px] h-[150px]" />
        </div>
      )}
      <H2 className="text-center mt-4">{member.name}</H2>
      {member.officerPosition && (
        <Large className="text-center" text={member.officerPosition} />
      )}
      <hr className="my-4 border-t-2 border-gray-300 h-2 w-full" />
      {member.favoriteBrew && (
        <p className="text-center mb-2">
          Preferred Brew: {member.favoriteBrew}
        </p>
      )}
      {member.badges && (
        <section className="flex flex-wrap justify-center">
          {member.badges.map((badge) => (
            <Badge key={badge} variant={badge} className="mr-1 mt-1">
              {convertBadgeToTitle(badge)}
            </Badge>
          ))}
        </section>
      )}
    </Card>
  );
}
