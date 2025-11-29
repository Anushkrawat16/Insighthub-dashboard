"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import Papa from "papaparse";

export async function processUpload(formData) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  const file = formData.get("file");
  if (!file) throw new Error("File missing");

  const text = await file.text();
  const parsed = Papa.parse(text, { header: true, dynamicTyping: true });
  const preview = parsed.data.slice(0, 5);

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  const upload = await prisma.uploadedData.create({
    data: {
      title: formData.get("title") || file.name,
      filename: file.name,
      mimeType: file.type || "text/csv",
      rowCount: parsed.data.length,
      ownerId: user.id,
      preview,
      filterMeta: {
        range: [0, 100],
      },
    },
  });

  return upload;
}

