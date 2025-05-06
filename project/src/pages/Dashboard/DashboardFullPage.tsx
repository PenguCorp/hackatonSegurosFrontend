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
      <div className="px-4 py-6 max-w-7xl mx-auto space-y-8">
        <DashboardHeader user={user} />

        {/* Completado del perfil y progreso juntos en ancho completo */}
        <div className="grid grid-cols-1">
          <ProfileCompletion user={user} />
        </div>
        <div className="grid grid-cols-1">
          <ContributionProgress data={contributionData} />
        </div>

        {/* Proyecciones: renta y rescate */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProjectedAnnuity projection={annuityProjection} />
          <RedemptionValue value={redemptionValue} />
        </div>

        {/* Simulador en una sola tarjeta del mismo ancho */}
        <div className="grid grid-cols-1">
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