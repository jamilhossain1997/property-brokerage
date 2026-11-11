import React, { useState } from 'react';
import { MapPin, Navigation, Eye, CheckCircle2, Phone, MessageCircle } from 'lucide-react';
import { Property } from '../types/property';
import { formatBDT } from '../utils/calculator';

interface SplitMapViewProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
}

export const SplitMapView: React.FC<SplitMapViewProps> = ({
  properties,
  onSelectProperty,
}) => {
  const [activePinId, setActivePinId] = useState<string>(properties[0]?.id || '');
  const activeProperty = properties.find((p) => p.id === activePinId) || properties[0];

  const mapHotspots = [
    { id: 'Gulshan', name: 'Gulshan-2 & Lake', top: '35%', left: '48%', count: 4 },
    { id: 'Banani', name: 'Banani 11', top: '32%', left: '42%', count: 2 },
    { id: 'Bashundhara', name: 'Bashundhara R/A', top: '22%', left: '60%', count: 5 },
    { id: 'Dhanmondi', name: 'Dhanmondi Lake', top: '55%', left: '38%', count: 3 },
    { id: 'Uttara', name: 'Uttara Model Town', top: '15%', left: '45%', count: 2 },
    { id: 'Mirpur DOHS', name: 'Mirpur DOHS', top: '25%', left: '35%', count: 2 },
  ];

  return (
    <div className="bg-stone-100 dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 grid grid-cols-1 lg:grid-cols-12 min-h-[580px] transition-colors">
      {/* Left 7 Columns: Stylized Interactive Spatial Map */}
      <div className="lg:col-span-7 relative bg-stone-950 p-6 flex flex-col justify-between overflow-hidden min-h-[380px] lg:min-h-full">
        {/* Subtle Map Grid / River Graphic Lines */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Curved Path representing Hatirjheel & Buriganga */}
            <path
              d="M 50,450 Q 250,300 450,220 T 750,120"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="12"
              opacity="0.3"
            />
            <path
              d="M 280,320 Q 380,260 520,280 T 680,310"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="8"
              opacity="0.25"
            />
          </svg>
        </div>

        {/* Top Floating Map Controls */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 bg-stone-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-semibold text-white border border-stone-700">
            <Navigation className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Dhaka Geospatial Pins</span>
          </div>

          <div className="text-[11px] text-stone-400 font-mono">
            {properties.length} Properties in View
          </div>
        </div>

        {/* Hotspots & Property Pins Overlay */}
        <div className="relative w-full h-[320px] lg:h-[440px] my-auto">
          {/* Neighborhood Labels */}
          {mapHotspots.map((h) => (
            <div
              key={h.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
              style={{ top: h.top, left: h.left }}
            >
              <span className="text-[10px] font-bold text-stone-400/80 tracking-widest uppercase block mb-1">
                {h.name}
              </span>
            </div>
          ))}

          {/* Dynamic Property Pins with price tags */}
          {properties.map((prop, idx) => {
            const isSelected = prop.id === activePinId;
            let topPos = 40 + (idx % 3) * 15;
            let leftPos = 35 + (idx % 4) * 14;

            if (prop.location.area === 'Gulshan') {
              topPos = 36 + (idx * 5) % 15;
              leftPos = 48 + (idx * 4) % 10;
            } else if (prop.location.area === 'Bashundhara') {
              topPos = 22 + (idx * 6) % 12;
              leftPos = 58 + (idx * 5) % 12;
            } else if (prop.location.area === 'Dhanmondi') {
              topPos = 56 + (idx * 4) % 10;
              leftPos = 38 + (idx * 4) % 10;
            }

            return (
              <button
                key={prop.id}
                onClick={() => setActivePinId(prop.id)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-200 z-20 ${
                  isSelected ? 'scale-110 z-30' : 'hover:scale-105'
                }`}
                style={{ top: `${topPos}%`, left: `${leftPos}%` }}
                aria-label={`View ${prop.title}`}
              >
                <div
                  className={`px-2.5 py-1 rounded-full text-xs font-bold tabular-nums shadow-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    isSelected
                      ? 'bg-amber-400 text-stone-950 ring-4 ring-amber-400/30'
                      : 'bg-white text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-stone-900 shrink-0" />
                  <span>{formatBDT(prop.priceBDT, prop.listingType === 'rent')}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="relative z-10 flex items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-stone-800">
          <span>Click any pin to inspect verified listing specifications</span>
          <span className="text-amber-400 font-semibold">Gulshan · Banani · Bashundhara</span>
        </div>
      </div>

      {/* Right 5 Columns: Active Selected Property Card */}
      <div className="lg:col-span-5 bg-white dark:bg-stone-900 p-6 flex flex-col justify-between text-stone-900 dark:text-stone-100">
        {activeProperty ? (
          <div className="space-y-4">
            <div className="relative aspect-[16/10] bg-stone-100 dark:bg-stone-800 rounded-xl overflow-hidden">
              <img
                src={activeProperty.images[0] || '/src/assets/images/property_bashundhara_residence_1794372879970.jpg'}
                alt={activeProperty.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2.5 left-2.5 bg-stone-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-semibold text-white">
                {activeProperty.location.area}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 font-medium mb-1">
                <span>{activeProperty.category}</span>
                <span aria-hidden="true">·</span>
                <span>{activeProperty.specs.completionStatus}</span>
              </div>
              <h4 className="text-base font-bold text-stone-950 dark:text-white font-display line-clamp-2">
                {activeProperty.title}
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 line-clamp-2">
                {activeProperty.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-stone-700 dark:text-stone-300 py-2 border-y border-stone-100 dark:border-stone-800">
              {activeProperty.specs.bedrooms > 0 && (
                <>
                  <span className="font-semibold">{activeProperty.specs.bedrooms} Beds</span>
                  <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
                </>
              )}
              <span className="font-semibold">{activeProperty.specs.bathrooms} Baths</span>
              <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
              <span className="font-bold text-stone-900 dark:text-white tabular-nums">
                {activeProperty.specs.areaSft.toLocaleString()} sft
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-stone-950 dark:text-white font-display tabular-nums">
                  {formatBDT(activeProperty.priceBDT, activeProperty.listingType === 'rent')}
                </div>
                {activeProperty.pricePerSft > 0 && (
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 tabular-nums">
                    ৳ {activeProperty.pricePerSft.toLocaleString()} / sft
                  </div>
                )}
              </div>

              <button
                onClick={() => onSelectProperty(activeProperty)}
                className="px-4 py-2 bg-stone-950 dark:bg-white text-white dark:text-stone-900 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Full Details</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-stone-400">
            Select a property pin on the map.
          </div>
        )}
      </div>
    </div>
  );
};
