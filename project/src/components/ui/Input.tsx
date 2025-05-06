import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, fullWidth = true, icon, ...props }, ref) => {
    const wrapperClass = `relative ${fullWidth ? "w-full" : ""}`;
    const inputBaseClass =
      "block rounded-md border py-2 shadow-sm transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-1";
    const borderClass = error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
      : "border-slate-300 focus:border-blue-500 focus:ring-blue-500";
    const paddingClass = icon ? "pl-10" : "px-3";
    const themeClass = "bg-white text-slate-900";
    const fullWidthClass = fullWidth ? "w-full" : "";
    const finalInputClass = `${inputBaseClass} ${borderClass} ${paddingClass} ${themeClass} ${fullWidthClass} ${className}`;

    return (
      <div className={wrapperClass}>
        {label && (
          <label
            className="block text-sm font-medium text-slate-700 mb-1"
            htmlFor={props.id}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              {icon}
            </div>
          )}
          <input ref={ref} className={finalInputClass} {...props} />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
