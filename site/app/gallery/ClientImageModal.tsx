"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SanityImage } from "@/components/ui/sanity-image";
import { GalleryImage } from "@/lib/sanity/sanity.endpoints";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface ClientImageModalProps {
  images: GalleryImage[];
  initialIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ClientImageModal({
  images,
  initialIndex,
  open,
  onOpenChange,
}: ClientImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const next = useCallback(() => {
    setCurrentIndex((current) => (current + 1) % images.length);
  }, [images.length]);

  const previous = useCallback(() => {
    setCurrentIndex((current) => (current - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") previous();
      if (e.key === "Escape") onOpenChange(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, next, previous, onOpenChange]);

  // Reset to initial index when dialog opens
  useEffect(() => {
    if (open) setCurrentIndex(initialIndex);
  }, [initialIndex, open]);

  const image = images[currentIndex];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl w-full h-[90vh] p-0 border-none bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* Close button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </button>

        {/* Image container */}
        {/* Container needs to be relative so the buttons inside can be absolutely positioned 'relative' to it */}
        <div className="relative h-full flex items-center justify-center">
          {/* Navigation buttons */}
          <button
            onClick={previous}
            className="absolute left-4 z-50 rounded-full p-2 bg-background/20 backdrop-blur hover:bg-background/40 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          {/* Image container */}
          <div className="p-8 h-full w-full max-h-[88vh] max-w-[88vw]">
            <SanityImage
              image={image.image}
              isSquare={false}
              figureProps={{
                className: "h-full w-full flex items-center justify-center",
              }}
              imageProps={{
                fill: false,
                className: "!relative h-auto w-auto max-h-full max-w-full",
                width: image.image.metadata?.dimensions?.width,
                height: image.image.metadata?.dimensions?.height,
                sizes: "100vw",
              }}
            />
          </div>

          <button
            onClick={next}
            className="absolute right-4 z-50 rounded-full p-2 bg-background/20 backdrop-blur hover:bg-background/40 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>

        {/* Optional: Image title and date */}
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <h3 className="text-lg font-semibold text-foreground">
            {images[currentIndex].title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {new Date(images[currentIndex].date).toLocaleDateString()}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
