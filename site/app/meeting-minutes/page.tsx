import { ArchiveSection } from "@/components/archive_section";
import { Divider } from "@/components/divider";
import Main from "@/components/main";
import { H1 } from "@/components/typography";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Meeting Minutes",
  },
  description: "Overmountain Brewers meeting minutes",
};

export default async function Page() {
  return (
    <Main>
      <H1>Meeting Minutes</H1>
      <ArchiveSection
        archiveType="meeting minutes"
        url="https://docs.google.com/spreadsheets/d/1pUzcV2MVy1lp9vWkHeAFMb8aHY23q0AjYnTVvUl6Yuk/edit?usp=drive_link"
      />
    </Main>
  );
}
