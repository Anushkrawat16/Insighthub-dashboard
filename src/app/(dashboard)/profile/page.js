import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Card, CardHeader } from "@/components/ui/card";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export const metadata = {
  title: "Profile — InsightHub",
};

export default async function ProfilePage() {
  const session = await auth();
  const user = session?.user?.email
    ? await prisma.user.findUnique({
        where: { email: session.user.email },
      })
    : null;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">Your profile, preferences, and security</h1>
      </header>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Profile details" description="Update personal info" />
          <div className="space-y-3">
            <Input defaultValue={user?.name ?? ""} placeholder="Name" />
            <Input defaultValue={user?.email ?? ""} disabled />
            <Button disabled>Save (demo only)</Button>
          </div>
        </Card>
        <Card>
          <CardHeader title="Security" description="Password, sessions, MFA" />
          <div className="space-y-4">
            <Input type="password" placeholder="Current password" />
            <Input type="password" placeholder="New password" />
            <Button variant="outline" disabled>
              Update password (future)
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

