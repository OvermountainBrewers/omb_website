"use server";
import Image, { ImageLoader } from "next/image";
import { Suspense } from "react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityImageUrl } from "../../lib/get_sanity_image";

interface SanityImageProps {
  sanityImageSource?: SanityImageSource;
  alt: string;
  caption?: string;
  imageProps?: JSX.IntrinsicElements["img"];
  figureProps?: JSX.IntrinsicElements["figure"];
  figureCaptionProps?: JSX.IntrinsicElements["figcaption"];
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
  imageProps,
  figureProps,
  figureCaptionProps: initialCaptionProps,
}: SanityImageProps): Promise<JSX.Element | null> {
  if (!sanityImageSource) return null;

  const image = await sanityImageUrl(sanityImageSource);
  const { className: figCaptionClassName, ...figCaptionProps } =
    initialCaptionProps || {};

  return (
    <figure {...figureProps}>
      <Image
        src={image.url()}
        alt={alt}
        {...imageProps}
        width={200}
        height={200}
      />
      {caption && (
        <figcaption
          className={
            "mt-2 text-center italic text-sm text-gray-500 dark:text-gray-400 text-pretty" +
            figCaptionClassName
          }
          {...figCaptionProps}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
