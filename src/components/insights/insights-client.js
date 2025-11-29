"use client";

import { useState, useTransition } from "react";
import Textarea from "@/components/ui/textarea";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { generateInsights } from "@/app/actions/insights";
import { motion } from "framer-motion";
import Papa from "papaparse";

const historyDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "UTC",
});

const formatHistoryDate = (date) => historyDateFormatter.format(new Date(date));

export default function InsightsClient({ history }) {
  const [rawData, setRawData] = useState("");
  const [prompt, setPrompt] = useState("Summarize key growth opportunities and anomalies.");
  const [insight, setInsight] = useState(null);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  console.log(history , "history");
  const handleFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setRawData(JSON.stringify(results.data.slice(0, 50), null, 2));
      },
    });
  };

  const handleGenerate = () => {
    setError("");
    startTransition(async () => {
      try {
        const dataset = JSON.parse(rawData || "[]");
        const response = await generateInsights({ dataset, prompt });
        const normalized =
          typeof response === "string"
            ? {
                summary: response,
                trends: [],
                patterns: [],
                anomalies: [],
                recommendations: [],
              }
            : {
                summary: response.summary ?? "",
                trends: Array.isArray(response.trends) ? response.trends : [],
                patterns: Array.isArray(response.patterns) ? response.patterns : [],
                anomalies: Array.isArray(response.anomalies) ? response.anomalies : [],
                recommendations: Array.isArray(response.recommendations) ? response.recommendations : [],
              };
        setInsight(normalized);
      } catch (err) {
        setError(err.message);
      }
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
      <div className="space-y-4">
        <div className="rounded-3xl border border-white/10 bg-white/70 p-6 dark:bg-slate-900/60">
          <p className="text-sm font-semibold text-slate-600 dark:text-white">Upload CSV or paste JSON</p>
          <Input type="file" accept=".csv,.xlsx" onChange={handleFile} className="mt-4 bg-white/60 dark:bg-slate-800/70" />
          <Textarea
            rows={10}
            placeholder='[{ "date": "2024-11-01", "users": 1240, "revenue": 4200 }]'
            value={rawData}
            onChange={(e) => setRawData(e.target.value)}
            className="mt-4 font-mono text-xs"
          />
          <Textarea
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="mt-4"
          />
          {error ? <p className="text-sm text-rose-500">{error}</p> : null}
          <div className="flex gap-3 pt-4">
            <Button onClick={handleGenerate} disabled={isPending}>
              {isPending ? "Generating..." : "Generate insights"}
            </Button>
            <Button variant="ghost" onClick={() => setInsight(null)}>
              Reset
            </Button>
          </div>
        </div>
        {insight ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 rounded-3xl border border-emerald-200/40 bg-emerald-50/80 p-6 text-slate-900 dark:bg-emerald-500/10 dark:text-white"
          >
            <h3 className="text-xl font-semibold">AI Summary</h3>
            <p>{insight.summary}</p>
            {[
              { title: "Trends", items: insight.trends, color: "text-slate-700 dark:text-slate-200" },
              { title: "Patterns", items: insight.patterns, color: "text-slate-700 dark:text-slate-200" },
              { title: "Anomalies", items: insight.anomalies, color: "text-rose-500" },
              { title: "Recommendations", items: insight.recommendations, color: "text-emerald-600 dark:text-emerald-200" },
            ].map(({ title, items, color }) => (
              <section key={title}>
                <h4 className="font-semibold">{title}</h4>
                <ul className={`list-inside list-disc text-sm ${color}`}>
                  {items.length ? (
                    items.map((item, index) => <li key={index}>{item}</li>)
                  ) : (
                    <li className="text-slate-400 dark:text-slate-500">No {title.toLowerCase()} detected.</li>
                  )}
                </ul>
              </section>
            ))}
          </motion.div>
        ) : (
          <div className="rounded-3xl border border-dashed border-white/20 p-6 text-sm text-slate-500">
            AI insight cards appear here once generated.
          </div>
        )}
      </div>
      <div className="space-y-4 rounded-3xl border border-white/10 bg-white/70 p-6 dark:bg-slate-900/60">
        <h3 className="text-lg font-semibold">History</h3>
        <p className="text-sm text-slate-500">
          Regenerate past runs with a single click. All insights are logged inside `AIInsightHistory`.
        </p>
        <div className="space-y-3">
          {history.length ? (
            history.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.01 }}
                className="rounded-2xl bg-white/80 p-4 dark:bg-slate-800/60"
              >
                <p className="text-xs uppercase text-slate-400">
                  {formatHistoryDate(item.createdAt)}
                </p>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {item.prompt}
                </p>
                <p className="text-sm text-slate-500">
                  {item.response.summary.slice(0, 120)}...
                </p>
              </motion.div>
            ))
          ) : (
            <p className="text-sm text-slate-500">No insights yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

