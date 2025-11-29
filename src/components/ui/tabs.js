"use client";

import { cn } from "@/utils/ui";

export default function Tabs({ tabs, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 rounded-2xl bg-white/5 p-2 dark:bg-slate-900/50">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            "rounded-2xl px-4 py-2 text-sm font-medium transition-all",
            value === tab.value
              ? "bg-white text-slate-900 shadow-md dark:bg-blue-500 dark:text-white"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

