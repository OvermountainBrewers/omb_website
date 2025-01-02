import { Metadata } from "next";
import { getPosts } from "@/lib/sanity/sanity.endpoints";
import { H1, H2, P } from "@/components/typography";
import { Card } from "@/components/card";
import Main from "@/components/main";
import Link from "next/link";
import { SanityImage } from "@/components/ui/sanity-image";

export const metadata: Metadata = {
  title: {
    absolute: "Learn | Overmountain Brewers",
  },
  description: "Overmountain Brewers learning resources and blog posts.",
};
export default async function Page() {
  const posts = await getPosts();

  return (
    <Main className="container py-12">
      <div className="space-y-8">
        <H1>Learn</H1>
        <section id="posts" className="flex flex-col gap-6">
          {posts.map((post) => (
            <Card
              key={post._id}
              className="group relative overflow-hidden transition-colors hover:bg-slate-700"
            >
              <Link href={`/learn/${post.slug}`} className="p-6">
                {post.coverImage && (
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <SanityImage
                      image={post.coverImage}
                      imageProps={{
                        className:
                          "aspect-[16/9] object-cover transition-transform duration-300 group-hover:scale-105",
                      }}
                    />
                  </div>
                )}
                <H2 className="border-b-0">{post.title}</H2>
                <P className="text-card-foreground/90">{post.excerpt}</P>
              </Link>
            </Card>
          ))}
        </section>
      </div>
    </Main>
  );
}
