"use client";

import Image from "next/image";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { ImageBuilderResponse } from "@/lib/get_sanity_image";
import { cn } from "@/lib/utils";

interface SanityImageProps {
  image: ImageBuilderResponse;
  caption?: string;
  imageProps?: Partial<React.ComponentProps<typeof Image>>;
  figureProps?: React.HTMLAttributes<HTMLElement>;
  figureCaptionProps?: React.HTMLAttributes<HTMLElement>;
  isSquare?: boolean;
}

export function SanityImage({
  image,
  caption,
  imageProps,
  figureProps,
  figureCaptionProps,
  isSquare = false,
}: SanityImageProps) {
  if (!image || !image.url) return null;

  const { url, metadata, alt } = image;
  const { width, height } = metadata?.dimensions || {
    width: 0,
    height: 0,
  };
  const {
    className: figureClassName,
    style: figureStyle,
    ...figurePropsRest
  } = figureProps || {};
  const {
    className: imageClassName,
    style: imageStyle,
    ...imagePropsRest
  } = imageProps || {};

  return (
    <figure
      {...figurePropsRest}
      className={cn(
        "relative h-full w-full overflow-hidden",
        isSquare ? "aspect-square" : "",
        figureClassName,
      )}
      style={figureStyle}
    >
      <Image
        src={url}
        alt={alt ?? ""}
        sizes={`(max-width: ${width}px) 100vw, (max-width: ${width * 2}px) 50vw, 33vw`}
        className={cn(
          isSquare ? "object-cover" : "object-contain",
          imageClassName,
        )}
        style={{
          ...(image.ref.hotspot
            ? {
                objectPosition: `${image.ref.hotspot.x * 100}% ${image.ref.hotspot.y * 100}%`,
              }
            : {}),
          ...imageStyle,
        }}
        placeholder="blur"
        blurDataURL={image.metadata!.lqip as string}
        {...(isSquare ? { fill: true } : { width, height })}
        {...imagePropsRest}
      />
      {caption && (
        <figcaption
          className={cn(
            "mt-2 text-center italic text-sm text-muted-foreground",
            figureCaptionProps?.className,
          )}
          {...figureCaptionProps}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
