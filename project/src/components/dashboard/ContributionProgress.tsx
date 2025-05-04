import React from 'react';
import { motion } from 'framer-motion';
import { CircleDollarSign, Info, TrendingUp } from 'lucide-react';
import { Card } from '../ui/dashboard_card';
import { Tooltip } from '../ui/Tooltip';
import { formatCurrency } from '../../utils/formatters';
import { ContributionData } from '../../types';

interface ContributionProgressProps {
  data: ContributionData;
}

export const ContributionProgress: React.FC<ContributionProgressProps> = ({ data }) => {
  const percentage = (data.accumulated / data.targetAmount) * 100;
  const formattedPercentage = Math.min(100, Math.round(percentage * 10) / 10);
  const remaining = data.targetAmount - data.accumulated;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className="col-span-1"
    >
      <Card>
        <Card.Header className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Card.Title className="text-lg">Progreso de Aportes Acumulados</Card.Title>
              <Tooltip content="Progreso hacia su meta de anualidad según cláusula 6 del contrato">
                <Info size={16} className="text-slate-400 cursor-help" />
              </Tooltip>
            </div>
            <CircleDollarSign size={20} className="text-[#ffd300]" />
          </div>
          <Card.Description>
            Seguimiento de su progreso hacia la activación de la anualidad
          </Card.Description>
        </Card.Header>
        
        <Card.Content>
          <div className="space-y-6">
            <div className="flex justify-between items-end mb-2">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Acumulado</p>
                <p className="text-2xl font-bold">{formatCurrency(data.accumulated)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500 dark:text-slate-400">Meta</p>
                <p className="text-2xl font-bold">{formatCurrency(data.targetAmount)}</p>
              </div>
            </div>
            
            <div className="relative pt-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="text-sm font-medium">{formattedPercentage}% Completado</span>
                  {data.trend > 0 && (
                    <div className="flex items-center ml-2 text-green-500 text-xs">
                      <TrendingUp size={14} className="mr-1" />
                      +{data.trend}%
                    </div>
                  )}
                </div>
              </div>
              
              <div className="overflow-hidden h-3 text-xs flex rounded-full bg-slate-200 dark:bg-slate-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${formattedPercentage}%` }}
                  transition={{ 
                    duration: 1, 
                    ease: "easeOut",
                    delay: 0.2 
                  }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#ffd300] rounded-full"
                />
              </div>
            </div>
            
            <div className="bg-gray-200 p-4 rounded-lg mt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-800">Restante</p>
                <p className="text-xl font-bold text-green-700">{formatCurrency(remaining)}</p>
              </div>

              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">Finalización estimada</p>
                <p className="text-xl font-bold">{data.estimatedCompletionDate}</p>
              </div>
            </div>

            <p className="text-sm text-gray-700 mt-3">
              {data.nextContributionDate && (
                <>Su próxima contribución de <span className="text-amber-700">{formatCurrency(data.currentAmount)}</span> está programada para el {data.nextContributionDate}.</>
              )}
            </p>
          </div>



          </div>
        </Card.Content>
      </Card>
    </motion.div>
  );
};