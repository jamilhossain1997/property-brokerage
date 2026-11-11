import React, { useState } from 'react';
import { Calculator, Landmark, ShieldCheck } from 'lucide-react';
import { calculateMortgageEMI, formatBDT } from '../utils/calculator';

export const MortgageCalculatorSection: React.FC = () => {
  const [propertyPrice, setPropertyPrice] = useState(25000000); // 2.5 Crore default
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [tenureYears, setTenureYears] = useState(20);
  const [interestRate, setInterestRate] = useState(9.5);

  const emiData = calculateMortgageEMI(
    propertyPrice,
    downPaymentPercent,
    interestRate,
    tenureYears
  );

  const banks = [
    {
      name: 'DBH Finance',
      type: 'Specialized Housing Financier',
      rate: '9.00% - 9.75%',
      maxTenure: '25 Years',
      highlights: 'Fastest approval in Dhaka, up to 80% financing of verified apartments.',
    },
    {
      name: 'IPDC Finance',
      type: 'Non-Banking Financial Institution',
      rate: '9.25% - 10.25%',
      maxTenure: '25 Years',
      highlights: 'Dedicated expat NRI home loans & under-construction stage financing.',
    },
    {
      name: 'Standard Chartered BD',
      type: 'Multinational Bank',
      rate: '8.75% - 9.50%',
      maxTenure: '20 Years',
      highlights: 'MortgageOne interest-offset facility reducing total interest payable.',
    },
    {
      name: 'BRAC Bank',
      type: 'Private Commercial Bank',
      rate: '9.50% - 10.50%',
      maxTenure: '25 Years',
      highlights: 'Apon Nibash flexible repayment options for salaried and business professionals.',
    },
  ];

  return (
    <section id="mortgage-calculator" className="py-16 sm:py-24 bg-stone-100/60 dark:bg-stone-900/40 border-t border-stone-200/80 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-stone-200/80 dark:bg-stone-800 text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 text-stone-900 dark:text-amber-400" />
            <span>BANGLADESH HOME FINANCING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-950 dark:text-white font-display tracking-tight text-balance">
            Calculate Your Monthly Property EMI
          </h2>
          <p className="text-sm sm:text-base font-medium text-stone-600 dark:text-stone-300 mt-3 leading-relaxed">
            Estimate your monthly installments based on Bangladesh Bank regulations, current NBFI interest rates, and loan tenure caps.
          </p>
        </div>

        {/* 2-Column Calculator Box with Frosted Glass & Rounded-2xl */}
        <div className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md rounded-2xl border border-stone-200/90 dark:border-stone-800 shadow-xl p-6 sm:p-8 lg:p-10 mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left 7 Columns: Interactive Controls */}
            <div className="lg:col-span-7 space-y-7">
              {/* Property Price Slider */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="mortgage-property-budget" className="font-semibold text-stone-700 dark:text-stone-300">Property Budget (BDT)</label>
                  <span className="text-lg font-extrabold text-stone-950 dark:text-white font-display tabular-nums">
                    {formatBDT(propertyPrice)}
                  </span>
                </div>
                <input
                  id="mortgage-property-budget"
                  type="range"
                  min="5000000"
                  max="100000000"
                  step="1000000"
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
                />
                <div className="flex justify-between text-[11px] text-stone-400 font-semibold">
                  <span>৳ 50 Lakh</span>
                  <span>৳ 5 Crore</span>
                  <span>৳ 10 Crore</span>
                </div>
              </div>

              {/* Down Payment Slider */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="mortgage-down-payment" className="font-semibold text-stone-700">
                    Down Payment ({downPaymentPercent}%)
                  </label>
                  <span className="text-base font-bold text-stone-900 font-display tabular-nums">
                    {formatBDT(emiData.downPaymentAmount)}
                  </span>
                </div>
                <input
                  id="mortgage-down-payment"
                  type="range"
                  min="10"
                  max="60"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
                />
                <div className="flex justify-between text-[11px] text-stone-400 font-semibold">
                  <span>10% (Minimum)</span>
                  <span>30%</span>
                  <span>60%</span>
                </div>
              </div>

              {/* Loan Tenure & Interest Rate Grid with Rounded-xl inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label htmlFor="mortgage-loan-tenure" className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                    Loan Tenure (Years)
                  </label>
                  <select
                    id="mortgage-loan-tenure"
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full p-3 bg-stone-50 dark:bg-stone-800 border border-stone-200/90 dark:border-stone-700 rounded-xl text-sm font-semibold text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-100 transition-all"
                  >
                    <option value={5}>5 Years (60 Months)</option>
                    <option value={10}>10 Years (120 Months)</option>
                    <option value={15}>15 Years (180 Months)</option>
                    <option value={20}>20 Years (240 Months)</option>
                    <option value={25}>25 Years (300 Months)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="mortgage-interest-rate" className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                    Interest Rate (% per annum)
                  </label>
                  <select
                    id="mortgage-interest-rate"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full p-3 bg-stone-50 dark:bg-stone-800 border border-stone-200/90 dark:border-stone-700 rounded-xl text-sm font-semibold text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-100 transition-all"
                  >
                    <option value={8.5}>8.5% (Subsidized / Expat)</option>
                    <option value={9.0}>9.0% (Prime Tier-1 Bank)</option>
                    <option value={9.5}>9.5% (Average Market Rate)</option>
                    <option value={10.5}>10.5% (Standard NBFI)</option>
                    <option value={11.5}>11.5% (Commercial High)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Result Visual Card with Soft Depth */}
            <div className="lg:col-span-5 bg-stone-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl border border-white/10">
              <div>
                <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                  Estimated Monthly EMI
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-display tabular-nums tracking-tight mb-2">
                  {formatBDT(emiData.monthlyEMI)}
                  <span className="text-xs font-normal text-stone-400 ml-1.5">/ month</span>
                </div>
                <p className="text-xs text-stone-400 mb-6 font-medium">
                  Based on a total loan amount of {formatBDT(emiData.loanAmount)} over {tenureYears} years.
                </p>

                {/* Progress Visualizer: Principal vs Interest */}
                <div className="space-y-2 mb-6">
                  <div className="h-3 w-full bg-stone-800 rounded-full overflow-hidden flex">
                    <div
                      className="bg-amber-400 h-full transition-all duration-500"
                      style={{
                        width: `${Math.round(
                          (emiData.loanAmount / emiData.totalPayment) * 100
                        )}%`,
                      }}
                      title="Principal"
                    />
                    <div
                      className="bg-stone-700 h-full transition-all duration-500"
                      style={{
                        width: `${Math.round(
                          (emiData.totalInterest / emiData.totalPayment) * 100
                        )}%`,
                      }}
                      title="Total Interest"
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-stone-300 font-medium">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 bg-amber-400 rounded-xs" />
                      <span>Principal: {formatBDT(emiData.loanAmount)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 bg-stone-700 rounded-xs" />
                      <span>Interest: {formatBDT(emiData.totalInterest)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-800 space-y-2 text-xs text-stone-300">
                  <div className="flex justify-between">
                    <span>Total Amount Payable:</span>
                    <span className="font-bold text-white tabular-nums">
                      {formatBDT(emiData.totalPayment)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Income Required (approx):</span>
                    <span className="font-bold text-amber-300 tabular-nums">
                      {formatBDT(Math.round(emiData.monthlyEMI * 2.2))}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="https://wa.me/8801755662414?text=Hello%20BrokerageBD,%20I%20would%20like%20assistance%20with%20Home%20Loan%20pre-approval%20for%20my%20property%20purchase."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Landmark className="w-4 h-4" />
                  <span>Get Pre-Approved with Bank Partners</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bank Partner Comparison Grid */}
        <div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-white font-display mb-4">
            Compare Top Housing Finance Partners in Bangladesh
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {banks.map((bank, i) => (
              <div
                key={i}
                className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/90 dark:border-stone-800 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow text-stone-900 dark:text-stone-100"
              >
                <div>
                  <h4 className="text-sm font-bold text-stone-900 dark:text-white font-display mb-0.5">
                    {bank.name}
                  </h4>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium block mb-3">
                    {bank.type}
                  </span>
                  <div className="space-y-1.5 mb-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-stone-500 dark:text-stone-400">Interest Rate:</span>
                      <span className="font-semibold text-stone-900 dark:text-white">{bank.rate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500 dark:text-stone-400">Max Tenure:</span>
                      <span className="font-semibold text-stone-900 dark:text-white">{bank.maxTenure}</span>
                    </div>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                    {bank.highlights}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
