import React, { forwardRef } from "react";
import { clsx } from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, fullWidth = true, icon, ...props }, ref) => {
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
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={clsx(
              "block rounded-md border border-slate-300 dark:border-slate-600 py-2 shadow-sm transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-slate-800 dark:text-slate-100",
              icon ? "pl-10" : "px-3",
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "",
              fullWidth && "w-full",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";