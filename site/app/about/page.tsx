import { Metadata } from "next";
import { getAbout as getContent } from "@/lib/sanity/sanity.endpoints";
import { H1 } from "@/components/typography";
import StyledText from "@/components/ui/styledText";



export const metadata: Metadata = {
  title: {
    absolute: "About",
  },
  description: "About Overmountain Brewers",
};

export default async function Page() {
  const content = await getContent();

  return (
    <main className="flex flex-col p-4 lg:p-24">
      <H1>About</H1>
      <section id="about">
        {
          StyledText({ value: content.body })
        }
      </section>
    </main>
  );
}
