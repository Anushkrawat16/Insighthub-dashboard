import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import InsightsClient from "@/components/insights/insights-client";

export const metadata = {
  title: "AI Insights — InsightHub",
};

export default async function InsightsPage() {
  const session = await auth();
  const userId = session?.user?.id;
  const history = userId? await prisma.aIInsightHistory.findMany({
        where: { ownerId: userId },
        orderBy: { createdAt: "desc" },
        take: 6,
      })
    : [];


  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">Generate insights from any dataset</h1>
      </header>
      <InsightsClient history={history} />
    </div>
  );
}

