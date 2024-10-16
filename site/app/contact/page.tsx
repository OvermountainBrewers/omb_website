import { Metadata } from "next";
import { H1, H2, P } from "@/components/typography";
import { Card } from "@/components/card";

export const metadata: Metadata = {
  title: {
    absolute: "Contact",
  },
  description: "Contact Overmountain Brewers",
};
export default async function Page() {
  return (
    <main className="flex flex-col p-4 lg:p-24">
      <H1>Contact</H1>
      <section id="contact">
        {
          <Card key={"contact-us"}>
            <H2>{"Under Construction"}</H2>
            <P>{"Check Back Soon!"}</P>
          </Card>
        }
      </section>
    </main>
  );
}
