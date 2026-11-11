/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SearchFilterBar } from './components/SearchFilterBar';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { MortgageCalculatorSection } from './components/MortgageCalculatorSection';
import { ListPropertyWizard } from './components/ListPropertyWizard';
import { LocationGuides } from './components/LocationGuides';
import { InstitutionalGuarantee } from './components/InstitutionalGuarantee';
import { SplitMapView } from './components/SplitMapView';
import { TrustAndTestimonials } from './components/TrustAndTestimonials';
import { Footer } from './components/Footer';
import { MobileQuickBar } from './components/MobileQuickBar';
import { ContactBrokerageModal } from './components/ContactBrokerageModal';
import { INITIAL_PROPERTIES } from './data/properties';
import { Property, PropertyFilterState, ListingType } from './types/property';
import { filterProperties } from './utils/calculator';
import { RotateCcw, Home, Phone, MessageCircle, ShieldCheck } from 'lucide-react';

export default function App() {
  const [properties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [activeTab, setActiveTab] = useState<string>('properties');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isListWizardOpen, setIsListWizardOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactReason, setContactReason] = useState<string | undefined>(undefined);

  // Theme Management (Light / Dark mode)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const savedTheme = localStorage.getItem('pb_theme');
      if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('pb_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('brokeragebd_favs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const propertySectionRef = useRef<HTMLDivElement>(null);

  // Filters State
  const [filter, setFilter] = useState<PropertyFilterState>({
    listingType: 'buy',
    searchQuery: '',
    area: 'all',
    category: 'all',
    minPrice: 0,
    maxPrice: 150000000,
    bedrooms: null,
    completionStatus: 'all',
    sortBy: 'featured',
    onlyVerified: false,
  });

  // Keep favorites persisted
  useEffect(() => {
    try {
      localStorage.setItem('brokeragebd_favs', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filtered properties
  const filteredList = useMemo(() => {
    return filterProperties(properties, filter);
  }, [properties, filter]);

  const handleHeroSearchSubmit = () => {
    propertySectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setFilter({
      listingType: 'buy',
      searchQuery: '',
      area: 'all',
      category: 'all',
      minPrice: 0,
      maxPrice: 150000000,
      bedrooms: null,
      completionStatus: 'all',
      sortBy: 'featured',
      onlyVerified: false,
    });
  };

  const handleSelectAreaFromGuides = (area: string) => {
    setFilter((prev) => ({ ...prev, area }));
    setActiveTab('properties');
    propertySectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'properties') {
      propertySectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'neighborhoods') {
      document.getElementById('neighborhood-guides')?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'calculator') {
      document.getElementById('mortgage-calculator')?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'guarantee') {
      document.getElementById('our-guarantee')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContactModal = (reason?: string) => {
    setContactReason(reason);
    setIsContactOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans antialiased selection:bg-stone-900 selection:text-amber-400 dark:selection:bg-white dark:selection:text-stone-900 transition-colors">
      {/* Header with Clean Logo, Client Navigation & Instant Contact */}
      <Header
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenListWizard={() => setIsListWizardOpen(true)}
        onOpenContact={() => handleOpenContactModal('General Consultation')}
      />

      {/* Hero Section */}
      <Hero
        listingType={filter.listingType}
        setListingType={(type: ListingType) => setFilter((prev) => ({ ...prev, listingType: type }))}
        selectedArea={filter.area}
        setSelectedArea={(area: string) => setFilter((prev) => ({ ...prev, area }))}
        selectedCategory={filter.category}
        setSelectedCategory={(cat: string) => setFilter((prev) => ({ ...prev, category: cat }))}
        searchQuery={filter.searchQuery}
        setSearchQuery={(q: string) => setFilter((prev) => ({ ...prev, searchQuery: q }))}
        onSearchSubmit={handleHeroSearchSubmit}
        totalListingsCount={filteredList.length}
        onOpenGuarantee={() => handleNavigate('guarantee')}
      />

      {/* Sticky Interactive Filter Bar */}
      <div ref={propertySectionRef}>
        <SearchFilterBar
          filter={filter}
          setFilter={setFilter}
          totalMatches={filteredList.length}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onReset={handleResetFilters}
        />
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Results Header with Frosted Counter */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 dark:text-white font-display tracking-tight">
              {filter.area === 'all' ? 'All Verified Properties' : `Properties in ${filter.area}`}
            </h2>
            <p className="text-xs sm:text-sm font-medium text-stone-500 dark:text-stone-400 mt-1">
              Showing {filteredList.length} {filter.listingType} residences with verified land ownership deeds
            </p>
          </div>

          <div className="flex items-center gap-3">
            {favorites.length > 0 && (
              <div className="text-xs font-semibold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-3.5 py-2 rounded-xl border border-rose-200/80 dark:border-rose-900 shadow-xs">
                {favorites.length} Saved {favorites.length === 1 ? 'Residence' : 'Residences'}
              </div>
            )}
            <button
              onClick={() => handleOpenContactModal('Inquiry on Available Portfolio')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-stone-800 dark:text-stone-200 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-xl border border-stone-200/90 dark:border-stone-700 shadow-xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Inquire via Broker Desk</span>
            </button>
          </div>
        </div>

        {/* View Mode: Grid or Split Map */}
        {viewMode === 'map' ? (
          <SplitMapView
            properties={filteredList}
            onSelectProperty={(p) => setSelectedProperty(p)}
          />
        ) : (
          <>
            {filteredList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {filteredList.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onSelect={(p) => setSelectedProperty(p)}
                    isFavorite={favorites.includes(property.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="py-20 text-center bg-white/90 dark:bg-stone-900/90 backdrop-blur-md rounded-2xl border border-stone-200/80 dark:border-stone-800 p-8 max-w-lg mx-auto space-y-4 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 flex items-center justify-center mx-auto">
                  <Home className="w-6 h-6 text-stone-700 dark:text-stone-300" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-white font-display">
                  No listings found matching these filters
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed font-normal">
                  We could not find properties in this specific budget or bedroom configuration. Try clearing your search or switching to another Dhaka neighborhood.
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-semibold rounded-xl hover:bg-stone-800 dark:hover:bg-stone-100 transition-colors inline-flex items-center gap-2 shadow-sm"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Filters</span>
                  </button>
                  <button
                    onClick={() => handleOpenContactModal('Custom Property Request')}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-2 shadow-sm"
                  >
                    <span>Request Custom Search</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Neighborhood Guides */}
      <LocationGuides onSelectArea={handleSelectAreaFromGuides} />

      {/* Mortgage & EMI Calculator Section */}
      <MortgageCalculatorSection />

      {/* Client-Facing 5-Pillar Protection System */}
      <InstitutionalGuarantee onOpenContact={handleOpenContactModal} />

      {/* Trust & Testimonials */}
      <TrustAndTestimonials />

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenListWizard={() => setIsListWizardOpen(true)}
        onOpenContact={() => handleOpenContactModal('General Inquiry')}
      />

      {/* Mobile Sticky Action Bar */}
      <MobileQuickBar
        onOpenListWizard={() => setIsListWizardOpen(true)}
        onScrollToFilters={() => propertySectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
      />

      {/* Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />

      {/* List Property Wizard Modal */}
      <ListPropertyWizard
        isOpen={isListWizardOpen}
        onClose={() => setIsListWizardOpen(false)}
      />

      {/* Dedicated Client Contact & Callback Modal */}
      <ContactBrokerageModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        prefilledPropertyTitle={contactReason}
      />

      {/* Floating Action Button (FAB) for Instant Advisory Access */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-30 flex items-center gap-2">
        <a
          href="https://wa.me/8801755662414?text=Hello%20Property%20Brokerage%20BD,%20I%20am%20interested%20in%20verified%20properties%20in%20Dhaka."
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          title="Direct WhatsApp with Senior Broker"
          aria-label="Direct WhatsApp"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 18.06c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.106 8.106 0 0 1-1.25-4.29c0-4.51 3.67-8.18 8.18-8.18 2.19 0 4.24.85 5.79 2.4a8.134 8.134 0 0 1 2.39 5.79c0 4.51-3.67 8.18-8.18 8.18zm4.49-6.13c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.53.07-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43s-.56-1.35-.77-1.85c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.17 1.73 2.64 4.19 3.7.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31z" />
          </svg>
        </a>
        <button
          onClick={() => handleOpenContactModal('Need Broker Guidance')}
          className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-900 text-xs font-bold shadow-lg hover:shadow-xl hover:scale-102 transition-all border border-white/20 dark:border-stone-800"
          aria-label="Need Assistance? Contact Brokerage"
        >
          <ShieldCheck className="w-4 h-4 text-amber-400 dark:text-amber-600" />
          <span>Need Guidance? 16604</span>
        </button>
      </div>
    </div>
  );
}
