import { Metadata } from "next";
import { getPostData } from "./get_post_data";

export const metadata: Metadata = {
  title: {
    absolute: "Learn",
  },
  description: "Overmountain Brewers learning resources and blog posts.",
};
export default async function Page() {
  const { posts } = await getPostData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Learn</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.slug} className="flex flex-col items-center">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p>{post.excerpt}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
