"use client";

import { useState } from "react";
import { SanityImage } from "@/components/ui/sanity-image";
import { ClientImageModal } from "./ClientImageModal";
import { GalleryImage } from "@/lib/sanity/sanity.endpoints";

interface ImageGridProps {
  images: GalleryImage[];
}

export function ImageGrid({ images }: ImageGridProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {images.map((image, index) => (
          <div
            key={image._id}
            className="group relative overflow-hidden rounded-lg bg-card transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer"
            onClick={() => setSelectedImageIndex(index)}
          >
            <SanityImage image={image.image} isSquare />

            {/* Overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="font-semibold text-lg mb-1 text-card-foreground">
                {image.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {new Date(image.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      <ClientImageModal
        images={images}
        initialIndex={selectedImageIndex ?? 0}
        open={selectedImageIndex !== null}
        onOpenChange={(open) => !open && setSelectedImageIndex(null)}
      />
    </>
  );
}
