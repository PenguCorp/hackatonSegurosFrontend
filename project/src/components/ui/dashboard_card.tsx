import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const CardHeader = ({ children, className = '' }: CardHeaderProps) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = '' }: CardTitleProps) => (
  <h3 className={`text-xl font-semibold text-slate-900 ${className}`}>{children}</h3>
);

const CardDescription = ({ children, className = '' }: CardDescriptionProps) => (
  <p className={`text-sm text-slate-500 mt-1 ${className}`}>{children}</p>
);

const CardContent = ({ children, className = '' }: CardContentProps) => (
  <div className={`px-6 pb-6 ${className}`}>{children}</div>
);

const CardFooter = ({ children, className = '' }: CardFooterProps) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border-4 border-slate-400 overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;