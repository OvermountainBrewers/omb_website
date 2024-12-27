'use client';

import { create } from 'zustand';

export type FilterType = "all" | "events" | "brews";

interface FilterState {
    filterType: FilterType;
    setFilterType: (type: FilterType) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
    filterType: "all",
    setFilterType: (type) => set({ filterType: type }),
}));