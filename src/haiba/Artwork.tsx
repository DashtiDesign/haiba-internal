import type { ImgHTMLAttributes } from "react";
import { artwork } from "./artwork";

type ArtworkProps = ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean };

/**
 * Keep the canvas dimensions stable even before the image has downloaded.
 * Mascot stills get the hb-mascot class: the bird is never moved with code (8 Nov). Only real animated loops move.
 */
export default function Artwork({ src, priority = false, className, ...props }: ArtworkProps) {
  const image =
    src && Object.hasOwn(artwork, src) ? artwork[src as keyof typeof artwork] : undefined;

  return (
    <img
      width={image?.width}
      height={image?.height}
      decoding="async"
      loading="eager"
      {...props}
      className={
        src?.startsWith("/haiba/birds/") ? `${className ?? ""} hb-mascot`.trim() : className
      }
      fetchPriority={priority ? "high" : props.fetchPriority}
      src={image?.src ?? src}
    />
  );
}
