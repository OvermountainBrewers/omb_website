import { H1, H2, P } from "@/components/typography";
import { SanityImage } from "@/components/ui/sanity-image";
import {
  getAllMeetingMinutes,
  getAllMembers,
} from "@/lib/sanity/sanity.endpoints";
import { Metadata } from "next";
import { PortableText, PortableTextComponents } from "next-sanity";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    absolute: "Meeting Minutes",
  },
  description: "Over Mountain Brewers meeting minutes",
};

export default async function Page() {
  // Define the value type for image rendering
  interface ImageValue {
    asset: {
      url: string;
    };
    alt?: string;
  }

  // Define the value type for links
  interface LinkValue {
    href: string;
  }

  // Define custom components for different block types
  const customComponents: PortableTextComponents = {
    types: {
      image: ({ value }: { value: ImageValue }) => (
        <SanityImage
          sanityImageSource={value.asset.url}
          alt={value.alt || "Image"}
        />
      ),
    },
    block: {
      h1: ({ children }: { children?: ReactNode }) => <H1>{children}</H1>,
      h2: ({ children }: { children?: ReactNode }) => <H2>{children}</H2>,
      normal: ({ children }: { children?: ReactNode }) => <P>{children}</P>,
    },
    marks: {
      link: ({
        children,
        value,
      }: {
        children?: ReactNode;
        value?: LinkValue;
      }) => {
        const rel = !value?.href.startsWith("/")
          ? "noreferrer noopener"
          : undefined;
        return (
          value && (
            <a href={value.href} rel={rel}>
              {children}
            </a>
          )
        );
      },
    },
  };
  const minutes = await getAllMeetingMinutes();

  return (
    <main className="flex flex-col p-4 lg:p-24">
      <H1>Meeting Minutes</H1>
      <section id="members" className="">
        {minutes
          .sort((a, b) => (a.meetingDate < b.meetingDate ? -1 : 1))
          .map((meeting) => (
            <PortableText
              key={meeting.meetingDate}
              value={meeting.postMeetingSummary!}
              components={customComponents}
            />
          ))}
      </section>
    </main>
  );
}
