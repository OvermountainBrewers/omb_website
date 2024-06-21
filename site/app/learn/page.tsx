import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Learn",
  },
  description: "Overmountain Brewers learning resources and blog posts.",
};
export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Learn</h1>
    </main>
  );
}
