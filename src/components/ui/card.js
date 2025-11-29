import { cn } from "@/utils/ui";

export function Card({ className, children }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl dark:bg-slate-900/40 dark:border-slate-700/60 shadow-2xl shadow-black/5",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, description, action }) {
  return (
    <div className="mb-1 flex items-center justify-between">
      <div>
        <p className="text-lg font-semibold text-slate-900 dark:text-white">
          {title}
        </p>
        {description ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

