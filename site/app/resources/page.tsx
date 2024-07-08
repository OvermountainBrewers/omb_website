import { Metadata } from "next";
import { getResources } from "@/lib/sanity/sanity.endpoints";
import { cardStyle } from "@/components/card";
import { H1, H2, P } from "@/components/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    absolute: "Resources",
  },
  description: "Resources for members",
};

export default async function Page() {
  const resources = await getResources();

  return (
    <main className="flex flex-col p-4 lg:p-24">
      <H1>Resources</H1>
      <section id="downloads">
        <ul>
          {resources.map((resource) => (
            <li key={resource._id} className={cardStyle}>
              <H2>{resource.name}</H2>
              <P>{resource.description}</P>
              <Button asChild className="mt-12">
                <Link href={`${resource.fileUrl}?dl=`}>Download</Link>
              </Button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
