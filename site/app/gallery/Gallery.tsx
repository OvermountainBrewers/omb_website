"use client";

import { GalleryImage } from "@/lib/sanity/sanity.endpoints";
import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { ImageGrid } from "./ImageGrid";
import { cn } from "@/lib/utils";

export function Gallery({
  initialImages,
  eventFilters,
}: {
  initialImages: GalleryImage[];
  eventFilters: string[];
}) {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const [hideLeftMask, setHideLeftMask] = useState(true);
  const [hideRightMask, setHideRightMask] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scrollContainerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      const checkScroll = () => {
        const hasHorizontalOverflow = node.scrollWidth > node.clientWidth;

        if (!hasHorizontalOverflow) {
          setHideLeftMask(true);
          setHideRightMask(true);
          return;
        }

        const isAtEnd =
          node.scrollLeft >= node.scrollWidth - node.clientWidth - 1;
        const isAtStart = node.scrollLeft <= 0;

        setHideLeftMask(isAtStart);
        setHideRightMask(isAtEnd);
      };

      const handleMouseDown = (e: MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX - node.offsetLeft);
        setScrollLeft(node.scrollLeft);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - node.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast factor
        node.scrollLeft = scrollLeft - walk;
      };

      const handleMouseLeave = () => {
        setIsDragging(false);
      };

      checkScroll();
      node.addEventListener("scroll", checkScroll);
      node.addEventListener("mousedown", handleMouseDown);
      node.addEventListener("mousemove", handleMouseMove);
      node.addEventListener("mouseup", handleMouseUp);
      node.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("resize", checkScroll);

      return () => {
        node.removeEventListener("scroll", checkScroll);
        node.removeEventListener("mousedown", handleMouseDown);
        node.removeEventListener("mousemove", handleMouseMove);
        node.removeEventListener("mouseup", handleMouseUp);
        node.removeEventListener("mouseleave", handleMouseLeave);
        window.removeEventListener("resize", checkScroll);
      };
    },
    [isDragging, startX, scrollLeft],
  );

  const filteredImages = useMemo(() => {
    if (activeFilters.size === 0) return initialImages;
    return initialImages.filter(
      (img) => img.event && activeFilters.has(img.event),
    );
  }, [initialImages, activeFilters]);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => {
      const newFilters = new Set(prev);
      if (newFilters.has(filter)) {
        newFilters.delete(filter);
      } else {
        newFilters.add(filter);
      }
      return newFilters;
    });
  };

  return (
    <div>
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className={cn(
            "overflow-x-auto scrollbar-none pb-2 mb-6",
            !hideLeftMask && !hideRightMask
              ? "mask-fade-edges"
              : !hideLeftMask
                ? "mask-fade-left"
                : !hideRightMask
                  ? "mask-fade-right"
                  : "",
            isDragging ? "cursor-grabbing select-none" : "cursor-grab",
          )}
          role="tablist"
          aria-label="Event filters"
        >
          <div className="flex gap-2 px-1">
            {eventFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => toggleFilter(filter)}
                role="tab"
                aria-selected={activeFilters.has(filter)}
                className={`
                  whitespace-nowrap px-4 py-2 rounded-full text-sm
                  transition-colors duration-200
                  ${
                    activeFilters.has(filter)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80"
                  }
                `}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ImageGrid images={filteredImages} />
    </div>
  );
}
