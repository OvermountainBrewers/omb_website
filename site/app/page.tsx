"use client";
import Image from "next/image";
import { useWindowSize } from "./hooks/window_size";
import Link from "next/link";

function anchor({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}): JSX.Element {
  return (
    <Link
      href={href}
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    >
      <h2 className="mb-3 text-2xl font-semibold">
        {title}&nbsp;
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
      <p className="m-0 max-w-[30ch] text-sm opacity-50">{description}</p>
    </Link>
  );
}

export default function Page() {
  const size = useWindowSize();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative"
          src="/omb_header.png"
          alt="Over Mountain Brewers logo"
          width={size.width ?? 2000}
          height={size.height ? size.height / 4 : 200}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-3 lg:text-left">
        {anchor({
          href: "/members",
          title: "Members",
          description: "See who's part of the club",
        })}
        {anchor({
          href: "/learn",
          title: "Learn",
          description:
            "Learn from members of the brew club and stay up to date on the latest news",
        })}
        {anchor({
          href: "/events",
          title: "Events",
          description:
            "Become active in the community and join us at our next event",
        })}
        {anchor({
          href: "/meeting-minutes",
          title: "Meeting Minutes",
          description: "Miss the last meeting? Review our latest set of notes",
        })}
        {anchor({
          href: "/resources",
          title: "Resources",
          description:
            "A list of all resources we have available to our members",
        })}
      </div>
    </main>
  );
}
