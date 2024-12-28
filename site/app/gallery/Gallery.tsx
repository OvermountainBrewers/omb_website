"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar, Search } from "lucide-react";
import { ImageGrid } from "./ImageGrid";

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  date: string;
  title: string;
};

export function Gallery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("all");

  // Get years from current year back to 2011
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2011 + 1 }, (_, i) =>
    String(currentYear - i),
  );

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted h-4 w-4" />
          <Input
            placeholder="Search images..."
            className="pl-10 bg-background text-foreground border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[180px] bg-background border-border">
            <Calendar className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by year" />
          </SelectTrigger>
          <SelectContent className="bg-background border-border">
            <SelectItem value="all">All Years</SelectItem>
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <ImageGrid searchQuery={searchQuery} selectedYear={selectedYear} />
    </div>
  );
}
