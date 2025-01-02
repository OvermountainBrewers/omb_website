import { notFound } from "next/navigation";
import { SanityImage } from "@/components/ui/sanity-image";
import StyledText from "@/components/styled_text";
import { getPostBySlug, getPostSlugs } from "@/lib/sanity/sanity.endpoints";
import { isSanityMetaAltImageWithRef } from "@/lib/sanity/sanity.type_guards";
import { StyledArticle } from "@/components/styled_article";
import Main from "@/components/main";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

/// This is the entrypoint for the dynamic route of [slug]
/// NextJS provides the params object, which contains the slug
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // Handle common user URL mistakes
  const sanitizedSlug = params.slug
    .replace(/\/+/g, "/")
    .replace(/^\/|\/$/g, "");

  const post = await getPostBySlug(sanitizedSlug);

  if (!post) {
    notFound();
  }

  const { contentImages, content, title, coverImage, author, date } = post;

  return (
    <Main>
      <StyledArticle>
        <header className="mb-8 space-y-4">
          <h1 className="m-0">{title}</h1>
          <div className="flex items-center gap-x-4 text-sm not-prose text-muted-foreground">
            {author?.name && <span>By {author.name}</span>}
            {date && (
              <>
                <span>•</span>
                <time dateTime={date}>
                  {new Date(date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </>
            )}
          </div>
        </header>

        {coverImage && (
          <figure className="my-8">
            <SanityImage
              image={coverImage}
              imageProps={{
                className: "aspect-[2/1] object-cover rounded-lg",
              }}
            />
          </figure>
        )}

        {content &&
          StyledText({
            value: content,
            imageBuilder: (block) => {
              if (
                contentImages &&
                Object.keys(contentImages).length > 0 &&
                "asset" in block &&
                isSanityMetaAltImageWithRef(block.asset)
              ) {
                const image = contentImages[block.asset.ref.asset._ref];
                if (image)
                  return (
                    <figure className="my-8">
                      <SanityImage
                        image={image}
                        imageProps={{
                          className: "rounded-lg",
                        }}
                      />
                    </figure>
                  );
              }
              return null;
            },
          })}
      </StyledArticle>
    </Main>
  );
}

// Used by Next.js at build time to determine which pages to statically pre-render.
// This improves performance and SEO by generating HTML files for each blog post
// instead of rendering them on-demand.
//
// The function should return an array of objects, where each object has a `slug` property.
export const generateStaticParams = getPostSlugs;
