import imageUrlBuilder from "@sanity/image-url";
import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "./sanity/sanity_client";

// Initialize the builder only once.
// This will get reused across function calls.
const builder = imageUrlBuilder(client);

export const sanityImageUrl = async (
  source: SanityImageSource,
): Promise<ImageUrlBuilder> => builder.image(source);
