import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Events",
  },
  description: "Over Mountain Brewers events",
};

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Events</h1>
    </main>
  );
}
