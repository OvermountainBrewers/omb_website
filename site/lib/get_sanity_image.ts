import imageUrlBuilder from "@sanity/image-url";
import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";

import { client } from "./sanity/sanity_client";
import { SanityMetaAltImage } from "../lib/sanity/sanity.types";
import { ImageDimensions, ImageMetadata, ImagePalette } from "@sanity/types";

interface ImageBuilderMetadataDimensions extends ImageDimensions {
  shortestSide: number;
}

interface ImageBuilderMetadata extends Omit<ImageMetadata, "dimensions"> {
  dimensions?: ImageBuilderMetadataDimensions;
  palette?: ImagePalette; // explicitly declare it even though it exists in ImageMetadata
}

export interface ImageBuilderResponse
  extends Omit<SanityMetaAltImage, "metadata"> {
  url: string;
  metadata?: ImageBuilderMetadata;
}

// Initialize the builder only once.
// This will get reused across function calls.
const builder = imageUrlBuilder(client);

const sanityImageUrl = (image: SanityMetaAltImage): ImageUrlBuilder =>
  builder.image(image.ref);

export const buildImageWithHotspot = (
  image: SanityMetaAltImage,
  {
    width,
    height,
  }: {
    width?: number;
    height?: number;
  } = {},
): ImageBuilderResponse | undefined => {
  if (!image || !image.ref) return undefined;
  const imageBuilder = sanityImageUrl(image);
  const metadata = image.metadata;
  const dimensions = metadata?.dimensions;

  const url = imageBuilder
    .width(width ?? dimensions?.width ?? 1200)
    .height(height ?? dimensions?.height ?? 1200)
    // bg: only used for some of the fit options.
    .bg((metadata?.palette?.darkMuted?.background ?? "000000").replace("#", ""))
    // Affects how the image is handled when you specify target dimensions.
    // clip: The image is resized to fit within the bounds you specified without cropping or distorting the image.
    // crop: Crops the image to fill the size you specified when you specify both w and h
    // fill: Like clip, but any free area not covered by your image is filled with the color specified in the bg parameter.
    // fillmax: Places the image within box you specify, never scaling the image up. If there is excess room in the image, it is filled with the color specified in the bg parameter.
    // max: Fit the image within the box you specify, but never scaling the image up.
    // scale: Scales the image to fit the constraining dimensions exactly. The resulting image will fill the dimensions, and will not maintain the aspect ratio of the input image.
    // min: Resizes and crops the image to match the aspect ratio of the requested width and height. Will not exceed the original width and height of the image.
    // See: https://www.sanity.io/docs/image-urls#fit-45b29dc6f09f
    .fit("clip")
    .url();

  return {
    ...image,
    url,
    metadata: {
      ...metadata,
      dimensions: {
        ...dimensions,
        shortestSide: Math.min(
          dimensions?.width ?? 1200,
          dimensions?.height ?? 1200,
        ),
      },
    },
  };
};
