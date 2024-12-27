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
    absolute: "Resources",
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
        <ul>
          {links.map((link) => (
            <li key={link._id} className={cardStyle}>
              <H2>{link.name}</H2>
              <Button asChild>
                <Link
                  href={link.url}
                  className="whitespace-break-spaces break-all"
                >
                  {link.url}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </section>
      <Divider />
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
    </Main>
  );
}
