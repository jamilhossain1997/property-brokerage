import React from 'react';
import { Building2, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenListWizard: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenListWizard, onOpenContact }) => {
  return (
    <footer className="bg-stone-950 text-stone-400 text-xs border-t border-stone-800 pb-16 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Brand & Purpose (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 bg-white px-2 py-1 rounded-xl flex items-center shadow-xs">
                <img
                  src="/assets/aistudio/image_f68ad9a3.png"
                  alt="Logo"
                  className="h-7 w-auto object-contain"
                />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white font-display">
                 <span className="text-blue-500"></span>
              </span>
            </div>

            <p className="text-stone-400 leading-relaxed text-xs font-normal">
              Bangladesh's institutional real estate brokerage and title verification marketplace. Dedicated to institutional-grade transparency in buying, renting, and selling luxury residential and prime corporate spaces.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-amber-300 font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Registered Corporate Member: REHAB & Trade License No. 04-98124</span>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white font-display tracking-wider uppercase">
              Properties
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('properties')}
                  className="hover:text-white transition-colors"
                >
                  Buy Apartments
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('properties')}
                  className="hover:text-white transition-colors"
                >
                  Luxury Penthouses
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('properties')}
                  className="hover:text-white transition-colors"
                >
                  Commercial Spaces
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('properties')}
                  className="hover:text-white transition-colors"
                >
                  Diplomatic Rentals
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenListWizard}
                  className="hover:text-white transition-colors text-amber-400 font-semibold"
                >
                  List Your Property
                </button>
              </li>
            </ul>
          </div>

          {/* Locations (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white font-display tracking-wider uppercase">
              Prime Areas
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('neighborhoods')}
                  className="hover:text-white transition-colors"
                >
                  Gulshan 1 & 2
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('neighborhoods')}
                  className="hover:text-white transition-colors"
                >
                  Banani Avenues
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('neighborhoods')}
                  className="hover:text-white transition-colors"
                >
                  Bashundhara R/A
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('neighborhoods')}
                  className="hover:text-white transition-colors"
                >
                  Dhanmondi Lake
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('neighborhoods')}
                  className="hover:text-white transition-colors"
                >
                  Uttara Model Town
                </button>
              </li>
            </ul>
          </div>

          {/* Official Dhaka Head Office (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white font-display tracking-wider uppercase">
              Gulshan Corporate Office
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <span>
                  bti Celebration Point, Plot: 3 & 5, Road: 113/A, Gulshan-2, Dhaka-1212, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-stone-500 shrink-0" />
                <a href="tel:16604" className="hover:text-white transition-colors font-medium">
                  Hotline: 16604 / +880 9613-191919
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-stone-500 shrink-0" />
                <a
                  href="mailto:info@propertybrokeragebd.com"
                  className="hover:text-white transition-colors"
                >
                  info@propertybrokeragebd.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Vercel Readiness */}
        <div className="pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <div>
            © 2026 Property Brokerage BD. All rights reserved. Vetted real estate platform.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('guarantee')}
              className="text-stone-300 hover:text-white font-medium transition-colors"
            >
              Buyer & Seller Protection System
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={onOpenContact}
              className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              Contact Advisory Desk
            </button>
            <span aria-hidden="true">·</span>
            <span>Optimized for Vercel</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
