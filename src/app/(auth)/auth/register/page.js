import AuthForm from "@/components/auth/auth-form";
import { registerUser } from "@/app/actions/auth";

export const metadata = {
  title: "Create account — InsightHub",
};

export default function RegisterPage() {
  return (
    <section className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 to-slate-900 px-6 py-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(14,165,233,0.2),_transparent_60%)]" />
      <div className="relative z-10 grid w-full max-w-6xl gap-12 lg:grid-cols-[1fr_420px]">
        <div className="space-y-8">
          <h1 className="text-5xl font-semibold leading-tight">
            Build AI-enhanced analytics in minutes.
          </h1>
          <p className="text-white/70">
            InsightHub combines data ingestion, charting, AI insight generation,
            and collaborative reporting in a single secure workspace layered on
            top of PostgreSQL + Prisma.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {["Server Actions", "Framer Motion", "ShadCN UI", "Recharts"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-white/5 p-4 text-sm font-semibold text-white/80"
                >
                  {item}
                </div>
              )
            )}
          </div>
        </div>
        <AuthForm mode="register" action={registerUser} />
      </div>
    </section>
  );
}

