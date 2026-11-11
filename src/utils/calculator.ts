import { Property, PropertyFilterState, MortgageCalculation } from '../types/property';

/**
 * Calculates monthly mortgage payment (EMI) and breakdown
 * Formula: EMI = [P x r x (1+r)^n] / [(1+r)^n - 1]
 */
export function calculateMortgageEMI(
  propertyPrice: number,
  downPaymentPercent: number = 20,
  interestRate: number = 9.5,
  tenureYears: number = 20
): MortgageCalculation {
  const downPaymentAmount = Math.round(propertyPrice * (downPaymentPercent / 100));
  const loanAmount = propertyPrice - downPaymentAmount;

  if (loanAmount <= 0) {
    return {
      propertyPrice,
      downPaymentPercent,
      downPaymentAmount,
      loanAmount: 0,
      interestRate,
      tenureYears,
      monthlyEMI: 0,
      totalInterest: 0,
      totalPayment: downPaymentAmount,
    };
  }

  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  let monthlyEMI = 0;
  if (monthlyRate === 0) {
    monthlyEMI = loanAmount / totalMonths;
  } else {
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    monthlyEMI = Math.round((loanAmount * monthlyRate * factor) / (factor - 1));
  }

  const totalPayment = Math.round(monthlyEMI * totalMonths);
  const totalInterest = Math.max(0, totalPayment - loanAmount);

  return {
    propertyPrice,
    downPaymentPercent,
    downPaymentAmount,
    loanAmount,
    interestRate,
    tenureYears,
    monthlyEMI,
    totalInterest,
    totalPayment,
  };
}

/**
 * Formats a Bangladeshi Taka amount into standard Crore / Lakh representations
 */
export function formatBDT(amount: number, isMonthlyRent: boolean = false): string {
  if (isNaN(amount) || amount === 0) return '৳ 0';

  if (isMonthlyRent) {
    if (amount >= 100000) {
      const lakhs = (amount / 100000).toFixed(2);
      return `৳ ${lakhs.endsWith('.00') ? lakhs.slice(0, -3) : lakhs} Lakh / mo`;
    }
    return `৳ ${amount.toLocaleString('en-IN')} / mo`;
  }

  // 1 Crore = 10,000,000
  if (amount >= 10000000) {
    const crores = (amount / 10000000).toFixed(2);
    return `৳ ${crores.endsWith('.00') ? crores.slice(0, -3) : crores} Crore`;
  }

  // 1 Lakh = 100,000
  if (amount >= 100000) {
    const lakhs = (amount / 100000).toFixed(2);
    return `৳ ${lakhs.endsWith('.00') ? lakhs.slice(0, -3) : lakhs} Lakh`;
  }

  return `৳ ${amount.toLocaleString('en-IN')}`;
}

/**
 * Calculates price per square foot
 */
export function calculatePricePerSft(priceBDT: number, areaSft: number): number {
  if (!areaSft || areaSft <= 0) return 0;
  return Math.round(priceBDT / areaSft);
}

/**
 * Pure function to filter and sort property listings
 */
export function filterProperties(
  properties: Property[],
  filter: PropertyFilterState
): Property[] {
  return properties
    .filter((prop) => {
      // Listing type match
      if (filter.listingType && prop.listingType !== filter.listingType) {
        return false;
      }

      // Area filter
      if (
        filter.area &&
        filter.area !== 'all' &&
        prop.location.area.toLowerCase() !== filter.area.toLowerCase()
      ) {
        return false;
      }

      // Category filter
      if (
        filter.category &&
        filter.category !== 'all' &&
        prop.category.toLowerCase() !== filter.category.toLowerCase()
      ) {
        return false;
      }

      // Min/Max price
      if (filter.minPrice && prop.priceBDT < filter.minPrice) {
        return false;
      }
      if (filter.maxPrice && prop.priceBDT > filter.maxPrice) {
        return false;
      }

      // Bedrooms
      if (filter.bedrooms !== null && prop.specs.bedrooms < filter.bedrooms) {
        return false;
      }

      // Completion status
      if (
        filter.completionStatus &&
        filter.completionStatus !== 'all' &&
        prop.specs.completionStatus !== filter.completionStatus
      ) {
        return false;
      }

      // Verified check
      if (filter.onlyVerified && !prop.verified) {
        return false;
      }

      // Search Query matching title, address, description, area
      if (filter.searchQuery.trim()) {
        const q = filter.searchQuery.toLowerCase().trim();
        const matchesQuery =
          prop.title.toLowerCase().includes(q) ||
          prop.location.area.toLowerCase().includes(q) ||
          prop.location.address.toLowerCase().includes(q) ||
          prop.category.toLowerCase().includes(q) ||
          prop.specs.areaSft.toString().includes(q);

        if (!matchesQuery) return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (filter.sortBy) {
        case 'price-asc':
          return a.priceBDT - b.priceBDT;
        case 'price-desc':
          return b.priceBDT - a.priceBDT;
        case 'sft-desc':
          return b.specs.areaSft - a.specs.areaSft;
        case 'newest':
          return b.specs.handoverYear - a.specs.handoverYear;
        case 'featured':
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });
}

/**
 * Property valuation estimator for Dhaka neighborhoods
 */
export function estimatePropertyValuation(
  area: string,
  areaSft: number,
  category: string,
  condition: 'Brand New' | 'Gently Used' | 'Under Construction' = 'Brand New'
) {
  const baseRatePerSft: Record<string, number> = {
    Gulshan: 18500,
    Banani: 16500,
    Baridhara: 22000,
    'Bashundhara R/A': 9500,
    Dhanmondi: 14000,
    Uttara: 9000,
    'Mirpur DOHS': 8500,
    Mohakhali: 11000,
  };

  const baseRate = baseRatePerSft[area] || 10000;
  let multiplier = 1.0;

  if (category === 'Penthouse' || category === 'Duplex') {
    multiplier *= 1.25;
  } else if (category === 'Commercial Space') {
    multiplier *= 1.4;
  }

  if (condition === 'Brand New') {
    multiplier *= 1.1;
  } else if (condition === 'Under Construction') {
    multiplier *= 0.92;
  }

  const estimatedValue = Math.round(areaSft * baseRate * multiplier);
  const lowRange = Math.round(estimatedValue * 0.94);
  const highRange = Math.round(estimatedValue * 1.06);

  return {
    estimatedValue,
    lowRange,
    highRange,
    ratePerSft: Math.round(baseRate * multiplier),
  };
}
