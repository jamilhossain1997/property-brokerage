import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateMortgageEMI,
  formatBDT,
  calculatePricePerSft,
  filterProperties,
  estimatePropertyValuation,
} from './calculator';
import { Property, PropertyFilterState } from '../types/property';

test('calculateMortgageEMI computes valid monthly payment and interest', () => {
  // 1 Crore = 10,000,000 BDT, 20% down payment = 2,000,000 BDT, Loan = 8,000,000 BDT
  // 20 years tenure at 9.5% interest
  const result = calculateMortgageEMI(10000000, 20, 9.5, 20);

  assert.equal(result.propertyPrice, 10000000);
  assert.equal(result.downPaymentAmount, 2000000);
  assert.equal(result.loanAmount, 8000000);
  // Monthly EMI for 80L at 9.5% for 20 yrs is ~74,557 BDT
  assert.ok(result.monthlyEMI > 70000 && result.monthlyEMI < 80000);
  assert.ok(result.totalInterest > 9000000);
  assert.equal(result.totalPayment, result.monthlyEMI * 240);
});

test('calculateMortgageEMI handles 100% down payment', () => {
  const result = calculateMortgageEMI(5000000, 100, 9.5, 20);
  assert.equal(result.loanAmount, 0);
  assert.equal(result.monthlyEMI, 0);
  assert.equal(result.totalInterest, 0);
});

test('formatBDT formats Crore, Lakh, and Thousand amounts cleanly', () => {
  assert.equal(formatBDT(24000000), '৳ 2.40 Crore');
  assert.equal(formatBDT(14500000), '৳ 1.45 Crore');
  assert.equal(formatBDT(8500000), '৳ 85 Lakh');
  assert.equal(formatBDT(120000, true), '৳ 1.20 Lakh / mo');
  assert.equal(formatBDT(55000, true), '৳ 55,000 / mo');
});

test('calculatePricePerSft calculates accurate square foot rates', () => {
  assert.equal(calculatePricePerSft(24000000, 2231), 10758);
  assert.equal(calculatePricePerSft(14500000, 1291), 11232);
  assert.equal(calculatePricePerSft(0, 0), 0);
});

test('estimatePropertyValuation provides realistic range based on area and type', () => {
  const valuation = estimatePropertyValuation('Gulshan', 2500, 'Apartment', 'Brand New');
  assert.ok(valuation.estimatedValue > 40000000);
  assert.ok(valuation.lowRange < valuation.estimatedValue);
  assert.ok(valuation.highRange > valuation.estimatedValue);
  assert.ok(valuation.ratePerSft > 18000);
});

test('filterProperties handles location, bedrooms, and search keywords', () => {
  const mockProperties: Property[] = [
    {
      id: 'p1',
      title: '2231 sft 3-bedroom flat for sale in Gulshan',
      subtitle: 'Luxury living',
      slug: 'gulshan-3-bed',
      listingType: 'buy',
      category: 'Apartment',
      priceBDT: 24000000,
      priceDisplay: '৳ 2.40 Crore',
      pricePerSft: 10757,
      location: { area: 'Gulshan', zone: 'North Dhaka', address: 'Road 113, Gulshan-2' },
      specs: {
        bedrooms: 3,
        bathrooms: 3,
        balconies: 3,
        areaSft: 2231,
        floor: 6,
        totalFloors: 14,
        facing: 'South',
        parkingSpots: 2,
        handoverYear: 2025,
        completionStatus: 'Ready to Move',
      },
      amenities: ['Lift', 'Generator', 'Gym'],
      images: ['/img1.jpg'],
      featured: true,
      exclusive: true,
      verified: true,
      virtualTourAvailable: true,
      legal: {
        rajukApproved: true,
        rajukPermitNo: 'RAJ-2024-991',
        titleDeedVetted: true,
        mutationCleared: true,
        taxUpdated: true,
        encumbranceFree: true,
        landSharePercentage: '3.2%',
      },
      agent: {
        name: 'Tanvir Ahmed',
        role: 'Senior Advisor',
        phone: '16604',
        whatsapp: '8801755662414',
        avatar: '',
        experienceYears: 10,
      },
      description: 'Stunning luxury flat.',
    },
    {
      id: 'p2',
      title: '1291 sft 2-bedroom flat for sale in Bashundhara',
      subtitle: 'Cozy residence',
      slug: 'bashundhara-2-bed',
      listingType: 'buy',
      category: 'Apartment',
      priceBDT: 14500000,
      priceDisplay: '৳ 1.45 Crore',
      pricePerSft: 11232,
      location: { area: 'Bashundhara', zone: 'North Dhaka', address: 'Block C, Bashundhara R/A' },
      specs: {
        bedrooms: 2,
        bathrooms: 2,
        balconies: 2,
        areaSft: 1291,
        floor: 4,
        totalFloors: 9,
        facing: 'South-East',
        parkingSpots: 1,
        handoverYear: 2024,
        completionStatus: 'Ready to Move',
      },
      amenities: ['Lift', 'Generator'],
      images: ['/img2.jpg'],
      featured: false,
      exclusive: false,
      verified: true,
      virtualTourAvailable: false,
      legal: {
        rajukApproved: true,
        rajukPermitNo: 'RAJ-2023-412',
        titleDeedVetted: true,
        mutationCleared: true,
        taxUpdated: true,
        encumbranceFree: true,
        landSharePercentage: '2.1%',
      },
      agent: {
        name: 'Nadia Rahman',
        role: 'Residential Specialist',
        phone: '16604',
        whatsapp: '8801755662414',
        avatar: '',
        experienceYears: 7,
      },
      description: 'Charming flat.',
    },
  ];

  const defaultFilter: PropertyFilterState = {
    listingType: 'buy',
    searchQuery: '',
    area: 'all',
    category: 'all',
    minPrice: 0,
    maxPrice: 50000000,
    bedrooms: null,
    completionStatus: 'all',
    sortBy: 'featured',
    onlyVerified: false,
  };

  // Filter by Area Gulshan
  const gulshanList = filterProperties(mockProperties, { ...defaultFilter, area: 'Gulshan' });
  assert.equal(gulshanList.length, 1);
  assert.equal(gulshanList[0].id, 'p1');

  // Filter by Bedrooms min 3
  const threeBedList = filterProperties(mockProperties, { ...defaultFilter, bedrooms: 3 });
  assert.equal(threeBedList.length, 1);
  assert.equal(threeBedList[0].id, 'p1');

  // Search keyword "Block C"
  const searchResult = filterProperties(mockProperties, { ...defaultFilter, searchQuery: 'Block C' });
  assert.equal(searchResult.length, 1);
  assert.equal(searchResult[0].id, 'p2');
});
