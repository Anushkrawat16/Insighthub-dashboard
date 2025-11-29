"use client";

import Switch from "@/components/ui/switch";
import { useTheme } from "@/components/providers/theme-provider";

export default function ThemeCard() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4 dark:bg-slate-900/40">
      <div>
        <p className="font-semibold">Theme</p>
        <p className="text-sm text-slate-500">
          {theme === "dark" ? "Dark" : "Light"} mode active
        </p>
      </div>
      <Switch checked={theme === "dark"} onChange={toggleTheme} />
    </div>
  );
}

