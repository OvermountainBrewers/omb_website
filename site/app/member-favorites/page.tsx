import { Metadata } from "next";
import { getPosts as getContent } from "@/lib/sanity/sanity.endpoints";
import { H1, H2, P } from "@/components/typography";
import { Card } from "@/components/card";
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
      <H1>Member Favorites</H1>
      <section id="member-favorites">
        {
          <Card key={"member-favorites"}>
            <H2>{"Under Construction"}</H2>
            <P>{"Check Back Soon!"}</P>
          </Card>
        }
      </section>
    </Main>
  );
}
