import React from 'react';
import { Users, Quote } from 'lucide-react';

export const TrustAndTestimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Syed Rafiul Islam',
      role: 'Managing Director, Horizon Tech Group',
      location: 'Buyer of 3,850 sft Penthouse, Gulshan-2',
      content:
        'In Dhaka real estate, buying off-plan or resale is typically fraught with anxiety over mutation and land share percentages. Property Brokerage BD verified the entire 30-year Khatian chain, obtained original Rajuk sanctions, and closed our deed escrow seamlessly.',
      stats: 'Transacted: ৳ 5.40 Cr',
    },
    {
      name: 'Dr. Shahana Parveen',
      role: 'Consultant Cardiologist, Evercare Hospital',
      location: 'Buyer of 2,231 sft Residence, Bashundhara Block C',
      content:
        'I had spent 6 months contacting unverified brokers who changed prices at the final meeting. Property Brokerage BD was transparent from day one—zero hidden broker commission and 100% adherence to agreed terms.',
      stats: 'Transacted: ৳ 2.40 Cr',
    },
    {
      name: 'Kazi M. Rahman',
      role: 'Expat Resident (London, UK)',
      location: 'Landlord & Seller, Banani Commercial Floor',
      content:
        'Managing property in Bangladesh from abroad used to be impossible. Property Brokerage BD conducted high-res video tours, managed tenant screening for our Kemal Ataturk corporate floor, and handled all tax document clearances.',
      stats: 'Transacted: ৳ 9.50 Cr',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-stone-100/40 dark:bg-stone-900/40 border-t border-stone-200/80 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Metrics Strip with Deep Frosted Contrast */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 sm:p-10 bg-stone-950 text-white rounded-2xl mb-16 shadow-2xl border border-white/10">
          <div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-amber-400 tabular-nums">
              ৳ 420 Cr+
            </div>
            <div className="text-xs sm:text-sm text-stone-300 mt-1 font-medium">
              Vetted Dhaka Transactions
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tabular-nums">
              100%
            </div>
            <div className="text-xs sm:text-sm text-stone-300 mt-1 font-medium">
              Title & Mutation Clearance
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tabular-nums">
              9,000+
            </div>
            <div className="text-xs sm:text-sm text-stone-300 mt-1 font-medium">
              Registered Real Estate Seekers
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-amber-400 tabular-nums">
              0%
            </div>
            <div className="text-xs sm:text-sm text-stone-300 mt-1 font-medium">
              Hidden Broker Markups
            </div>
          </div>
        </div>

        {/* Testimonials Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200/80 dark:bg-stone-800 text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5 text-stone-900 dark:text-amber-400" />
            <span>VERIFIED CLIENT EXPERIENCES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-950 dark:text-white font-display tracking-tight text-balance">
            Trusted by Expatriates, Corporate Leaders, and Family Offices
          </h2>
          <p className="text-sm sm:text-base font-medium text-stone-600 dark:text-stone-300 mt-3 leading-relaxed">
            Real feedback from property buyers and landlords transacting in Dhaka's most prestigious avenues.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-7 bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-2xl flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow text-stone-900 dark:text-stone-100"
            >
              <div>
                <Quote className="w-7 h-7 text-stone-300 dark:text-stone-700 mb-4" />
                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed mb-6 font-normal">
                  "{t.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
                <div className="font-extrabold text-sm text-stone-900 dark:text-white font-display">
                  {t.name}
                </div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">{t.role}</div>
                <div className="text-[11px] text-stone-600 dark:text-stone-300 font-semibold mt-1">
                  {t.location}
                </div>
                <div className="text-xs font-bold text-emerald-800 dark:text-emerald-400 mt-1.5">
                  {t.stats}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
