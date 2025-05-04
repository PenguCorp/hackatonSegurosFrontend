import React, { useRef, useState, useEffect } from 'react';

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
}

export const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const getPercentage = (value: number) => {
    return ((value - min) / (max - min)) * 100;
  };
  
  const getValueFromPosition = (position: number) => {
    const percentage = position;
    const rawValue = ((percentage / 100) * (max - min)) + min;
    const steppedValue = Math.round(rawValue / step) * step;
    
    return Math.min(max, Math.max(min, steppedValue));
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    
    const rect = trackRef.current.getBoundingClientRect();
    const position = ((e.clientX - rect.left) / rect.width) * 100;
    
    onChange(getValueFromPosition(position));
    setIsDragging(true);
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    
    const rect = trackRef.current.getBoundingClientRect();
    const position = ((e.clientX - rect.left) / rect.width) * 100;
    
    onChange(getValueFromPosition(position));
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);
  
  const percentage = getPercentage(value);
  
  return (
    <div className="relative w-full h-6 flex items-center cursor-pointer">
      <div
        ref={trackRef}
        className="w-full h-2 bg-slate-200 dark:bg-slate-500 rounded-full overflow-hidden"
        onMouseDown={handleMouseDown}
      >
        <div
          className="h-full bg-[#ffd300] rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div
        className="absolute w-5 h-5 rounded-full bg-white border-2 border-[#003696] shadow transform -translate-x-1/2"
        style={{ left: `${percentage}%` }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};