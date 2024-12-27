import { Metadata } from "next";
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
  return (
    <Main>
      <H1>Gallery</H1>
      <section id="gallery">
        {
          <Card key={"gallery"}>
            <H2>{"Under Construction"}</H2>
            <P>{"Check Back Soon!"}</P>
          </Card>
        }
      </section>
    </Main>
  );
}
