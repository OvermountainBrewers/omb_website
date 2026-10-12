import { h1Style, H2, P } from "@/components/typography";
import { PropsWithChildren } from "react";

const breakMessages = [
  "Fermenting new ideas 🍺",
  "Cleaning our carboys 🧼",
  "Waiting for the yeast to wake up ⏰",
  "Stuck in a mash tun, send help! 🆘",
  "Gone grain shopping 🌾",
  "Testing samples... extensively 🍻",
  "Calculating IBUs in our sleep 🧮",
  "Debating hops vs. malt... again 🤔",
  "Calibrating our hydrometers... with beer 📏",
  "Teaching our pets to brew (not going well) 🐕",
  "Organizing our hop collection alphabetically 🌿",
  "Writing tasting notes in beer-speak 📝",
  "Converting recipes to metric... and back 📊",
  "Explaining to visitors why we have so many buckets 🪣",
  "Naming our fermenters after famous brewers 🏺",
  "Practicing our pour technique 🍺",
  "Researching historical brewing methods 📚",
  "Cleaning. Always cleaning. Forever cleaning. 🧹",
  "Trying to decode our old brewing notes 🤯",
  "Building the perfect brew station (v3.0) 🛠️",
];

// Picks a stable message per section. This renders in a client component on a
// prerendered page, so Math.random() chose one message on the server and a
// different one in the browser, which React reports as a hydration mismatch.
function breakMessageFor(sectionId: string): string {
  let hash = 0;
  for (const char of sectionId) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return breakMessages[hash % breakMessages.length];
}

export interface SectionWrapperProps {
  id: string;
  title: string;
  emptyMessage?: React.ReactNode;
}

export function SectionWrapper({
  children,
  id,
  title,
  emptyMessage,
}: PropsWithChildren<SectionWrapperProps>): React.JSX.Element {
  const hasActivities = Array.isArray(children) && children.length > 0;

  return (
    <section id={id}>
      <H2 className={h1Style}>{title}</H2>
      {hasActivities ? (
        <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}>
          {children}
        </div>
      ) : (
        emptyMessage || (
          <P className="flex flex-row justify-start">{breakMessageFor(id)}</P>
        )
      )}
    </section>
  );
}
