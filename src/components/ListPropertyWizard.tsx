import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { estimatePropertyValuation, formatBDT } from '../utils/calculator';

interface ListPropertyWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ListPropertyWizard: React.FC<ListPropertyWizardProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState('Apartment');
  const [area, setArea] = useState('Gulshan');
  const [address, setAddress] = useState('');
  const [areaSft, setAreaSft] = useState(2000);
  const [bedrooms, setBedrooms] = useState(3);
  const [condition, setCondition] = useState<'Brand New' | 'Gently Used' | 'Under Construction'>('Brand New');
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [hasRajukApproval, setHasRajukApproval] = useState(true);
  const [hasMutation, setHasMutation] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const valuation = estimatePropertyValuation(area, areaSft, propertyType, condition);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerName.trim() || !ownerPhone.trim()) return;
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-stone-900 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-stone-950 dark:text-white font-display">
              Property Submitted for Verification!
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto leading-relaxed font-medium">
              Thank you, <strong>{ownerName}</strong>. Our Senior Dhaka Brokerage Officer will contact you at <strong>{ownerPhone}</strong> within 2 hours to schedule the legal document review and professional photography session.
            </p>
            <div className="p-5 bg-stone-50 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700 rounded-2xl text-left max-w-md mx-auto text-xs space-y-1.5">
              <div className="font-semibold text-stone-700 dark:text-stone-300">Preliminary Benchmark Estimate:</div>
              <div className="text-2xl font-extrabold text-stone-950 dark:text-white font-display tabular-nums">
                {formatBDT(valuation.lowRange)} – {formatBDT(valuation.highRange)}
              </div>
              <div className="text-stone-500 font-medium">
                Estimated rate: ৳ {valuation.ratePerSft.toLocaleString()} / sft in {area}
              </div>
            </div>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-stone-950 text-white text-xs font-semibold rounded-xl hover:bg-stone-800 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-xs font-semibold text-amber-800 border border-amber-200/60 mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>STEP {step} OF 3 · LIST YOUR PROPERTY WITH ZERO BROKERAGE HASSLE</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-950 font-display tracking-tight">
                {step === 1 && 'Property Specifications & Location'}
                {step === 2 && 'Legal Documentation & Condition'}
                {step === 3 && 'Owner Contact & Instant Benchmark Valuation'}
              </h2>
            </div>

            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Property Category
                    </label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-900"
                    >
                      <option value="Apartment">Residential Apartment</option>
                      <option value="Penthouse">Sky Penthouse</option>
                      <option value="Duplex">Duplex Residence</option>
                      <option value="Commercial Space">Commercial Floor Space</option>
                      <option value="Plot / Land">Residential Plot / Land</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Prime Area
                    </label>
                    <select
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-900"
                    >
                      <option value="Gulshan">Gulshan</option>
                      <option value="Banani">Banani</option>
                      <option value="Bashundhara R/A">Bashundhara R/A</option>
                      <option value="Dhanmondi">Dhanmondi</option>
                      <option value="Uttara">Uttara</option>
                      <option value="Baridhara">Baridhara</option>
                      <option value="Mirpur DOHS">Mirpur DOHS</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Super Built-up Area (Sq. Ft.)
                    </label>
                    <input
                      type="number"
                      value={areaSft}
                      onChange={(e) => setAreaSft(Math.max(400, Number(e.target.value)))}
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Bedrooms
                    </label>
                    <select
                      value={bedrooms}
                      onChange={(e) => setBedrooms(Number(e.target.value))}
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-900"
                    >
                      <option value={1}>1 Bedroom</option>
                      <option value={2}>2 Bedrooms</option>
                      <option value={3}>3 Bedrooms</option>
                      <option value={4}>4 Bedrooms</option>
                      <option value={5}>5+ Bedrooms</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Street Address / Road / Sector
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Road 113, Plot 25, Gulshan-2"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-900"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 bg-stone-950 text-white font-semibold text-xs rounded-xl hover:bg-stone-800 transition-colors flex items-center gap-2 shadow-sm"
                  >
                    <span>Next: Legal Readiness</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-2">
                    Property Condition
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Brand New', 'Gently Used', 'Under Construction'] as const).map(
                      (c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setCondition(c)}
                          className={`p-2.5 text-xs font-medium rounded-xl border text-center transition-all ${
                            condition === c
                              ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                              : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          {c}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="text-xs font-semibold text-stone-800">
                    Document Checklist (Optional for preliminary inquiry)
                  </div>

                  <label className="flex items-center gap-3 p-3.5 rounded-xl border border-stone-200 cursor-pointer hover:bg-stone-50">
                    <input
                      type="checkbox"
                      checked={hasRajukApproval}
                      onChange={(e) => setHasRajukApproval(e.target.checked)}
                      className="w-4 h-4 rounded text-stone-900"
                    />
                    <div className="text-xs">
                      <span className="font-semibold text-stone-800 block">
                        Rajuk Approved Building Plan Available
                      </span>
                      <span className="text-stone-500">
                        Sanctioned architectural drawing and building permit
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3.5 rounded-xl border border-stone-200 cursor-pointer hover:bg-stone-50">
                    <input
                      type="checkbox"
                      checked={hasMutation}
                      onChange={(e) => setHasMutation(e.target.checked)}
                      className="w-4 h-4 rounded text-stone-900"
                    />
                    <div className="text-xs">
                      <span className="font-semibold text-stone-800 block">
                        Mutation (Namjari) & DCR Record Cleared
                      </span>
                      <span className="text-stone-500">
                        Land registry in owner name with updated municipal tax
                      </span>
                    </div>
                  </label>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 bg-stone-950 text-white font-semibold text-xs rounded-xl hover:bg-stone-800 transition-colors flex items-center gap-2 shadow-sm"
                  >
                    <span>Next: Instant Valuation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Instant Valuation Estimate Preview */}
                <div className="p-4 bg-amber-50/80 border border-amber-200/90 rounded-2xl space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Estimated Market Benchmark for {area}</span>
                  </div>
                  <div className="text-2xl font-extrabold text-stone-950 font-display tabular-nums">
                    {formatBDT(valuation.lowRange)} – {formatBDT(valuation.highRange)}
                  </div>
                  <p className="text-[11px] text-stone-600 font-medium">
                    Based on verified {areaSft} sft transactions in {area} (approx. ৳ {valuation.ratePerSft.toLocaleString()} / sft).
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Owner Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Mahmudul Hasan"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-900"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      placeholder="017xxxxxxxx"
                      value={ownerPhone}
                      onChange={(e) => setOwnerPhone(e.target.value)}
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="owner@domain.com"
                      value={ownerEmail}
                      onChange={(e) => setOwnerEmail(e.target.value)}
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-900"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-stone-950 text-white font-semibold text-xs rounded-xl hover:bg-stone-800 transition-colors flex items-center gap-2 shadow-sm"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Submit for Broker Verification</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
