import { PortableText, PortableTextComponentProps, PortableTextBlock, PortableTextMarkComponentProps } from "next-sanity";
import { H1, H2 } from "@/components/typography";
import { SanityImage } from "@/components/ui/sanity-image";

interface LinkValue {
    _type: 'link';
    href: string;
}

export default async function StyledText({ value }: { value: PortableTextBlock[] }) {
    return (<PortableText
        value={value}
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
                        alt={value.alt || "Image"} />
                ),
            },
            block: {
                h1: H1,
                h2: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
                    <H2 className="pt-8">{children}</H2>
                ),
                normal: ({ children }: PortableTextComponentProps<PortableTextBlock>) => {
                    const isEmpty = Array.isArray(children)
                        ? children.every(child => typeof child === 'string' && child.trim() === '')
                        : false;

                    return (
                        isEmpty ? null : <p className="pt-6">{children}</p>
                    );
                },
            },
            list: {
                bullet: ({ children }) => (
                    <ul className="mt-8 list-inside list-disc space-y-1">{children}</ul>
                ),
                number: ({ children }) => (
                    <ol className="mt-4 list-inside list-decimal space-y-1">{children}</ol>
                ),
                checkmarks: ({ children }) => (
                    <input
                        type="checkbox"
                        className="appearance-none checked:bg-blue-500 checked:border-transparent checked:outline-none checked:ring-2 checked:ring-blue-500 checked:ring-offset-2 checked:ring-offset-background checked:ring-offset-opacity-50" />
                ),
            },
            marks: {
                em: ({ children }) => (
                    <em className="text-gray-600 font-semibold">{children}</em>
                ),
                strong: ({ children }) => (
                    <strong className="font-bold">{children}</strong>
                ),
                code: ({ children }) => (
                    <code className="px-1.5 py-0.5 rounded bg-gray-100 font-mono text-sm">{children}</code>
                ),
                strike: ({ children }) => (
                    <del className="text-gray-500 line-through">{children}</del>
                ),
                link: ({ children, value, markType }: PortableTextMarkComponentProps<LinkValue>) => {
                    return (
                        <a className="underline" href={value?.href} target="_blank" rel="noopener noreferrer">{children}</a>
                    );
                },
            },
        }} />
    );
}
