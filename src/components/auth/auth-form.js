"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function AuthForm({ mode = "login", action = async () => ({}) }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    startTransition(async () => {
      try {
        if (mode === "register") {
          await action(formData);
        }
        const callback = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });
        if (callback?.error) {
          setError(callback.error);
        } else {
          router.replace("/dashboard");
          router.refresh();
        }
      } catch (err) {
        setError(err.message);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-3xl border border-white/10 bg-white/60 p-8 backdrop-blur dark:bg-slate-900/70"
    >
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
        {mode === "login" ? "Welcome back" : "Create your InsightHub account"}
      </h1>
      {mode === "register" ? (
        <Input
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
        />
      ) : null}
      <Input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
      />
      <Input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
      />
      {error ? (
        <p className="text-sm text-rose-500">{error}</p>
      ) : null}
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Processing..." : mode === "login" ? "Sign in" : "Sign up"}
      </Button>
      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
        {mode === "login" ? (
          <>
            Need an account? <Link className="text-blue-500" href="/auth/register">Sign up</Link>
          </>
        ) : (
          <>
            Already have an account? <Link className="text-blue-500" href="/auth/login">Sign in</Link>
          </>
        )}
      </p>
    </form>
  );
}

