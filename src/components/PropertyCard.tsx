import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Share2,
} from 'lucide-react';
import { Property } from '../types/property';
import { formatBDT } from '../utils/calculator';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
  isFavorite,
  onToggleFavorite,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const images = property.images && property.images.length > 0 ? property.images : ['/src/assets/images/property_bashundhara_residence_1794372879970.jpg'];

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isRental = property.listingType === 'rent';
  const whatsappMessage = encodeURIComponent(
    `Hello BrokerageBD, I am interested in "${property.title}" (ID: ${property.id}, Price: ${property.priceDisplay}, Area: ${property.location.area}). Please share verified legal documents and tour availability.`
  );

  return (
    <div
      onClick={() => onSelect(property)}
      className="group bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
    >
      {/* 4:3 Image Container with Subtle Card Hover Zoom Effect */}
      <div className="relative aspect-[4/3] bg-stone-100 dark:bg-stone-800 overflow-hidden">
        <img
          src={images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* User Requested: Frosted glass badge for verified status */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1.5 bg-stone-950/80 backdrop-blur-md rounded-xl text-xs font-semibold text-white tracking-wide border border-white/10 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>Rajuk Title Vetted</span>
        </div>

        {/* Floating Quick Actions (Frosted Glass) */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5">
          <button
            onClick={handleShare}
            aria-label="Share property link"
            className="w-8 h-8 rounded-full bg-white/90 dark:bg-stone-900/90 backdrop-blur-md hover:bg-white dark:hover:bg-stone-900 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white flex items-center justify-center transition-all shadow-sm border border-white/40 dark:border-stone-700"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(property.id);
            }}
            aria-label={isFavorite ? 'Remove from saved' : 'Save property'}
            className="w-8 h-8 rounded-full bg-white/90 dark:bg-stone-900/90 backdrop-blur-md hover:bg-white dark:hover:bg-stone-900 flex items-center justify-center transition-all shadow-sm border border-white/40 dark:border-stone-700"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorite ? 'fill-rose-500 text-rose-500' : 'text-stone-700 dark:text-stone-300'
              }`}
            />
          </button>
        </div>

        {/* Gallery Slider Controls (visible on hover) */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              aria-label="Previous property image"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              aria-label="Next property image"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-stone-950/70 backdrop-blur-sm text-[11px] font-mono text-stone-200">
              {currentImageIndex + 1}/{images.length}
            </div>
          </>
        )}
      </div>

      {/* Card Content & Metadata with Generous Whitespace */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Subtitle / Location Hierarchy */}
          <div className="flex items-center gap-2 text-xs font-medium text-stone-500 dark:text-stone-400 mb-2">
            <span className="text-stone-900 dark:text-stone-100 font-semibold">{property.location.area}</span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            <span>{property.category}</span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            <span className="text-amber-800 dark:text-amber-400 font-medium">{property.specs.completionStatus}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-stone-900 dark:text-white font-display line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-3">
            {property.title}
          </h3>

          {/* User Requested: Crisp, clean sans-serif tags and badges (text-sm font-semibold) for property specifications */}
          <div className="flex items-center gap-2 flex-wrap">
            {property.specs.bedrooms > 0 && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-stone-100/90 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-sm font-semibold">
                {property.specs.bedrooms} Beds
              </span>
            )}
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-stone-100/90 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-sm font-semibold">
              {property.specs.bathrooms} Baths
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-stone-100/90 dark:bg-stone-800 text-stone-900 dark:text-white text-sm font-semibold tabular-nums">
              {property.specs.areaSft.toLocaleString()} sft
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-stone-50 dark:bg-stone-800/60 text-stone-600 dark:text-stone-400 text-xs font-medium border border-stone-200/60 dark:border-stone-700/60">
              Floor {property.specs.floor}
            </span>
          </div>
        </div>

        {/* Pricing & Primary Action Footer */}
        <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-3">
          <div>
            {/* User Requested: Crisp, clean pricing badges */}
            <div className="text-xl font-extrabold text-stone-950 dark:text-white font-display tabular-nums tracking-tight">
              {formatBDT(property.priceBDT, isRental)}
            </div>
            {!isRental && property.pricePerSft > 0 && (
              <div className="text-xs text-stone-500 dark:text-stone-400 tabular-nums font-medium mt-0.5">
                ৳ {property.pricePerSft.toLocaleString()} / sft
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${property.agent.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2.5 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900 rounded-xl transition-colors flex items-center justify-center border border-emerald-200/60 dark:border-emerald-800"
              aria-label={`WhatsApp message for ${property.title}`}
              title="WhatsApp Direct Inquiry"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <button
              onClick={() => onSelect(property)}
              className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 dark:bg-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-100 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-sm"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Details</span>
            </button>
          </div>
        </div>

        {copied && (
          <div className="text-[11px] text-emerald-600 text-center font-medium">
            Listing link copied!
          </div>
        )}
      </div>
    </div>
  );
};
