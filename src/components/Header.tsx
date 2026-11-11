import React, { useState } from 'react';
import { Phone, Menu, X, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  onOpenListWizard: () => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onNavigate,
  onOpenListWizard,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'properties', label: 'Properties' },
    { id: 'neighborhoods', label: 'Dhaka Locations' },
    { id: 'calculator', label: 'Home Loan EMI' },
    { id: 'guarantee', label: 'Our Protection System' },
    { id: 'contact', label: 'Contact Us', isContact: true },
  ];

  return (
      <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-[#EAE7DF] dark:border-stone-800 transition-colors">      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-20">
          {/* Company Official Logo Lockup (Clean, text logo removed per user request) */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => onNavigate('properties')}
              className="flex items-center focus:outline-none group"
              aria-label="Property Brokerage BD Home"
            >
              <div className="h-12 bg-white px-3 py-1.5 rounded-xl border border-stone-200/90 dark:border-stone-700/80 flex items-center shadow-xs group-hover:border-stone-400 transition-all">
                <img
                  src="/assets/aistudio/image_f68ad9a3.png"
                  alt="Property Brokerage BD"
                  className="h-8 md:h-9 w-auto object-contain"
                />
              </div>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600 dark:text-stone-300">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  if (link.isContact) {
                    onOpenContact();
                  } else {
                    onNavigate(link.id);
                  }
                  setMobileMenuOpen(false);
                }}
                className={`whitespace-nowrap transition-colors py-1 relative ${
                  activeTab === link.id
                    ? 'text-stone-950 dark:text-white font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-stone-950 dark:after:bg-white'
                    : 'hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Header Action Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Direct Phone Hotline */}
            <a
              href="tel:16604"
              className="hidden md:flex items-center gap-2 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white px-3 py-2 transition-colors rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800"
              title="Call 24/7 Property Hotline"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>16604</span>
            </a>

            {/* Direct WhatsApp Action with Official WhatsApp Icon */}
            <a
              href="https://wa.me/8801755662414?text=Hello%20Property%20Brokerage%20BD,%20I%20am%20looking%20for%20verified%20properties."
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all text-xs font-semibold shadow-xs hover:shadow active:scale-[0.98]"
              title="Chat with Senior Broker on WhatsApp"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 18.06c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.106 8.106 0 0 1-1.25-4.29c0-4.51 3.67-8.18 8.18-8.18 2.19 0 4.24.85 5.79 2.4a8.134 8.134 0 0 1 2.39 5.79c0 4.51-3.67 8.18-8.18 8.18zm4.49-6.13c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.53.07-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43s-.56-1.35-.77-1.85c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.17 1.73 2.64 4.19 3.7.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31z" />
              </svg>
              <span>WhatsApp</span>
            </a>

            {/* List Property Primary Action */}
            <button
              onClick={onOpenListWizard}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white rounded-xl transition-all shadow-sm whitespace-nowrap shrink-0 active:scale-[0.98]"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600" />
              <span>List Property</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-xl focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-stone-200 dark:border-stone-800 flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  if (link.isContact) {
                    onOpenContact();
                  } else {
                    onNavigate(link.id);
                  }
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3.5 py-2.5 text-sm rounded-xl transition-colors font-medium ${
                  activeTab === link.id
                    ? 'bg-stone-100 dark:bg-stone-800 text-stone-950 dark:text-white font-bold'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 grid grid-cols-2 gap-2">
              <a
                href="tel:16604"
                className="flex items-center justify-center gap-2 text-xs font-bold text-stone-800 dark:text-stone-200 p-2.5 bg-stone-100 dark:bg-stone-800 rounded-xl"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span>Call 16604</span>
              </a>
              <a
                href="https://wa.me/8801755662414"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 text-xs font-bold text-white p-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 18.06c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.106 8.106 0 0 1-1.25-4.29c0-4.51 3.67-8.18 8.18-8.18 2.19 0 4.24.85 5.79 2.4a8.134 8.134 0 0 1 2.39 5.79c0 4.51-3.67 8.18-8.18 8.18zm4.49-6.13c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.53.07-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43s-.56-1.35-.77-1.85c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.17 1.73 2.64 4.19 3.7.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31z" />
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
