import { P } from "@/components/typography";
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

export function SectionWrapper({ children }: PropsWithChildren): JSX.Element {
  const hasActivities =
    (Array.isArray(children) && children.length > 0) ||
    (typeof children === "object" && children !== null);

  return (
    <ul
      className={
        hasActivities
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          : "flex flex-row justify-start"
      }
    >
      {hasActivities ? (
        children
      ) : (
        <P>{breakMessages[Math.floor(Math.random() * breakMessages.length)]}</P>
      )}
    </ul>
  );
}
