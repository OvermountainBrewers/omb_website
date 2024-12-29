import Main from "@/components/main";
import Home from "./home";
import { Metadata } from "next";
import { NextEventBanner } from "@/components/next_event_banner";

export const metadata: Metadata = {
  title: {
    absolute: "Over Mountain Brew Club",
  },
  description:
    "A community of passionate home brewers based in Abingdon, VA serving the Tri-Cities area. We meet monthly to share brews, knowledge, and participate in local events throughout Southwest Virginia.",
};

export default function Page() {
  return (
    <Main className="items-center justify-between lg:p-24 space-y-12 lg:space-y-24">
      <NextEventBanner />
      <Home />
    </Main>
  );
}
