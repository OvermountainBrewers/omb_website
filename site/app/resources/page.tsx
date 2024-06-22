import { Metadata } from "next";
import { getResources } from "../server/sanity/sanity.endpoints";

export const metadata: Metadata = {
  title: {
    absolute: "Resources",
  },
  description: "Resources for members",
};

export default async function Page() {
  const resources = await getResources();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Resources</h1>
      <section>
        <ul>
          {resources.map((resource) => (
            <li key={resource._id}>
              <h2>{resource.name}</h2>
              <p>{resource.description}</p>
              <a href={`${resource.fileUrl}?dl=`}>Download</a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
