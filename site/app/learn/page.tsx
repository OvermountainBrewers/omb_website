import { Metadata } from "next";
import { getPosts } from "@/lib/sanity/sanity.endpoints";
import { H1, H2, P } from "@/components/typography";
import { Card } from "@/components/card";
import Main from "@/components/main";

export const metadata: Metadata = {
  title: {
    absolute: "Learn",
  },
  description: "Overmountain Brewers learning resources and blog posts.",
};
export default async function Page() {
  const posts = await getPosts();

  return (
    <Main>
      <H1>Learn</H1>
      <section id="posts">
        {posts.map((post) => (
          <Card key={post._id}>
            <H2>{post.title}</H2>
            <P>{post.excerpt}</P>
          </Card>
        ))}
      </section>
    </Main>
  );
}
