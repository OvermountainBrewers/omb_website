import { Metadata } from "next";
import { H1, H2, P } from "@/components/typography";
import { Card } from "@/components/card";
import Main from "@/components/main";

export const metadata: Metadata = {
  title: {
    absolute: "Contact",
  },
  description: "Contact Overmountain Brewers",
};
export default async function Page() {
  return (
    <Main>
      <H1>Contact</H1>
      <section id="contact">
        {
          <Card key={"contact-us"}>
            <H2>{"Under Construction"}</H2>
            <P>{"Check Back Soon!"}</P>
          </Card>
        }
      </section>
    </Main>
  );
}
