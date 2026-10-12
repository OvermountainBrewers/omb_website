import { Metadata } from "next";
import Link from "next/link";
import Main from "@/components/main";
import { H1, P } from "@/components/typography";

export const metadata: Metadata = {
  title: {
    absolute: "Page Not Found | Overmountain Brewers",
  },
};

// Without this file Next renders its built-in 404, whose inline styles fight
// the site theme: under Tailwind 3 its black text sat on our dark background
// (invisible), and under Tailwind 4's cascade layers its white body wins.
export default function NotFound() {
  return (
    <Main>
      <H1>Page not found</H1>
      <P>
        We couldn&apos;t find that page. It may have moved, or the link may be
        mistyped.
      </P>
      <P>
        <Link className="underline" href="/">
          Head back home
        </Link>
      </P>
    </Main>
  );
}
