import React, { forwardRef } from "react";
import { clsx } from "clsx";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, fullWidth = true, options, ...props }, ref) => {
    return (
      <div className={clsx("relative", fullWidth && "w-full")}>
        {label && (
          <label
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            htmlFor={props.id}
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={clsx(
            "block appearance-none rounded-md border border-slate-300 dark:border-slate-600 bg-white px-3 py-2 pr-8 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-slate-800 dark:text-slate-100",
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "",
            fullWidth && "w-full",
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700 dark:text-slate-300">
          <svg
            className="h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";