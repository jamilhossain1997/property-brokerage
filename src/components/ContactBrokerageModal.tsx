import React, { useState } from 'react';
import {
  X,
  Phone,
  MessageCircle,
  MapPin,
  Mail,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Send,
} from 'lucide-react';

interface ContactBrokerageModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledPropertyTitle?: string;
}

export const ContactBrokerageModal: React.FC<ContactBrokerageModalProps> = ({
  isOpen,
  onClose,
  prefilledPropertyTitle,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState<'buy' | 'sell' | 'rent' | 'general'>('buy');
  const [preferredLocation, setPreferredLocation] = useState('Gulshan');
  const [message, setMessage] = useState(
    prefilledPropertyTitle
      ? `Hello, I would like more information and legal title details regarding "${prefilledPropertyTitle}".`
      : 'Hello, I am looking for verified property options in Dhaka. Please connect me with a senior advisor.'
  );
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitted(true);
  };

  const whatsappDirectUrl = `https://wa.me/8801755662414?text=${encodeURIComponent(
    `Hello Property Brokerage BD, I am ${name || 'a property seeker'}. I need assistance regarding ${inquiryType.toUpperCase()} in ${preferredLocation}. ${message}`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 lg:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-stone-900 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 flex items-center justify-center transition-colors"
          aria-label="Close contact modal"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-stone-950 dark:text-white font-display">
              Inquiry Dispatched to Senior Advisory!
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{name}</strong>. A licensed Property Brokerage BD senior advisor will reach out to you at <strong>{phone}</strong> within 15 minutes.
            </p>
            <div className="pt-2">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Continue on WhatsApp Now</span>
              </a>
            </div>
          </div>
        ) : (
          <div>
            {/* Header Brand */}
            <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-stone-100 dark:border-stone-800">
              <div className="h-10 bg-white px-2 py-1 rounded-lg border border-stone-200 dark:border-stone-700 flex items-center shadow-xs">
                <img
                  src="/assets/aistudio/image_f68ad9a3.png"
                  alt="Property Brokerage BD Logo"
                  className="h-7 w-auto object-contain"
                />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-stone-950 dark:text-white font-display leading-tight">
                  Connect with Property Brokerage BD
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  Direct Line to Gulshan-2 Headquarters & Senior Property Advocates
                </p>
              </div>
            </div>

            {/* Quick Instant Contact Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <a
                href="tel:16604"
                className="p-3 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-xl flex items-center justify-center gap-2.5 transition-colors text-stone-900 dark:text-white font-bold text-xs shadow-xs"
              >
                <Phone className="w-4 h-4 text-amber-500" />
                <span>Call Hotline 16604</span>
              </a>
              <a
                href="https://wa.me/8801755662414?text=Hello%20Property%20Brokerage%20BD,%20I%20would%20like%20to%20speak%20with%20a%20property%20advisor."
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl flex items-center justify-center gap-2.5 transition-colors font-bold text-xs shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Instant</span>
              </a>
            </div>

            {/* Callback Request Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="flex p-1 bg-stone-100 dark:bg-stone-800 rounded-xl">
                {(['buy', 'sell', 'rent', 'general'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setInquiryType(t)}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                      inquiryType === t
                        ? 'bg-white dark:bg-stone-900 text-stone-950 dark:text-white shadow-xs'
                        : 'text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    {t === 'general' ? 'Consultation' : t}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Asif Mahmud"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-medium text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-100"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="017xxxxxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-medium text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-100"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="user@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-medium text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Location of Interest
                  </label>
                  <select
                    value={preferredLocation}
                    onChange={(e) => setPreferredLocation(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-medium text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-100"
                  >
                    <option value="Gulshan">Gulshan 1 & 2</option>
                    <option value="Banani">Banani</option>
                    <option value="Bashundhara R/A">Bashundhara R/A</option>
                    <option value="Dhanmondi">Dhanmondi</option>
                    <option value="Uttara">Uttara</option>
                    <option value="Baridhara">Baridhara</option>
                    <option value="Mirpur DOHS">Mirpur DOHS</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Message / Special Requirements
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-medium text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-100 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-[11px] text-stone-500 dark:text-stone-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  <span>Confidential & 100% Protected</span>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold text-xs rounded-xl hover:bg-stone-800 dark:hover:bg-stone-100 transition-all shadow-sm flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request Advisor Callback</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
