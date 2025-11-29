"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, BrainCircuit, UploadCloud, FileChartColumnIncreasing, UserCog, Settings2 } from "lucide-react";
import { useState } from "react";
import Button from "@/components/ui/button";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/insights", label: "AI Insights", icon: BrainCircuit },
  { href: "/upload", label: "Data Upload", icon: UploadCloud },
  { href: "/reports", label: "Reports", icon: FileChartColumnIncreasing },
  { href: "/profile", label: "Profile", icon: UserCog },
  { href: "/settings", label: "Settings", icon: Settings2 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className="relative">
      <div className="hidden h-full w-64 flex-col rounded-3xl border border-white/10 bg-white/5 p-4 dark:bg-slate-900/40 lg:flex">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            InsightHub
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {collapsed ? "➡️" : "⬅️"}
          </Button>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                    active
                      ? "bg-gradient-to-r from-blue-500/90 to-indigo-500/80 text-white shadow-lg shadow-blue-500/25"
                      : "text-slate-500 hover:bg-white/10 dark:text-slate-400"
                  }`}
                >
                  <Icon size={18} />
                  {!collapsed ? <span>{item.label}</span> : null}
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="lg:hidden">
        <Button
          variant="subtle"
          className="w-full"
          onClick={() => setCollapsed((prev) => !prev)}
        >
          {collapsed ? "Close Menu" : "Menu"}
        </Button>
        <AnimatePresence>
          {collapsed ? (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 flex flex-col gap-2 rounded-3xl border border-white/10 bg-white/5 p-4 dark:bg-slate-900/40"
            >
              {navItems.map((item) => {
                const active = pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold ${
                        active
                          ? "bg-gradient-to-r from-blue-500/90 to-indigo-500/80 text-white"
                          : "text-slate-500 hover:bg-white/10 dark:text-slate-400"
                      }`}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </aside>
  );
}

