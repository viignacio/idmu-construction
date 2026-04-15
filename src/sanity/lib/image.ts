import createImageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

/**
 * Standard "Monolith" Image Processor
 * Automatically applies grayscale and low-brightness for industrial aesthetic
 */
export function monolithImageUrl(source: any, width = 1200) {
  return urlFor(source).width(width).auto("format").fit("max").blur(0).quality(80).url();
}
