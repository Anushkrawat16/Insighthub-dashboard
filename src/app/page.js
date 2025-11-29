import Link from "next/link";
import Button from "@/components/ui/button";

export default function Home() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.35),_transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(14,165,233,0.3),_transparent_45%)]" />
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-12 px-6 py-24 text-center">
        <p className="rounded-full border border-white/20 px-4 py-1 text-sm uppercase tracking-wide text-white/80">
          InsightHub • AI Powered Analytics
        </p>
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            Transform raw data into live, AI-generated intelligence.
          </h1>
          <p className="text-lg text-white/70 md:text-xl">
            Upload structured data, orchestrate reports, drag-and-drop fully interactive widgets,
            and ask InsightHub’s AI analyst for instant trends, anomalies, and growth ideas.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Button className="px-8 py-4 text-base" asChild>
            <Link href="/auth/register">Get started free</Link>
          </Button>
          <Button variant="outline" className="px-8 py-4 text-base" asChild>
            <Link href="/auth/login">Sign in</Link>
          </Button>
        </div>
        <div className="grid w-full gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur md:grid-cols-3">
          {[
            { label: "Realtime widgets", value: "Drag & drop layout" },
            { label: "Data fabric", value: "Prisma + PostgreSQL" },
            { label: "AI co-pilot", value: "Powered by OpenAI" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl bg-white/5 p-4 text-left">
              <p className="text-sm uppercase tracking-wide text-white/50">
                {item.label}
              </p>
              <p className="text-lg font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
