import { Metadata } from "next";
import { getMeetingMinutes } from "@/lib/sanity/sanity.endpoints";
import { ArchiveSection } from "@/components/archive_section";
import Main from "@/components/main";
import { H1, H2 } from "@/components/typography";
import { Card } from "@/components/card";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    absolute: "Meeting Minutes | Overmountain Brewers",
  },
  description: "Overmountain Brewers meeting minutes",
};

export default async function Page() {
  const meetingMinutes = await getMeetingMinutes();
  return (
    <Main>
      <div className="space-y-8 mb-8">
        <H1>Meeting Minutes</H1>
        <section id="meeting-minutes" className="flex flex-col gap-6">
          {meetingMinutes.map((meetingMinutesInfo) => (
            <Link
              href={`/meeting-minutes/${meetingMinutesInfo.slug}`}
              key={meetingMinutesInfo._id}
            >
              <Card
                key={`${meetingMinutesInfo._id}_card`}
                className="group relative overflow-hidden transition-colors hover:bg-slate-700 md:p-6"
              >
                <H2 className="border-b-0">{meetingMinutesInfo.title}</H2>
              </Card>
            </Link>
          ))}
        </section>
      </div>
      <ArchiveSection
        archiveType="meeting minutes"
        url="https://docs.google.com/spreadsheets/d/1pUzcV2MVy1lp9vWkHeAFMb8aHY23q0AjYnTVvUl6Yuk/edit?usp=drive_link"
      />
    </Main>
  );
}
