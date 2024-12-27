'use client';

import { FilterType, useFilterStore } from './store';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

export function ActivityFilter({ className }: { className?: string }) {
    const { filterType, setFilterType } = useFilterStore();

    return (
        <ToggleGroup.Root
            className={`inline-flex mb-6 ${className || ''}`}
            type="single"
            value={filterType}
            onValueChange={(value) => value && setFilterType(value as FilterType)}
        >
            <ToggleGroup.Item
                className="px-4 py-2 rounded-l-md data-[state=on]:bg-primary data-[state=on]:text-primary-foreground bg-secondary hover:bg-secondary/90 border-r border-border"
                value="all"
            >
                All
            </ToggleGroup.Item>
            <ToggleGroup.Item
                className="px-4 py-2 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground bg-secondary hover:bg-secondary/90 border-r border-border"
                value="events"
            >
                Events
            </ToggleGroup.Item>
            <ToggleGroup.Item
                className="px-4 py-2 rounded-r-md data-[state=on]:bg-primary data-[state=on]:text-primary-foreground bg-secondary hover:bg-secondary/90"
                value="brews"
            >
                Recipes
            </ToggleGroup.Item>
        </ToggleGroup.Root>
    );
}