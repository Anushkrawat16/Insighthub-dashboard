import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import UploadClient from "@/components/upload/upload-client";

export const metadata = {
  title: "Data Upload — InsightHub",
};

export default async function UploadPage() {
  const session = await auth();
  const uploads = session?.user?.email
    ? await prisma.uploadedData.findMany({
        where: { owner: { email: session.user.email } },
        orderBy: { createdAt: "desc" },
        take: 5,
      })
    : [];
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">
          Upload raw files, preview, and sync with widgets
        </h1>
      </header>
      <UploadClient uploads={uploads} />
    </div>
  );
}

