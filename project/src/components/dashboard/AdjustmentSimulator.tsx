import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sliders, ArrowRight, Info, Calculator, RefreshCw } from 'lucide-react';
import { Card } from '../ui/dashboard_card';
import { Tooltip } from '../ui/Tooltip';
import { Slider } from '../ui/Slider';
import { Select } from '../ui/dashboard_select';
import { formatCurrency } from '../../utils/formatters';

interface AdjustmentSimulatorProps {
  currentContribution: number;
  currentFrequency: string;
  onSimulate: (amount: number, frequency: string) => any;
}

export const AdjustmentSimulator: React.FC<AdjustmentSimulatorProps> = ({ 
  currentContribution, 
  currentFrequency,
  onSimulate
}) => {
  const [amount, setAmount] = useState(currentContribution);
  const [frequency, setFrequency] = useState(currentFrequency);
  const [results, setResults] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  const minAmount = Math.floor(currentContribution * 0.5);
  const maxAmount = Math.ceil(currentContribution * 2);
  
  const frequencyOptions = [
    { value: 'mensual', label: 'Mensual' },
    { value: 'trimestral', label: 'Trimestral' },
    { value: 'anual', label: 'Anual' }
  ];
  
  useEffect(() => {
    // Reset results when inputs change
    setResults(null);
  }, [amount, frequency]);
  
  const handleSimulate = () => {
    setIsCalculating(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      const simulationResults = onSimulate(amount, frequency);
      setResults(simulationResults);
      setIsCalculating(false);
    }, 800);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.7 }}
      className="col-span-1"
    >
      <Card>
        <Card.Header className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Card.Title className="text-lg text-[#003696]">Simulador de Ajuste Voluntario</Card.Title>
              <Tooltip content="Basado en la cláusula 7 del contrato">
                <Info size={16} className="text-[#003696] cursor-help" />
              </Tooltip>
            </div>
            <Sliders size={20} className="text-[#ffd300]" />
          </div>
          <Card.Description>
            Simule cambios a su plan de contribución
          </Card.Description>
        </Card.Header>
        
        <Card.Content>
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-[#003696]">Monto de Contribución</label>
                  <span className="text-sm font-medium text-[#003696]">{formatCurrency(amount)}</span>
                </div>
                <Slider 
                  min={minAmount} 
                  max={maxAmount}
                  step={10}
                  value={amount}
                  onChange={setAmount}
                />
                <div className="flex justify-between text-xs text-[#003696] mt-1">
                  <span>{formatCurrency(minAmount)}</span>
                  <span>{formatCurrency(maxAmount)}</span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-[#003696] mb-1.5 block">Frecuencia de Contribución</label>
                <Select
                  value={frequency}
                  onChange={(value) => setFrequency(value)}
                  options={frequencyOptions}
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSimulate}
                className="w-full bg-[#003696] hover:bg-[#002a80] text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center mt-2"
                disabled={isCalculating}
              >
                {isCalculating ? (
                  <>
                    <RefreshCw size={18} className="mr-2 animate-spin" />
                    Calculando...
                  </>
                ) : (
                  <>
                    <Calculator size={18} className="mr-2" />
                    Ejecutar Simulación
                  </>
                )}
              </motion.button>
            </div>
            
            {results && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="border border-[#003696] rounded-lg overflow-hidden"
              >
                <div className="bg-[#ffd300] px-4 py-2">
                  <h3 className="font-medium text-[#003696]">Resultados de la Simulación</h3>
                </div>
                
                <div className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#003696]">Nueva anualidad mensual</span>
                    <div className="flex items-center">
                      <span className="text-[#003696] line-through mr-2 text-sm">
                        {formatCurrency(results.originalAnnuity)}
                      </span>
                      <ArrowRight size={14} className="mr-2 text-[#003696]" />
                      <span className="font-bold text-[#003696]">{formatCurrency(results.newAnnuity)}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#003696]">Tiempo hasta completar</span>
                    <div className="flex items-center">
                      <span className="text-[#003696] line-through mr-2 text-sm">
                        {results.originalTimeframe}
                      </span>
                      <ArrowRight size={14} className="mr-2 text-[#003696]" />
                      <span className="font-bold text-[#003696]">{results.newTimeframe}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#003696]">Contribuciones totales</span>
                    <div className="flex items-center">
                      <span className="text-[#003696] line-through mr-2 text-sm">
                        {formatCurrency(results.originalTotalContributions)}
                      </span>
                      <ArrowRight size={14} className="mr-2 text-[#003696]" />
                      <span className="font-bold text-[#003696]">{formatCurrency(results.newTotalContributions)}</span>
                    </div>
                  </div>
                  
                  {results.recommendation && (
                    <div className="bg-[#003696]/10 p-3 rounded-lg mt-2 text-sm text-[#003696]">
                      <p className="font-medium mb-1">Recomendación</p>
                      <p>{results.recommendation}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </Card.Content>
      </Card>
    </motion.div>
  );
};