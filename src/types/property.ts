export type ListingType = 'buy' | 'rent' | 'commercial';
export type PropertyCategory = 'Apartment' | 'Penthouse' | 'Duplex' | 'Commercial Space' | 'Plot / Land';
export type CompletionStatus = 'Ready to Move' | 'Under Construction' | 'Upcoming';

export interface PropertyAgent {
  name: string;
  role: string;
  phone: string;
  whatsapp: string;
  avatar: string;
  experienceYears: number;
}

export interface LegalAudit {
  rajukApproved: boolean;
  rajukPermitNo: string;
  titleDeedVetted: boolean;
  mutationCleared: boolean;
  taxUpdated: boolean;
  encumbranceFree: boolean;
  landSharePercentage: string;
}

export interface Property {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  listingType: ListingType;
  category: PropertyCategory;
  priceBDT: number; // in BDT (e.g., 24000000 = 2.4 Crore)
  priceDisplay: string; // e.g. "৳ 2.40 Crore" or "৳ 1.25 Lakh / mo"
  pricePerSft: number;
  location: {
    area: string; // e.g. "Gulshan-2"
    zone: string; // e.g. "North Dhaka"
    address: string;
    coordinates?: { lat: number; lng: number };
  };
  specs: {
    bedrooms: number;
    bathrooms: number;
    balconies: number;
    areaSft: number;
    floor: number;
    totalFloors: number;
    facing: 'North' | 'South' | 'East' | 'West' | 'North-East' | 'South-East';
    parkingSpots: number;
    handoverYear: number;
    completionStatus: CompletionStatus;
  };
  amenities: string[];
  images: string[];
  featured: boolean;
  exclusive: boolean;
  verified: boolean;
  virtualTourAvailable: boolean;
  legal: LegalAudit;
  agent: PropertyAgent;
  description: string;
}

export interface PropertyFilterState {
  listingType: ListingType;
  searchQuery: string;
  area: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number | null;
  completionStatus: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'sft-desc' | 'newest';
  onlyVerified: boolean;
}

export interface MortgageCalculation {
  propertyPrice: number;
  downPaymentPercent: number;
  downPaymentAmount: number;
  loanAmount: number;
  interestRate: number;
  tenureYears: number;
  monthlyEMI: number;
  totalInterest: number;
  totalPayment: number;
}

export interface NeighborhoodData {
  id: string;
  name: string;
  tagline: string;
  avgPricePerSft: string;
  rentalYield: string;
  metroStatus: string;
  topHighlights: string[];
  safetyScore: number;
}
