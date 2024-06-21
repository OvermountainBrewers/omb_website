import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Resources",
  },
  description: "Resources for members",
};

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Resources</h1>
    </main>
  );
}
