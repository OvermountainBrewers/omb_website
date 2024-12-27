import Main from "@/components/main";
import { H1 } from "@/components/typography";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Meeting Minutes",
  },
  description: "Over Mountain Brewers meeting minutes",
};

export default async function Page() {
  return (
    <Main>
      <H1>Meeting Minutes</H1>
    </Main>
  );
}
