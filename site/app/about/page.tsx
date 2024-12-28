import { Metadata } from "next";
import { getAbout as getContent } from "@/lib/sanity/sanity.endpoints";
import { H1 } from "@/components/typography";
import StyledText from "@/components/ui/styledText";
import Main from "@/components/main";

export const metadata: Metadata = {
  title: {
    absolute: "About",
  },
  description: "About Overmountain Brewers",
};

export default async function Page() {
  const content = await getContent();

  return (
    <Main>
      <H1>About</H1>
      <section id="about">{StyledText({ value: content.body })}</section>
    </Main>
  );
}
