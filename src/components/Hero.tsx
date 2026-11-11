import React from 'react';
import { Search, MapPin, Building, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { ListingType } from '../types/property';
import heroImage from '../assets/images/hero_dhaka_luxury_apartment_1794372878497.jpg';
interface HeroProps {
  listingType: ListingType;
  setListingType: (type: ListingType) => void;
  selectedArea: string;
  setSelectedArea: (area: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSearchSubmit: () => void;
  totalListingsCount: number;
  onOpenGuarantee: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  listingType,
  setListingType,
  selectedArea,
  setSelectedArea,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  totalListingsCount,
  onOpenGuarantee,
}) => {
  const areas = [
    { value: 'all', label: 'All Prime Dhaka' },
    { value: 'Gulshan', label: 'Gulshan 1 & 2' },
    { value: 'Banani', label: 'Banani' },
    { value: 'Bashundhara', label: 'Bashundhara R/A' },
    { value: 'Dhanmondi', label: 'Dhanmondi' },
    { value: 'Uttara', label: 'Uttara' },
    { value: 'Mirpur DOHS', label: 'Mirpur DOHS' },
  ];

  const categories = [
    { value: 'all', label: 'All Property Types' },
    { value: 'Apartment', label: 'Luxury Apartment' },
    { value: 'Penthouse', label: 'Sky Penthouse' },
    { value: 'Duplex', label: 'Modern Duplex' },
    { value: 'Commercial Space', label: 'Corporate Office' },
  ];

  return (
    <section className="relative bg-stone-950 text-white overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Background Architectural Imagery - Highly Visible with Soft Balancing Scrim */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Modern luxury residential architecture in Dhaka"
          className="w-full h-full object-cover opacity-85 scale-102 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Balanced subtle gradient that preserves architecture visibility while keeping text crisp */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/45 via-stone-950/30 to-stone-950/80" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Subtle Warm Pill Badge (Centered) */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-950/60 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-300 tracking-wide mb-5 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>100% TITLE VETTED · PRIME DHAKA INVENTORY</span>
        </div>

        {/* Hero Heading: Extra-bold display text centered with soft drop-shadow */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.1] mb-4 text-balance max-w-3xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          Discover Verified Luxury Properties in Dhaka
        </h1>

        {/* Shorter Subheading: Crisp, punchy, minimal with text shadow */}
        <p className="text-base sm:text-lg font-medium text-stone-100 max-w-xl leading-relaxed mb-8 sm:mb-10 text-balance drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
          Curated luxury apartments, penthouses, and commercial spaces across Gulshan, Banani, and Bashundhara.
        </p>

        {/* Centered Search Option Card */}
        <div className="w-full max-w-4xl mx-auto bg-white/95 dark:bg-stone-900/95 backdrop-blur-md shadow-2xl rounded-2xl border border-white/30 dark:border-stone-800 p-4 sm:p-6 lg:p-7 text-stone-900 dark:text-stone-100 transition-all text-left">
          {/* Centered Pill-style segmented tab switcher */}
          <div className="flex items-center justify-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl w-fit mx-auto mb-6">
            <button
              onClick={() => setListingType('buy')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                listingType === 'buy'
                  ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Buy Property
            </button>
            <button
              onClick={() => setListingType('rent')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                listingType === 'rent'
                  ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Rent Apartment
            </button>
            <button
              onClick={() => setListingType('commercial')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                listingType === 'commercial'
                  ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Commercial Space
            </button>
          </div>

          {/* Clean, intuitive search input fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-end">
            {/* Location selector */}
            <div className="space-y-1.5">
              <label htmlFor="hero-location-select" className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                Neighborhood
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                <select
                  id="hero-location-select"
                  aria-label="Select Neighborhood"
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 bg-stone-50 dark:bg-stone-800 border border-stone-200/90 dark:border-stone-700 rounded-xl text-sm text-stone-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-100 transition-all appearance-none cursor-pointer"
                >
                  {areas.map((a) => (
                    <option key={a.value} value={a.value}>
                      {a.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category selector */}
            <div className="space-y-1.5">
              <label htmlFor="hero-category-select" className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                Property Category
              </label>
              <div className="relative">
                <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                <select
                  id="hero-category-select"
                  aria-label="Select Property Category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 bg-stone-50 dark:bg-stone-800 border border-stone-200/90 dark:border-stone-700 rounded-xl text-sm text-stone-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-100 transition-all appearance-none cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Keyword / Sft Search input */}
            <div className="space-y-1.5">
              <label htmlFor="hero-search-input" className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                Road, Sector or Plot
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                <input
                  id="hero-search-input"
                  type="text"
                  placeholder="e.g. Block C, 3 bed, Duplex..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit()}
                  className="w-full pl-10 pr-3.5 py-3 bg-stone-50 dark:bg-stone-800 border border-stone-200/90 dark:border-stone-700 rounded-xl text-sm text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-100 transition-all"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2 sm:pt-0">
              <button
                onClick={onSearchSubmit}
                className="w-full py-3 px-5 bg-stone-900 dark:bg-white hover:bg-stone-800 dark:hover:bg-stone-100 text-white dark:text-stone-900 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow active:scale-[0.99] cursor-pointer"
              >
                <Search className="w-4 h-4 text-amber-400 dark:text-blue-600" />
                <span>Search ({totalListingsCount})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Clean Centered Proof & Guarantee Strip with Frosted Pill */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2.5 gap-x-5 text-xs text-stone-200 max-w-3xl mx-auto bg-stone-950/65 backdrop-blur-md px-5 py-2.5 rounded-2xl sm:rounded-full border border-white/15 shadow-md">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>RAJUK Approved Plans</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Direct Owner Rates (0% Markup)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Supreme Court Deed Vetting</span>
          </div>

          <button
            onClick={onOpenGuarantee}
            className="flex items-center gap-1 text-xs text-amber-300 hover:text-amber-200 font-semibold transition-colors underline-offset-4 hover:underline cursor-pointer sm:border-l sm:border-white/20 sm:pl-4"
          >
            <span>5-Pillar Protection</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
