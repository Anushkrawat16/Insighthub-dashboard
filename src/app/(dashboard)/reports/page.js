import ReportsClient from "@/components/reports/reports-client";

export const metadata = {
  title: "Reports — InsightHub",
};

const sample = [
  { label: "Jan", value: 120 },
  { label: "Feb", value: 150 },
  { label: "Mar", value: 180 },
  { label: "Apr", value: 210 },
  { label: "May", value: 240 },
  { label: "Jun", value: 260 },
  { label: "Jul", value: 230 },
  { label: "Aug", value: 280 },
  { label: "Sep", value: 300 },
  { label: "Oct", value: 320 },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">
          Multi-format reports with export + pagination
        </h1>
      </header>
      <ReportsClient data={sample} />
    </div>
  );
}

