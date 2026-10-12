import { Metadata } from "next";
import { getResources } from "@/lib/sanity/sanity.endpoints";
import { cardStyle } from "@/components/card";
import { H1, H2, P } from "@/components/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Divider } from "@/components/divider";
import Main from "@/components/main";

export const metadata: Metadata = {
  title: {
    absolute: "Resources | Overmountain Brewers",
  },
  description: "Resources for members",
};

export default async function Page() {
  const maybeResources = await getResources();

  if (maybeResources === undefined) {
    return <P>We don&apos;t have any resources available!</P>;
  }

  const { links, resources } = maybeResources;

  return (
    <Main>
      <H1>Links</H1>
      <section id="links">
        <ul className="[&>li+li]:mt-4 [&>li+li]:mb-0 md:[&>li+li]:mt-8">
          {links.map((link) => (
            <li key={link._id} className={cardStyle}>
              <H2>{link.name}</H2>
              {/* Wrapping classes go on Button, not Link: Slot concatenates
                  the two class lists without tailwind-merge, so Tailwind 4's
                  utility order let the button's whitespace-nowrap win and long
                  URLs overflowed the page on mobile. */}
              <Button asChild className="whitespace-break-spaces break-all">
                <Link href={link.url}>{link.url}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </section>
      <Divider />
      <H1>Resources</H1>
      <section id="downloads">
        <ul className="[&>li+li]:mt-4 [&>li+li]:mb-0 md:[&>li+li]:mt-8">
          {resources.map((resource) => (
            <li key={resource._id} className={cardStyle}>
              <H2>{resource.name}</H2>
              <P>{resource.description}</P>
              <Button asChild className="mt-4 md:mt-8">
                <Link href={`${resource.fileUrl}?dl=`}>Download</Link>
              </Button>
            </li>
          ))}
        </ul>
      </section>
    </Main>
  );
}
