import React, { forwardRef } from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", label, error, ...props }, ref) => {
    const inputClass = `h-4 w-4 rounded border-slate-300 text-blue-600 transition-colors focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 ${
      error ? "border-red-500" : ""
    } ${className}`;

    return (
      <div className="flex items-start">
        <div className="flex h-5 items-center">
          <input
            ref={ref}
            type="checkbox"
            className={inputClass}
            {...props}
          />
        </div>
        <div className="ml-2 text-sm">
          <label
            className="font-medium text-slate-700"
            htmlFor={props.id}
          >
            {label}
          </label>
          {error && (
            <p className="mt-1 text-sm text-red-600">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
