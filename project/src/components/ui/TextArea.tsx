import React, { forwardRef } from "react";
import { clsx } from "clsx";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, error, fullWidth = true, ...props }, ref) => {
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
        <textarea
          ref={ref}
          className={clsx(
            "block rounded-md border border-slate-300 dark:border-slate-600 px-3 py-2 shadow-sm transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-slate-800 dark:text-slate-100",
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "",
            fullWidth && "w-full",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";