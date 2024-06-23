"use server";
import Image, { ImageLoader } from "next/image";
import { Suspense } from "react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityImageUrl } from "../../lib/get_sanity_image";

interface SanityImageProps {
  sanityImageSource?: SanityImageSource;
  alt: string;
  caption?: string;
}

export const SanityImage = (props: SanityImageProps) => (
  <Suspense fallback={<div>Loading...</div>}>
    <SanityImageAsync {...props} />
  </Suspense>
);

async function SanityImageAsync({
  sanityImageSource,
  alt,
  caption,
}: SanityImageProps): Promise<JSX.Element | null> {
  if (!sanityImageSource) return null;

  const image = await sanityImageUrl(sanityImageSource);

  return (
    <figure>
      <Image src={image.url()} alt={alt} width={200} height={200} />
      {caption && (
        <figcaption className="mt-2 text-center italic text-sm text-gray-500 dark:text-gray-400 text-pretty">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
