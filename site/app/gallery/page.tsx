import { Gallery } from "./Gallery";
import { getGalleryImages } from "@/lib/sanity/sanity.endpoints";

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
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-6">Photo Gallery</h1>
      <Gallery initialImages={images} eventFilters={uniqueEvents} />
    </div>
  );
}
