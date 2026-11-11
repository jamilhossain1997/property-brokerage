import React from 'react';
import { Phone, MessageCircle, SlidersHorizontal, PlusCircle } from 'lucide-react';

interface MobileQuickBarProps {
  onOpenListWizard: () => void;
  onScrollToFilters: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({
  onOpenListWizard,
  onScrollToFilters,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 px-4 py-2.5 lg:hidden shadow-lg transition-colors">
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        <a
          href="tel:16604"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100 rounded-lg text-xs font-semibold transition-colors"
          aria-label="Call 16604 Hotline"
        >
          <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Call 16604</span>
        </a>

        <a
          href="https://wa.me/8801755662414?text=Hello%20Property%20Brokerage%20BD,%20I%20am%20looking%20for%20verified%20properties%20in%20Dhaka."
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors"
          aria-label="Chat on WhatsApp"
        >
          <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 18.06c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.106 8.106 0 0 1-1.25-4.29c0-4.51 3.67-8.18 8.18-8.18 2.19 0 4.24.85 5.79 2.4a8.134 8.134 0 0 1 2.39 5.79c0 4.51-3.67 8.18-8.18 8.18zm4.49-6.13c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.53.07-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43s-.56-1.35-.77-1.85c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.17 1.73 2.64 4.19 3.7.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31z" />
          </svg>
          <span>WhatsApp</span>
        </a>

        <button
          onClick={onScrollToFilters}
          className="flex items-center justify-center p-2 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-lg text-xs font-semibold transition-colors"
          aria-label="Filter properties"
          title="Filter properties"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenListWizard}
          className="flex items-center justify-center p-2 bg-stone-950 dark:bg-white text-white dark:text-stone-900 rounded-lg text-xs font-semibold hover:bg-stone-800 dark:hover:bg-stone-100 transition-colors"
          aria-label="List your property"
          title="List your property"
        >
          <PlusCircle className="w-4 h-4 text-amber-400 dark:text-blue-600" />
        </button>
      </div>
    </div>
  );
};
