import React from 'react';
import { Layout } from '../../components/layout/Insights_layout';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { ProfileCompletion } from '../../components/dashboard/ProfileCompletion';
import { ContributionProgress } from '../../components/dashboard/ContributionProgress';
import { ProjectedAnnuity } from '../../components/dashboard/ProjectedAnnuity';
import { RedemptionValue } from '../../components/dashboard/RedemptionValue';
import { AdjustmentSimulator } from '../../components/dashboard/AdjustmentSimulator';
import { useAnnuityData } from '../../hooks/useAnnuityData';


export const DashboardFullPage: React.FC = () => {

  const { 
    user, 
    contributionData, 
    annuityProjection, 
    redemptionValue,
    simulateAdjustment 
  } = useAnnuityData();

  return (
    <Layout>
      <div className="space-y-6 px-4 py-6 max-w-7xl mx-auto">
        <DashboardHeader user={user} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <ProfileCompletion user={user} />
          </div>
          <div className="md:col-span-2">
            <ContributionProgress data={contributionData} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProjectedAnnuity projection={annuityProjection} />
          <RedemptionValue value={redemptionValue} />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <AdjustmentSimulator 
            currentContribution={contributionData.currentAmount}
            currentFrequency={contributionData.frequency}
            onSimulate={simulateAdjustment}
          />
        </div>
      </div>
    </Layout>
  );
}

