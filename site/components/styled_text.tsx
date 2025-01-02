import {
  PortableText,
  PortableTextComponentProps,
  PortableTextBlock,
  PortableTextMarkComponentProps,
} from "next-sanity";

interface LinkValue {
  _type: "link";
  href: string;
}

export default async function StyledText({
  value,
  imageBuilder,
}: {
  value: PortableTextBlock[];
  imageBuilder?: (block: PortableTextBlock) => React.ReactNode;
}) {
  return (
    <PortableText
      value={value}
      components={{
        types: {
          image: ({ value }) => imageBuilder?.(value),
        },
        block: {
          h1: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
            <h1>{children}</h1>
          ),
          h2: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
            <h2>{children}</h2>
          ),
          h3: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
            <h3>{children}</h3>
          ),
          normal: ({
            children,
          }: PortableTextComponentProps<PortableTextBlock>) => {
            const isEmpty = Array.isArray(children)
              ? children.every(
                  (child) => typeof child === "string" && child.trim() === "",
                )
              : false;
            return isEmpty ? null : <p>{children}</p>;
          },
          blockquote: ({
            children,
          }: PortableTextComponentProps<PortableTextBlock>) => (
            <blockquote>{children}</blockquote>
          ),
        },
        list: {
          bullet: ({
            children,
          }: PortableTextComponentProps<PortableTextBlock>) => (
            <ul>{children}</ul>
          ),
          number: ({
            children,
          }: PortableTextComponentProps<PortableTextBlock>) => (
            <ol>{children}</ol>
          ),
        },
        listItem: {
          bullet: ({
            children,
          }: PortableTextComponentProps<PortableTextBlock>) => (
            <li>{children}</li>
          ),
          number: ({
            children,
          }: PortableTextComponentProps<PortableTextBlock>) => (
            <li>{children}</li>
          ),
        },
        marks: {
          em: ({ children }: PortableTextMarkComponentProps<LinkValue>) => (
            <em>{children}</em>
          ),
          strong: ({ children }: PortableTextMarkComponentProps<LinkValue>) => (
            <strong>{children}</strong>
          ),
          code: ({ children }: PortableTextMarkComponentProps<LinkValue>) => (
            <code>{children}</code>
          ),
          strike: ({ children }: PortableTextMarkComponentProps<LinkValue>) => (
            <del>{children}</del>
          ),
          link: ({
            children,
            value,
          }: PortableTextMarkComponentProps<LinkValue>) => (
            <a href={value?.href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        },
      }}
    />
  );
}
