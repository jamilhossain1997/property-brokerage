import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  Scale,
  Building2,
  Globe2,
  Lock,
  ArrowRight,
  Phone,
  MessageCircle,
} from 'lucide-react';

interface InstitutionalGuaranteeProps {
  onOpenContact: (reason?: string) => void;
}

export const InstitutionalGuarantee: React.FC<InstitutionalGuaranteeProps> = ({ onOpenContact }) => {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      id: 'title',
      icon: Scale,
      title: '1. Supreme Court Advocate Title Vetting',
      subtitle: 'Complete 30-Year Chain of Title, Khatian & Bia Deed Authentication',
      description:
        'Every single property listed on Property Brokerage BD undergoes a rigorous forensic title audit by our panel of Supreme Court advocates. We trace ownership records across CS, SA, RS, and City Jarip surveys, verifying authentic Bia deeds and registered mutations before any client inspection.',
      deliverables: [
        'Authenticated 30-Year Title Trace Report',
        'Namjari (Mutation) & DCR Record Cross-Check',
        'Up-to-Date Municipal Khajna & Land Revenue Receipts',
        'Official Sub-Registry Office Non-Encumbrance Certificate (NEC)',
      ],
      badge: '100% Guaranteed Clear Title',
    },
    {
      id: 'rajuk',
      icon: Building2,
      title: '2. RAJUK Architectural & Structural Audit',
      subtitle: 'Sanction Plan Compliance & Occupancy Verification',
      description:
        'Disputed floor extensions and unauthorized setbacks jeopardize property investments in Dhaka. Our licensed civil engineers physically measure the constructed edifice against the RAJUK approved architectural layout and fire safety sanctions, eliminating regulatory penalty risks.',
      deliverables: [
        'RAJUK Sanction Permit & Approved Structural Drawing Cross-Audit',
        'Fire Safety, Emergency Stairwell & Setback Clearance',
        'Soil Test & Substructure Foundation Engineering Review',
        'Occupancy Certificate & Utility Substation Sanction Validation',
      ],
      badge: 'Zero Demolition Risk',
    },
    {
      id: 'escrow',
      icon: Lock,
      title: '3. Regulated Escrow & Fair Institutional Brokerage',
      subtitle: '0% Hidden Markups · Direct Owner Pricing · Banking Paper Trail',
      description:
        'Traditional informal real estate agents often inflate prices secretly to pocket massive unauthorized margins. Property Brokerage BD operates with institutional transparency: buyers negotiate directly with verified landowners with a fixed, regulated brokerage fee paid only upon successful deed registration.',
      deliverables: [
        'Direct Owner-to-Buyer Contractual Price Transparency',
        'Token & Bayna Monies Protected by Scheduled Bank Pay Orders',
        'Zero Middleman Price Inflation Guarantee',
        'Formal Tax Invoice & Registered Corporate Documentation',
      ],
      badge: 'Zero Hidden Markups',
    },
    {
      id: 'share',
      icon: FileCheck2,
      title: '4. Proportionate Undivided Land Share Registration',
      subtitle: 'Securing Permanent Sub-Soil Ownership Rights',
      description:
        'When purchasing a luxury apartment in Dhaka, owning the physical unit is only half the transaction. We ensure your registered deed legally deeds the exact undivided proportionate share of the underlying prime land plot, preserving multi-generational capital appreciation.',
      deliverables: [
        'Exact Decimal Sub-Soil Land Fraction Registered in Deed',
        'Joint Ownership Declaration with All Co-Owners',
        'Permanent Parking Bay Allocation Indenture',
        'Clear Sub-Registry Deed Execution Assistance',
      ],
      badge: 'Permanent Land Rights',
    },
    {
      id: 'nrb',
      icon: Globe2,
      title: '5. NRB & Expatriate Concierge Service',
      subtitle: 'End-to-End Asset Management for Global Bangladeshis',
      description:
        'For non-resident Bangladeshis living in the US, UK, Canada, Australia, and the Middle East, purchasing property in Dhaka has historically been fraught with family reliance risks. We provide 4K live video tours, High Commission power-of-attorney drafting, and full repatriation advisory.',
      deliverables: [
        'Live 4K Ultra-HD Virtual Video Walkthroughs with Lead Broker',
        'Bangladesh Embassy / High Commission Power of Attorney Execution',
        'NITA (Non-Resident Investor Taka Account) Banking Guidance',
        'Tenant Sourcing, Rental Yield Management & Handover Custody',
      ],
      badge: 'Global NRI Service',
    },
  ];

  return (
    <section id="our-guarantee" className="py-16 sm:py-24 bg-white dark:bg-stone-900 border-t border-stone-200/80 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-xs font-semibold text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800 mb-4">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>THE PROPERTY BROKERAGE BD STANDARD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-950 dark:text-white font-display tracking-tight text-balance">
            Our 5-Pillar Buyer & Seller Protection System
          </h2>
          <p className="text-sm sm:text-base font-medium text-stone-600 dark:text-stone-300 mt-3 leading-relaxed">
            Buying high-value real estate in Dhaka should never be a gamble. Every listing on our platform is protected by institutional-grade legal vetting, architectural plan verification, and direct-deed transparency.
          </p>
        </div>

        {/* 2-Column Interactive Pillar Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Pillar Navigation Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isSelected = activePillar === idx;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillar(idx)}
                  className={`w-full text-left p-4.5 sm:p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                    isSelected
                      ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 border-stone-900 dark:border-white shadow-lg'
                      : 'bg-stone-50 dark:bg-stone-800/60 text-stone-800 dark:text-stone-200 border-stone-200/80 dark:border-stone-700/60 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-white/10 dark:bg-stone-900/10 text-amber-400 dark:text-blue-600'
                        : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold font-display truncate">
                        {pillar.title}
                      </span>
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md shrink-0 ${
                          isSelected
                            ? 'bg-white/20 dark:bg-stone-900/10 text-white dark:text-stone-900'
                            : 'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300'
                        }`}
                      >
                        {pillar.badge}
                      </span>
                    </div>
                    <p
                      className={`text-xs mt-1 line-clamp-1 ${
                        isSelected
                          ? 'text-stone-300 dark:text-stone-600'
                          : 'text-stone-500 dark:text-stone-400'
                      }`}
                    >
                      {pillar.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Pillar Focus Card */}
          <div className="lg:col-span-7 bg-stone-50 dark:bg-stone-800/80 rounded-2xl p-6 sm:p-8 border border-stone-200/90 dark:border-stone-700 shadow-sm space-y-6">
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                  {React.createElement(pillars[activePillar].icon, { className: 'w-6 h-6' })}
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-stone-950 dark:text-white font-display">
                    {pillars[activePillar].title}
                  </h3>
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {pillars[activePillar].subtitle}
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-flex px-3 py-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-bold rounded-lg">
                Verified
              </span>
            </div>

            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
              {pillars[activePillar].description}
            </p>

            <div>
              <h4 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider mb-3">
                Included Institutional Deliverables:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pillars[activePillar].deliverables.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-3 bg-white dark:bg-stone-900 rounded-xl border border-stone-200/70 dark:border-stone-700/80 shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-stone-800 dark:text-stone-200">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Footer */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                Have documents of your own to verify? Our advocates inspect them at zero upfront cost.
              </div>
              <button
                onClick={() => onOpenContact(`Free Title Pre-Vetting Consultation for ${pillars[activePillar].title}`)}
                className="w-full sm:w-auto px-5 py-2.5 bg-stone-900 dark:bg-white hover:bg-stone-800 dark:hover:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 shrink-0"
              >
                <span>Consult Senior Advocate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Free Legal Checkup Strip */}
        <div className="mt-12 bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-amber-400 text-xs font-bold tracking-wider uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>Complimentary Buyer Protection Service</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold font-display">
              Considering a property not listed with us?
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 font-normal max-w-xl">
              Send us the plot or apartment details. Our legal desk will check RAJUK masterplan alignment and mutation status free of charge before you pay any token money.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
            <a
              href="tel:16604"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition-all flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>Call 16604</span>
            </a>
            <a
              href="https://wa.me/8801755662414?text=Hello%20Property%20Brokerage%20BD,%20I%20would%20like%20a%20free%20legal%20title%20check%20for%20a%20property%20in%20Dhaka."
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Title Desk</span>
            </a>
            <button
              onClick={() => onOpenContact('Free Legal Title Pre-Vetting')}
              className="px-5 py-2.5 bg-white text-stone-900 hover:bg-stone-100 text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2"
            >
              <span>Request Free Verification</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
