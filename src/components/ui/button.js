"use client";

import { cloneElement, forwardRef, isValidElement } from "react";
import { cn } from "@/utils/ui";

const variants = {
  default:
    "bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:opacity-90 shadow-lg shadow-blue-500/30",
  outline:
    "border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800",
  ghost:
    "text-slate-900 dark:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-slate-800/80",
  subtle:
    "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
  icon: "p-2",
};

const Button = forwardRef(function Button(
  { className, children, variant = "default", size = "md", asChild = false, ...props },
  ref
) {
  const classes = cn(
    "rounded-xl font-medium transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2",
    variants[variant],
    sizes[size],
    className
  );

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      className: cn(classes, children.props.className),
      ...props,
    });
  }

  return (
    <button ref={ref} className={classes} {...props}>
      {children}
    </button>
  );
});

export default Button;

