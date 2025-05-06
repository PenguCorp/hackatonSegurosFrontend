import React, { forwardRef } from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = "", label, error, fullWidth = true, ...props }, ref) => {
    const wrapperClass = `relative ${fullWidth ? "w-full" : ""}`;
    const baseClass =
      "block rounded-md border px-3 py-2 shadow-sm transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-1";
    const borderClass = error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
      : "border-slate-300 focus:border-blue-500 focus:ring-blue-500";
    const themeClass = "bg-white text-slate-900";
    const fullWidthClass = fullWidth ? "w-full" : "";
    const finalClass = `${baseClass} ${borderClass} ${themeClass} ${fullWidthClass} ${className}`;

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
        <textarea ref={ref} className={finalClass} {...props} />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
