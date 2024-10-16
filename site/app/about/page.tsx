import { Metadata } from "next";
import { getAbout as getContent } from "@/lib/sanity/sanity.endpoints";
import { H1, H2, P } from "@/components/typography";
import { PortableText } from "next-sanity";
import { SanityImage } from "@/components/ui/sanity-image";
import style from "./about.module.css";

export const metadata: Metadata = {
  title: {
    absolute: "About",
  },
  description: "About Overmountain Brewers",
};

export default async function Page() {
  const content = await getContent();

  return (
    <main className="flex flex-col p-4 lg:p-24">
      <H1>About</H1>
      <section id="about">
        {
          <PortableText
            value={content.body}
            onMissingComponent={(type) => {
              console.error(`No component for type "${type}"`);
              return null;
            }}
            components={{
              unknownType: (value) => (
                <p>
                  {`A component for the type "${value.value._type}" has not been created.`}
                </p>
              ),
              unknownBlockStyle: (value) => (
                <p>
                  {`A block style for the style "${value.value.style}" has not been created.`}
                </p>
              ),
              unknownMark: (value) => (
                <p>
                  {`A mark for the mark type "${value.value._type}" has not been created.`}
                </p>
              ),
              unknownList: (value) => (
                <p>
                  {`A list for the list style "${value.value.mode}" has not been created.`}
                </p>
              ),
              unknownListItem: (value) => (
                <p>
                  {`A list item for the list item style "${value.value.style}" has not been created.`}
                </p>
              ),
              types: {
                image: ({ value }) => (
                  <SanityImage
                    sanityImageSource={value.asset.url}
                    alt={value.alt || "Image"}
                  />
                ),
              },
              block: {
                h1: H1,
                h2: H2,
                p: ({ children }) => <p className="my-12">{children}</p>,
              },
              list: {
                bullet: ({ children }) => (
                  <ul className="mt-xl list-inside list-disc">{children}</ul>
                ),
                number: ({ children }) => (
                  <ol className="mt-lg list-inside list-decimal">{children}</ol>
                ),
                checkmarks: ({ children }) => (
                  <input
                    type="checkbox"
                    className="appearance-none checked:bg-blue-500 checked:border-transparent checked:outline-none checked:ring-2 checked:ring-blue-500 checked:ring-offset-2 checked:ring-offset-background checked:ring-offset-opacity-50"
                  />
                ),
              },
              marks: {
                em: ({ children }) => (
                  <em className="text-gray-600 font-semibold">{children}</em>
                ),
                link: ({ value, children }) => {
                  const target = (value?.href || "").startsWith("http")
                    ? "_blank"
                    : undefined;
                  return (
                    <a
                      href={value?.href}
                      target={target}
                      rel={target === "_blank" ? "noindex nofollow" : ""}
                    >
                      {children}
                    </a>
                  );
                },
              },
            }}
          />
        }
      </section>
    </main>
  );
}
