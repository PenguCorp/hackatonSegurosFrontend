import React from "react";
import { clsx } from "clsx";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={clsx(
        "rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900",
        hover &&
          "transition-shadow hover:shadow-md dark:hover:shadow-slate-800/50",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={clsx("mb-4 flex flex-col space-y-1.5", className)}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <h3
      className={clsx(
        "text-xl font-semibold text-slate-900 dark:text-slate-50",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <p
      className={clsx(
        "text-sm text-slate-500 dark:text-slate-400",
        className
      )}
    >
      {children}
    </p>
  );
};

export const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <div className={clsx("", className)}>{children}</div>;
};

export const CardFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "mt-6 flex items-center justify-between",
        className
      )}
    >
      {children}
    </div>
  );
};