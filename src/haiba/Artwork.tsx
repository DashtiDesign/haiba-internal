import type { ImgHTMLAttributes } from "react";
import { artwork } from "./artwork";

type ArtworkProps = ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean };

/** Keep the canvas dimensions stable even before the image has downloaded. */
export default function Artwork({ src, priority = false, ...props }: ArtworkProps) {
  const image = src && Object.hasOwn(artwork, src)
    ? artwork[src as keyof typeof artwork]
    : undefined;

  return (
    <img
      width={image?.width}
      height={image?.height}
      decoding="async"
      loading="eager"
      {...props}
      fetchPriority={priority ? "high" : props.fetchPriority}
      src={image?.src ?? src}
    />
  );
}