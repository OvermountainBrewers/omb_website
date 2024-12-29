"use client";
import Image from "next/image";
import { useWindowSize } from "../lib/window_size";
import Link from "next/link";
import { H4, P } from "@/components/typography";

function Anchor({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}): JSX.Element {
  function GTSymbol(): JSX.Element {
    return (
      <span className="group-hover:ml-2 transition-all whitespace-nowrap">
        &nbsp;&nbsp;-&gt;
      </span>
    );
  }

  return (
    <Link
      href={href}
      className="flex flex-col p-4 bg-slate-800 hover:bg-slate-700 m-2 rounded-xl group"
    >
      <H4>
        {title}
        <GTSymbol />
      </H4>
      <P>{description}</P>
    </Link>
  );
}

export default function Home() {
  const size = useWindowSize();

  return (
    <>
      <div className="relative flex h-[200px]">
        <Image
          className="relative"
          src="/omb_header.svg"
          alt="Overmountain Brewers logo"
          width={size.width ?? 2000}
          height={size.height ?? 200}
          priority
        />
      </div>
      <section
        id="links"
        className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-3 lg:text-left"
      >
        {Anchor({
          href: "/members",
          title: "Members",
          description: "See who's part of the club",
        })}
        {Anchor({
          href: "/learn",
          title: "Learn",
          description:
            "Learn from members of the brew club and stay up to date on the latest news",
        })}
        {Anchor({
          href: "/activities",
          title: "Activities",
          description:
            "Become active in the community and join us at our next event or see we're up to",
        })}
        {Anchor({
          href: "/meeting-minutes",
          title: "Meeting Minutes",
          description: "Miss the last meeting? Review our latest set of notes",
        })}
        {Anchor({
          href: "/resources",
          title: "Resources",
          description:
            "A list of all resources we have available to our members",
        })}
        {Anchor({
          href: "/about",
          title: "About",
          description: "Learn more about Overmountain Brewers and our mission",
        })}
      </section>
    </>
  );
}
