import AuthForm from "@/components/auth/auth-form";

export const metadata = {
  title: "Sign in — InsightHub",
};

export default function LoginPage() {
  return (
    <section className="relative flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(59,130,246,0.25),_transparent_65%)]" />
      <div className="relative z-10 grid w-full max-w-5xl gap-12 lg:grid-cols-[1fr_400px]">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.2em]">
            InsightHub Access
          </p>
          <h1 className="text-4xl font-semibold">
            Secure analytics workspace for data-forward teams.
          </h1>
          <ul className="space-y-3 text-sm text-white/70">
            <li>• Enterprise-ready RBAC with NextAuth + Prisma</li>
            <li>• Drag-and-drop dashboard builder</li>
            <li>• AI generated commentary for every dataset</li>
          </ul>
        </div>
        <AuthForm mode="login" />
      </div>
    </section>
  );
}

