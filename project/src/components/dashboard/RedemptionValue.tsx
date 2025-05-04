import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Calendar, DollarSign, Info } from 'lucide-react';
import { Card } from '../ui/dashboard_card';
import { Tooltip } from '../ui/Tooltip';
import { formatCurrency } from '../../utils/formatters';
import { RedemptionValueData } from '../../types';

interface RedemptionValueProps {
  value: RedemptionValueData;
}

export const RedemptionValue: React.FC<RedemptionValueProps> = ({ value }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'now' | '1year' | '3years'>('now');
  
  const timeframes = {
    now: {
      label: 'Actual',
      value: value.currentValue,
      penalty: value.currentPenalty,
      penaltyPercentage: value.currentPenaltyPercentage
    },
    '1year': {
      label: 'En 1 Año',
      value: value.oneYearValue,
      penalty: value.oneYearPenalty,
      penaltyPercentage: value.oneYearPenaltyPercentage
    },
    '3years': {
      label: 'En 3 Años',
      value: value.threeYearValue,
      penalty: value.threeYearPenalty,
      penaltyPercentage: value.threeYearPenaltyPercentage
    }
  };
  
  const selectedData = timeframes[selectedTimeframe];
  const penaltyAmount = selectedData.penalty;
  const originalAmount = selectedData.value + penaltyAmount;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.6 }}
      className="col-span-1"
    >
      <Card>
        <Card.Header className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Card.Title className="text-lg">Valor de Rescate Rstimado</Card.Title>
              <Tooltip content="Basado en la cláusula 20 del contrato">
                <Info size={16} className="text-slate-400 cursor-help" />
              </Tooltip>
            </div>
            <DollarSign size={20} className="text-[#ff0000]" />
          </div>
          <Card.Description>
            Lo que recibiría si rescata anticipadamente
          </Card.Description>
        </Card.Header>
        
        <Card.Content>
          <div className="space-y-6">
            <div className="flex bg-red-100 rounded-lg p-1">
              {Object.entries(timeframes).map(([key, tf]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTimeframe(key as any)}
                  className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    selectedTimeframe === key
                      ? 'bg-red-600 text-white shadow-md'
                      : 'text-red-600 hover:bg-red-200'
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>

            
            <div className="text-center py-3">
              <motion.div
                key={selectedTimeframe}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-slate-800 text-sm mb-1">Recibiría</h3>
                <p className="text-3xl font-bold">{formatCurrency(selectedData.value)}</p>
                
                <div className="flex items-center justify-center mt-1 text-sm text-[#ff0000] dark:text-[#ff6666]">
                  <Calendar size={14} className="mr-1.5" />
                  {selectedTimeframe === 'now' 
                    ? 'Si rescata hoy' 
                    : `Si rescata ${selectedTimeframe === '1year' ? 'en 1 año' : 'en 3 años'}`
                  }
                </div>
              </motion.div>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-900/30">
              <div className="flex items-start gap-2">
                <AlertCircle size={18} className="text-[#ff0000] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-800  text-sm">Penalización por rescate anticipado</h4>
                  <p className="text-xs text-red-700 mt-1">
                    El rescate anticipado incurre en una penalización del {selectedData.penaltyPercentage}% ({formatCurrency(penaltyAmount)}).
                    Su valor acumulado total es {formatCurrency(originalAmount)}.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Contribuciones totales</span>
                <span className="font-medium">{formatCurrency(value.totalContributions)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Interés ganado</span>
                <span className="font-medium">{formatCurrency(value.interestEarned)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Monto de penalización</span>
                <span className="font-medium text-[#ff0000] dark:text-[#ff6666]">-{formatCurrency(penaltyAmount)}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between">
                <span className="font-medium">Valor neto de redención</span>
                <span className="font-bold">{formatCurrency(selectedData.value)}</span>
              </div>
            </div>
          </div>
        </Card.Content>
      </Card>
    </motion.div>
  );
};