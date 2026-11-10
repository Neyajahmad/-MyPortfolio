import React from 'react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function Container({ children, className }) {
  return (
    <div className={cn("max-w-[87.5rem] mx-auto px-6 md:px-12 lg:px-20", className)}>
      {children}
    </div>
  );
}
