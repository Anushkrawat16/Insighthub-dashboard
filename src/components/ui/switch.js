"use client";

import { cn } from "@/utils/ui";

export default function Switch({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300",
        checked ? "bg-blue-500" : "bg-slate-300 dark:bg-slate-700"
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow",
          checked ? "translate-x-5" : "translate-x-1"
        )}
      />
    </button>
  );
}

