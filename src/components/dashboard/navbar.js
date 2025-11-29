"use client";

import { useSession, signOut } from "next-auth/react";
import { Bell, Search, Sun, Moon } from "lucide-react";
import Input from "@/components/ui/input";
import Dropdown from "@/components/ui/dropdown";
import Button from "@/components/ui/button";
import { useTheme } from "@/components/providers/theme-provider";

export default function Navbar() {
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex flex-wrap items-center gap-4 rounded-3xl border border-white/10 bg-white/40 p-4 backdrop-blur-md dark:bg-slate-900/60">
      <div className="flex flex-1 items-center gap-3">
        <Search className="text-slate-400" size={18} />
        <Input placeholder="Search insights, reports, users..." className="bg-transparent focus:bg-white/60" />
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
        <Button variant="ghost" size="icon">
          <Bell />
        </Button>
        <Dropdown
          trigger={
            <div className="flex items-center gap-2 rounded-2xl bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm dark:bg-slate-800/80 dark:text-white">
              <span>{session?.user?.name ?? "Guest"}</span>
              <span className="text-xs text-slate-400">{session?.user?.role ?? "USER"}</span>
            </div>
          }
        >
          {({ close }) => (
            <div className="space-y-2">
              <p className="text-xs uppercase text-slate-400">Account</p>
              <Button
                variant="ghost"
                className="w-full justify-start text-sm text-slate-600 dark:text-slate-300"
                onClick={() => {
                  close();
                  signOut();
                }}
              >
                Sign out
              </Button>
            </div>
          )}
        </Dropdown>
      </div>
    </header>
  );
}

