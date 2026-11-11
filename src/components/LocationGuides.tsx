import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { NEIGHBORHOODS } from '../data/properties';

interface LocationGuidesProps {
  onSelectArea: (area: string) => void;
}

export const LocationGuides: React.FC<LocationGuidesProps> = ({ onSelectArea }) => {
  return (
    <section id="neighborhood-guides" className="py-16 sm:py-24 bg-stone-100/50 dark:bg-stone-900/40 border-t border-stone-200/80 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200/80 dark:bg-stone-800 text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-3">
              <MapPin className="w-3.5 h-3.5 text-stone-900 dark:text-amber-400" />
              <span>DHAKA REAL ESTATE NEIGHBORHOODS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-950 dark:text-white font-display tracking-tight">
              Explore Dhaka By Area & Market Benchmarks
            </h2>
            <p className="text-sm sm:text-base font-medium text-stone-600 dark:text-stone-300 mt-3 leading-relaxed">
              In-depth price per sqft metrics, rental yields, and upcoming Metro transit connectivity across prime locations.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {NEIGHBORHOODS.map((hood) => (
            <div
              key={hood.id}
              className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/90 dark:border-stone-800 p-7 flex flex-col justify-between hover:border-stone-300 dark:hover:border-stone-700 hover:shadow-xl transition-all shadow-sm text-stone-900 dark:text-stone-100"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-stone-900 dark:text-white font-display">
                    {hood.name}
                  </h3>
                  <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800">
                    Safety {hood.safetyScore}/100
                  </span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 mb-5 leading-relaxed font-normal">
                  {hood.tagline}
                </p>

                <div className="space-y-2.5 py-3.5 border-y border-stone-100 dark:border-stone-800 text-xs mb-5">
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500 dark:text-stone-400 font-medium">Benchmark Rate:</span>
                    <span className="font-extrabold text-stone-900 dark:text-white tabular-nums">
                      {hood.avgPricePerSft}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500 dark:text-stone-400 font-medium">Annual Rental Yield:</span>
                    <span className="font-bold text-amber-800 dark:text-amber-400 tabular-nums">
                      {hood.rentalYield}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500 dark:text-stone-400 font-medium">Metro Transit:</span>
                    <span className="text-stone-800 dark:text-stone-200 font-semibold text-right truncate max-w-[190px]">
                      {hood.metroStatus}
                    </span>
                  </div>
                </div>

                <div className="space-y-1 mb-6">
                  <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 block mb-1.5">
                    Key Highlights:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {hood.topHighlights.map((hl, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700 px-2.5 py-1 rounded-lg"
                      >
                        {hl}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectArea(hood.name.split(' ')[0])}
                className="w-full py-2.5 px-4 text-xs font-semibold text-stone-900 dark:text-white bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                <span>View Properties in {hood.name.split(' ')[0]}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
