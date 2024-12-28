import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import type { GalleryImage } from "./Gallery";

interface ImageGridProps {
    searchQuery: string;
    selectedYear: string;
}

export function ImageGrid({ searchQuery, selectedYear }: ImageGridProps) {
    // Now using GalleryImage type for our data
    const images: GalleryImage[] = [
        {
            id: "1",
            src: "/path/to/image1.jpg",
            alt: "Brew day 2024",
            date: "2024-01-15",
            title: "January Brew Day"
        },
        // ... more images
    ];

    const filteredImages = images.filter(image => {
        const matchesSearch = image.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesYear = selectedYear === "all" || image.date.startsWith(selectedYear);
        return matchesSearch && matchesYear;
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredImages.map((image) => (
                <Dialog key={image.id}>
                    <DialogTrigger asChild>
                        <div className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg bg-card">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-background">
                                    <h3 className="font-semibold">{image.title}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(image.date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl bg-background text-foreground">
                        <div className="relative aspect-video">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="mt-4">
                            <h2 className="text-xl font-semibold text-foreground">
                                {image.title}
                            </h2>
                            <p className="text-muted-foreground">
                                {new Date(image.date).toLocaleDateString()}
                            </p>
                        </div>
                    </DialogContent>
                </Dialog>
            ))}
        </div>
    );
}

export function ImageGridSuspense({ searchQuery, selectedYear }: ImageGridProps) {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-[200px]">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        }>
            <ImageGrid searchQuery={searchQuery} selectedYear={selectedYear} />
        </Suspense>
    );
} 