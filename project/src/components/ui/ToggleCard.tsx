import React from "react";

interface ToggleCardProps {
  label: string;
  icon: React.ReactNode;
  checked: boolean;
  onChange: () => void;
}

export const ToggleCard: React.FC<ToggleCardProps> = ({ label, icon, checked, onChange }) => {
  return (
    <div
      className={`p-4 border rounded-lg cursor-pointer ${
        checked ? "bg-blue-100 border-blue-500" : "bg-white border-gray-300"
      }`}
      onClick={onChange}
    >
      <div className="flex items-center space-x-3">
        <div>{icon}</div>
        <div className="text-sm font-medium">{label}</div>
      </div>
    </div>
  );
};