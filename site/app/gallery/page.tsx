import Main from "@/components/main";
import { Gallery } from "./Gallery";
import { getGalleryImages } from "@/lib/sanity/sanity.endpoints";
import { H1 } from "@/components/typography";

export const metadata = {
  title: {
    absolute: "Gallery | Overmountain Brewers",
  },
  description:
    "Browse photos from our brewery events, tastings, and community gatherings.",
};

export default async function Page() {
  const images = await getGalleryImages();

  const uniqueEvents = [...new Set(images.map((image) => image.event))];

  return (
    <Main className="container">
      <H1>Photo Gallery</H1>
      <Gallery initialImages={images} eventFilters={uniqueEvents} />
    </Main>
  );
}
