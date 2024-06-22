import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Meeting Minutes",
  },
  description: "Over Mountain Brewers meeting minutes",
};

export default async function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Meeting Minutes</h1>
    </main>
  );
}
