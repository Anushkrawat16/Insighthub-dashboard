"use client";

import { forwardRef } from "react";
import { cn } from "@/utils/ui";

const Textarea = forwardRef(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:bg-slate-900/60 dark:text-white",
        className
      )}
      {...props}
    />
  );
});

export default Textarea;

