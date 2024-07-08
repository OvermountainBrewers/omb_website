import { Metadata } from "next";
import { getPosts } from "@/lib/sanity/sanity.endpoints";
import { H1, H2, P } from "@/components/typography";
import { Card } from "@/components/card";

export const metadata: Metadata = {
  title: {
    absolute: "Learn",
  },
  description: "Overmountain Brewers learning resources and blog posts.",
};
export default async function Page() {
  const posts = await getPosts();

  return (
    <main className="flex flex-col p-4 lg:p-24">
      <H1>Learn</H1>
      <section id="posts">
        {posts.map((post) => (
          <Card key={post.slug}>
            <H2>{post.title}</H2>
            <P>{post.excerpt}</P>
          </Card>
        ))}
      </section>
    </main>
  );
}
