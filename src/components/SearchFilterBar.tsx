import React from 'react';
import { ArrowUpDown, LayoutGrid, Map, RotateCcw } from 'lucide-react';
import { PropertyFilterState } from '../types/property';

interface SearchFilterBarProps {
  filter: PropertyFilterState;
  setFilter: React.Dispatch<React.SetStateAction<PropertyFilterState>>;
  totalMatches: number;
  viewMode: 'grid' | 'map';
  setViewMode: (mode: 'grid' | 'map') => void;
  onReset: () => void;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  filter,
  setFilter,
  totalMatches,
  viewMode,
  setViewMode,
  onReset,
}) => {
  const areas = [
    { value: 'all', label: 'All Dhaka' },
    { value: 'Gulshan', label: 'Gulshan' },
    { value: 'Banani', label: 'Banani' },
    { value: 'Bashundhara', label: 'Bashundhara R/A' },
    { value: 'Dhanmondi', label: 'Dhanmondi' },
    { value: 'Uttara', label: 'Uttara' },
    { value: 'Mirpur DOHS', label: 'Mirpur DOHS' },
  ];

  const bedroomOptions = [
    { value: null, label: 'All Beds' },
    { value: 2, label: '2+ Beds' },
    { value: 3, label: '3+ Beds' },
    { value: 4, label: '4+ Beds' },
  ];

  return (
    <div className="bg-white/90 dark:bg-stone-950/90 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800 sticky top-20 z-30 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Left: Pill-style Area Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 whitespace-nowrap shrink-0">
              Location:
            </span>
            <div className="flex items-center gap-1.5 p-1 bg-gray-100 dark:bg-stone-850 bg-stone-100 dark:bg-stone-800 rounded-xl shrink-0">
              {areas.map((a) => (
                <button
                  key={a.value}
                  onClick={() => setFilter((prev) => ({ ...prev, area: a.value }))}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                    filter.area === a.value
                      ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 font-semibold shadow-xs'
                      : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Pill-style Bedrooms, Sort, View Switch */}
          <div className="flex items-center justify-between lg:justify-end gap-3 flex-wrap">
            {/* Pill-style segmented tab switchers */}
            <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl">
              {bedroomOptions.map((b) => (
                <button
                  key={String(b.value)}
                  onClick={() => setFilter((prev) => ({ ...prev, bedrooms: b.value }))}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                    filter.bedrooms === b.value
                      ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow-xs font-semibold'
                      : 'text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown with soft border radius */}
            <div className="relative flex items-center">
              <label htmlFor="filter-sort-select" className="sr-only">
                Sort properties
              </label>
              <ArrowUpDown className="absolute left-3 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
              <select
                id="filter-sort-select"
                value={filter.sortBy}
                onChange={(e) =>
                  setFilter((prev) => ({
                    ...prev,
                    sortBy: e.target.value as PropertyFilterState['sortBy'],
                  }))
                }
                className="pl-8 pr-7 py-2 text-xs font-semibold bg-stone-50 dark:bg-stone-800 border border-stone-200/90 dark:border-stone-700 rounded-xl text-stone-800 dark:text-stone-200 hover:border-stone-300 dark:hover:border-stone-600 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-stone-100 cursor-pointer appearance-none"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="sft-desc">Size: Largest First</option>
                <option value="newest">Completion: Newest</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 bg-stone-100 dark:bg-stone-800 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
                }`}
                aria-label="Grid view"
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'map'
                    ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
                }`}
                aria-label="Split Map View"
                title="Split Map & Location View"
              >
                <Map className="w-4 h-4" />
              </button>
            </div>

            {/* Reset */}
            {(filter.area !== 'all' ||
              filter.category !== 'all' ||
              filter.bedrooms !== null ||
              filter.searchQuery.trim().length > 0) && (
              <button
                onClick={onReset}
                className="flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 font-semibold px-2.5 py-1.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                title="Clear all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
