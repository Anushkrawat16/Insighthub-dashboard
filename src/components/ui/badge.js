import { cn } from "@/utils/ui";

export default function Badge({ children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-500/20 dark:text-blue-200",
        className
      )}
    >
      {children}
    </span>
  );
}

