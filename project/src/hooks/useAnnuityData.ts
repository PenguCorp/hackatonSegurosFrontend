import { useState } from 'react';
import { 
  User, 
  ContributionData, 
  AnnuityProjection, 
  RedemptionValueData,
  AdjustmentSimulationResult
} from '../types';

export const useAnnuityData = () => {
  // Mock user data
  const [user] = useState<User>({
    id: '1',
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@ejemplo.com',
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    profileCompletionPercentage: 65,
    lastLogin: '2023-09-15',
    plan: 'Premium'
  });

  // Mock contribution data
  const [contributionData] = useState<ContributionData>({
    currentAmount: 250000,
    frequency: 'mensual',
    accumulated: 8750000,
    targetAmount: 15000000,
    estimatedCompletionDate: 'Diciembre 2025',
    nextContributionDate: '15 de Octubre 2023',
    trend: 2.5
  });

  // Mock annuity projection
  const [annuityProjection] = useState<AnnuityProjection>({
    monthlyAmount: 1250000,
    annualAmount: 15000000,
    projectedGrowth: 4.2,
    retirementAge: 62,
    currentAge: 42,
    yearsToRetirement: 20,
    contributionYears: 10,
    taxBenefit: 1200000,
    chartData: {
      labels: ['2023', '2024', '2025', '2026', '2027', '2028'],
      values: [15000000, 16500000, 18200000, 20100000, 22200000, 24500000]
    }
  });

  // Mock redemption value
  const [redemptionValue] = useState<RedemptionValueData>({
    currentValue: 7875000,
    currentPenalty: 875000,
    currentPenaltyPercentage: 10,
    oneYearValue: 9100000,
    oneYearPenalty: 650000,
    oneYearPenaltyPercentage: 6.5,
    threeYearValue: 11250000,
    threeYearPenalty: 250000,
    threeYearPenaltyPercentage: 2.2,
    totalContributions: 8000000,
    interestEarned: 750000
  });

  // Simulate adjustment function
  const simulateAdjustment = (amount: number, frequency: string): AdjustmentSimulationResult => {
    const currentMonthlyEquivalent = contributionData.currentAmount;
    const newMonthlyEquivalent = frequency === 'mensual' 
      ? amount 
      : frequency === 'trimestral' 
        ? amount / 3 
        : amount / 12;
    
    const percentageChange = (newMonthlyEquivalent - currentMonthlyEquivalent) / currentMonthlyEquivalent;
    
    return {
      originalAnnuity: annuityProjection.monthlyAmount,
      newAnnuity: Math.round(annuityProjection.monthlyAmount * (1 + percentageChange * 0.7)),
      originalTimeframe: 'Diciembre 2025',
      newTimeframe: percentageChange > 0 ? 'Junio 2025' : 'Junio 2026',
      originalTotalContributions: 15000000,
      newTotalContributions: Math.round(15000000 * (1 + percentageChange)),
      recommendation: percentageChange > 0 
        ? 'El aumento en sus aportes reducirá el tiempo para alcanzar su meta.'
        : 'La reducción en sus aportes aumentará el tiempo para alcanzar su meta.'
    };
  };

  return {
    user,
    contributionData,
    annuityProjection,
    redemptionValue,
    simulateAdjustment
  };
};