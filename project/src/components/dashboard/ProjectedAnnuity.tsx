import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Info } from 'lucide-react';
import { Card } from '../ui/dashboard_card';
import { Tooltip } from '../ui/Tooltip';
import { formatCurrency } from '../../utils/formatters';
import { AnnuityProjection } from '../../types';

interface ProjectedAnnuityProps {
  projection: AnnuityProjection;
}

export const ProjectedAnnuity: React.FC<ProjectedAnnuityProps> = ({ projection }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      className="col-span-1"
    >
      <Card>
        <Card.Header className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Card.Title className="text-lg">Valor Proyectado de la Renta</Card.Title>
              <Tooltip content="Proyección basada en sus contribuciones actuales y tasas de crecimiento esperadas">
                <Info size={16} className="text-green-500 cursor-help" />
              </Tooltip>
            </div>
            <TrendingUp size={20} className="text-green-500" />
          </div>
          <Card.Description>
            Estimación de su renta al final del plazo basado en los aportes actuales
          </Card.Description>
        </Card.Header>

        <Card.Content>
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">Renta Mensual Estimada</p>
              <p className="text-3xl font-bold">{formatCurrency(projection.monthlyAmount)}</p>

              <div className="flex items-center gap-2 mt-1 text-sm text-green-500">
                <TrendingUp size={14} className="mr-1" />
                <span>Crecimiento {projection.projectedGrowth}% anual</span>
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg mt-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-700">Renta Anual Estimada</p>
                  <p className="text-xl font-bold text-gray-900">{formatCurrency(projection.annualAmount)}</p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">Beneficio Fiscal Estimado</p>
                  <p className="text-xl font-bold text-green-700">{formatCurrency(projection.taxBenefit)}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">

              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Años Restantes para Meta</span>
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1.5 text-green-500" />
                  <span className="font-medium">{projection.yearsToRetirement} años</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Años de Aportes Realizados</span>
                <span className="font-medium">{projection.contributionYears} años</span>
              </div>
            </div>

            {/* IPC Information */}
            <div className="bg-gray-100 p-4 rounded-lg mt-4">
              <p className="text-sm font-medium text-gray-700">IPC</p>
              <div className="flex justify-between items-center text-xl font-bold text-gray-900">
                <div>
                  <p className="text-sm font-medium text-gray-700">Variación Mensual</p>
                  <p className="text-green-700">1,09%</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Variación Año Corrido</p>
                  <p className="text-green-700">2,01%</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Variación Anual</p>
                  <p className="text-green-700">7,74%</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <div className="h-[70px] flex items-end gap-1">
                {projection.chartData.values.map((value, index) => {
                  const maxValue = Math.max(...projection.chartData.values);
                  const percentage = (value / maxValue) * 100;

                  return (
                    <motion.div
                      key={index}
                      initial={{ height: 0 }}
                      animate={{ height: `${percentage}%` }}
                      transition={{
                        duration: 0.5,
                        delay: 0.2 + index * 0.1,
                      }}
                      className="flex-1 bg-green-500 rounded-t relative group" // Columna verde
                    >
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap bg-slate-800 text-white px-2 py-1 rounded">
                        {formatCurrency(value)}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex justify-between mt-1 text-xs text-slate-500">
                {projection.chartData.labels.map((label, index) => (
                  <div key={index} className="text-center">
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card.Content>
      </Card>
    </motion.div>
  );
};
