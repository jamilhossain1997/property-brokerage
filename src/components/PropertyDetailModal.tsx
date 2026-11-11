import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Phone,
  MessageCircle,
  MapPin,
  Sparkles,
  Calculator,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Property } from '../types/property';
import { formatBDT, calculateMortgageEMI } from '../utils/calculator';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
}) => {
  if (!property) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [tourType, setTourType] = useState<'in-person' | 'video'>('in-person');
  const [tourDate, setTourDate] = useState('2026-11-15');
  const [tourTime, setTourTime] = useState('11:00 AM');
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [tourBooked, setTourBooked] = useState(false);

  // Mortgage Calculator state pre-filled
  const [downPaymentPercent, setDownPaymentPercent] = useState(25);
  const [loanTenureYears, setLoanTenureYears] = useState(20);
  const [interestRate, setInterestRate] = useState(9.5);

  const images = property.images && property.images.length > 0 ? property.images : ['/src/assets/images/property_bashundhara_residence_1794372879970.jpg'];

  const emiResult = calculateMortgageEMI(
    property.priceBDT,
    downPaymentPercent,
    interestRate,
    loanTenureYears
  );

  const handleBookTour = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim() || !visitorPhone.trim()) return;
    setTourBooked(true);
  };

  const isRental = property.listingType === 'rent';
  const whatsappBookingUrl = `https://wa.me/${property.agent.whatsapp}?text=${encodeURIComponent(
    `Hello BrokerageBD, I would like to schedule an inspection tour for "${property.title}" (ID: ${property.id}) on ${tourDate} at ${tourTime}. My name is ${visitorName || 'Buyer'}.`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 lg:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-stone-900 rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200/90 dark:border-stone-800 text-stone-900 dark:text-stone-100 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Sticky Header Bar */}
        <div className="sticky top-0 z-30 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md px-6 py-4 border-b border-stone-200/80 dark:border-stone-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              {property.location.area} · {property.category}
            </span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800">
              Verified Title
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Main Gallery with Thumbnails */}
          <div>
            <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-stone-900 rounded-2xl overflow-hidden mb-3.5 shadow-sm">
              <img
                src={images[activeImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImageIndex(
                        (prev) => (prev - 1 + images.length) % images.length
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-stone-950/60 hover:bg-stone-950/80 text-white flex items-center justify-center transition-all backdrop-blur-xs"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) => (prev + 1) % images.length)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-stone-950/60 hover:bg-stone-950/80 text-white flex items-center justify-center transition-all backdrop-blur-xs"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-stone-950/70 backdrop-blur-sm text-xs font-mono text-white">
                {activeImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-22 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-stone-900 scale-102 shadow-xs'
                        : 'border-transparent opacity-65 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title, Pricing & Address Header */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-stone-200 dark:border-stone-800">
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 dark:text-white font-display tracking-tight">
                {property.title}
              </h2>
              <div className="flex items-center gap-1.5 text-sm text-stone-600 dark:text-stone-400 font-medium">
                <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
                <span>{property.location.address}</span>
              </div>
            </div>

            <div className="lg:text-right shrink-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-stone-950 dark:text-white font-display tabular-nums tracking-tight">
                {formatBDT(property.priceBDT, isRental)}
              </div>
              {!isRental && property.pricePerSft > 0 && (
                <div className="text-xs font-semibold text-stone-500 dark:text-stone-400 tabular-nums mt-1">
                  ৳ {property.pricePerSft.toLocaleString()} per sqft
                </div>
              )}
              <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 mt-1">
                Zero Brokerage Markup Guaranteed
              </div>
            </div>
          </div>

          {/* Crisp clean sans-serif tags and badges (text-sm font-semibold) */}
          <div className="flex items-center gap-2.5 flex-wrap p-4 bg-stone-50 dark:bg-stone-850 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-200/80 dark:border-stone-700/80">
            <span className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-stone-800 text-stone-900 dark:text-white text-sm font-semibold shadow-xs border border-stone-200/60 dark:border-stone-700">
              {property.specs.bedrooms} Bedrooms
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-stone-800 text-stone-900 dark:text-white text-sm font-semibold shadow-xs border border-stone-200/60 dark:border-stone-700">
              {property.specs.bathrooms} Bathrooms
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-stone-800 text-stone-900 dark:text-white text-sm font-semibold shadow-xs border border-stone-200/60 dark:border-stone-700 tabular-nums">
              {property.specs.areaSft.toLocaleString()} sft Super Built-up
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-sm font-semibold shadow-xs border border-stone-200/60 dark:border-stone-700">
              Floor {property.specs.floor} of {property.specs.totalFloors}
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-sm font-semibold shadow-xs border border-stone-200/60 dark:border-stone-700">
              {property.specs.facing} Facing
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-sm font-semibold shadow-xs border border-stone-200/60 dark:border-stone-700 tabular-nums">
              {property.specs.parkingSpots} Parking
            </span>
          </div>

          {/* 2-Column Split: Details & Legal Audit vs Lead / Tour Scheduling */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns */}
            <div className="lg:col-span-7 space-y-8">
              {/* Description */}
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-white font-display mb-2">
                  Property Overview
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                  {property.description}
                </p>
              </div>

              {/* Verified Legal Title Audit */}
              <div className="p-6 rounded-2xl border border-amber-200/80 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                  <h4 className="text-sm font-bold text-stone-900 dark:text-white font-display">
                    Legal & Regulatory Title Audit
                  </h4>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 mb-4 leading-relaxed">
                  Every property listed on Property Brokerage BD passes an exhaustive 6-point title chain inspection conducted by senior Supreme Court advocates.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="flex items-center gap-2 text-stone-800 dark:text-stone-200 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>
                      Rajuk Permit: <strong>{property.legal.rajukPermitNo}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-800 dark:text-stone-200 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Title Deed & Khatian Chain Verified</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-800 dark:text-stone-200 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Mutation (Namjari) Cleared & Updated</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-800 dark:text-stone-200 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Land Tax & Municipal Khajna Cleared</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-800 dark:text-stone-200 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Land Share: {property.legal.landSharePercentage}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-800 dark:text-stone-200 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Zero Bank Mortgage / Non-encumbrance</span>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-base font-bold text-stone-900 font-display mb-3">
                  Building & Unit Amenities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {property.amenities.map((amenity, i) => (
                    <div
                      key={i}
                      className="text-xs font-semibold text-stone-700 dark:text-stone-300 bg-stone-50 dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700 px-3 py-2.5 rounded-xl flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Embedded Mortgage Calculator */}
              {!isRental && (
                <div className="p-6 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-800/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-stone-700 dark:text-stone-300" />
                      <h4 className="text-sm font-bold text-stone-900 dark:text-white font-display">
                        Mortgage & Monthly EMI Estimate
                      </h4>
                    </div>
                    <span className="text-sm font-extrabold text-stone-900 dark:text-white tabular-nums">
                      {formatBDT(emiResult.monthlyEMI)} / mo
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs text-stone-600 dark:text-stone-400 font-semibold mb-1.5">
                        <span>Down Payment ({downPaymentPercent}%)</span>
                        <span className="font-bold tabular-nums text-stone-900 dark:text-white">
                          {formatBDT(emiResult.downPaymentAmount)}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="50"
                        step="5"
                        value={downPaymentPercent}
                        onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                        className="w-full accent-stone-900 dark:accent-amber-400 cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">
                          Tenure ({loanTenureYears} Years)
                        </label>
                        <select
                          value={loanTenureYears}
                          onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                          className="w-full p-2.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-semibold text-stone-800 dark:text-stone-200"
                        >
                          <option value={10}>10 Years</option>
                          <option value={15}>15 Years</option>
                          <option value={20}>20 Years</option>
                          <option value={25}>25 Years</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">
                          Interest Rate ({interestRate}%)
                        </label>
                        <select
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                          className="w-full p-2.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-semibold text-stone-800 dark:text-stone-200"
                        >
                          <option value={8.5}>8.5% (Special Expat)</option>
                          <option value={9.5}>9.5% (Standard DBH)</option>
                          <option value={10.5}>10.5% (Commercial Bank)</option>
                        </select>
                      </div>
                    </div>

                    <div className="text-[11px] text-stone-500 dark:text-stone-400 pt-2 border-t border-stone-200 dark:border-stone-700 flex justify-between font-medium">
                      <span>Loan Principal: {formatBDT(emiResult.loanAmount)}</span>
                      <span>Total Interest: {formatBDT(emiResult.totalInterest)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right 5 Columns: Agent Box & Tour Booking */}
            <div className="lg:col-span-5 space-y-6">
              {/* Agent Card */}
              <div className="p-6 bg-stone-900 text-white rounded-2xl shadow-sm">
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="w-12 h-12 rounded-full bg-stone-800 border-2 border-amber-400 flex items-center justify-center font-bold text-amber-400 text-base overflow-hidden">
                    {property.agent.avatar ? (
                      <img
                        src={property.agent.avatar}
                        alt={property.agent.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      property.agent.name.slice(0, 2)
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-display">
                      {property.agent.name}
                    </h4>
                    <p className="text-xs text-stone-400 font-medium">{property.agent.role}</p>
                    <p className="text-[11px] text-amber-300 font-medium mt-0.5">
                      {property.agent.experienceYears}+ Years Vetting Dhaka Properties
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href="tel:16604"
                    className="py-2.5 px-3 bg-white hover:bg-stone-100 text-stone-900 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call 16604</span>
                  </a>
                  <a
                    href={whatsappBookingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Schedule Private Tour Form */}
              <div className="p-6 bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-2xl shadow-xs">
                <h4 className="text-sm font-bold text-stone-900 dark:text-white font-display mb-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-stone-700 dark:text-stone-300" />
                  <span>Schedule Private Inspection Tour</span>
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 mb-4 font-normal">
                  Accompanied by a licensed Property Brokerage BD senior property advisor.
                </p>

                {tourBooked ? (
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 text-center space-y-2">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto" />
                    <p className="text-xs font-bold">
                      Tour Requested Successfully!
                    </p>
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                      Our advisor will confirm with gate pass & security arrangements via WhatsApp/Phone within 15 minutes.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleBookTour} className="space-y-3.5">
                    {/* Pill-style segmented tab switchers */}
                    <div className="flex p-1 bg-stone-100 dark:bg-stone-800 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setTourType('in-person')}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                          tourType === 'in-person'
                            ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                            : 'text-stone-600 dark:text-stone-400'
                        }`}
                      >
                        In-Person Onsite
                      </button>
                      <button
                        type="button"
                        onClick={() => setTourType('video')}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                          tourType === 'video'
                            ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                            : 'text-stone-600 dark:text-stone-400'
                        }`}
                      >
                        WhatsApp Video Tour
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                          Date
                        </label>
                        <input
                          type="date"
                          value={tourDate}
                          onChange={(e) => setTourDate(e.target.value)}
                          className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-medium text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-stone-100"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                          Time Slot
                        </label>
                        <select
                          value={tourTime}
                          onChange={(e) => setTourTime(e.target.value)}
                          className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-medium text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-stone-100"
                        >
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="11:30 AM">11:30 AM</option>
                          <option value="03:00 PM">03:00 PM</option>
                          <option value="05:00 PM">05:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Asif Karim"
                        value={visitorName}
                        onChange={(e) => setVisitorName(e.target.value)}
                        className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-medium text-stone-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-stone-100"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                        Mobile Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="017xxxxxxxx"
                        value={visitorPhone}
                        onChange={(e) => setVisitorPhone(e.target.value)}
                        className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-medium text-stone-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-stone-100"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-stone-950 dark:bg-white hover:bg-stone-800 dark:hover:bg-stone-100 text-white dark:text-stone-900 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Calendar className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600" />
                      <span>Request Inspection Tour</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
