import { getDashboardData } from "@/app/actions/dashboard";
import DashboardClient from "@/components/dashboard/dashboard-client";

export const metadata = {
  title: "Dashboard — InsightHub",
};

export default async function DashboardPage() {
  const data = await getDashboardData();
  return <DashboardClient data={data} />;
}

