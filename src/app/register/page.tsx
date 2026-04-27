"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/ui/section";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong.";
}

export default function RegisterPage() {
  const router = useRouter();
  const { isConfigured, register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await register({ name, email, password });
      router.push("/");
    } catch (error) {
      setMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section className="pt-16 sm:pt-20">
      <div className="mx-auto max-w-md">
        <Card className="space-y-6 p-6 sm:p-8">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
              Create account
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Register for Gadget Store
            </h1>
            <p className="text-sm leading-6 text-slate-300">
              Create an account to save time, manage products, and access account tools.
            </p>
          </div>

          {!isConfigured ? (
            <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
              Firebase is not configured yet. Add your `NEXT_PUBLIC_FIREBASE_*`
              values to `.env.local` to enable authentication.
            </div>
          ) : null}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-slate-300">
                Name
              </label>
              <Input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-300">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-300"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Create a password"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-slate-300"
              >
                Confirm password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Repeat your password"
                required
              />
            </div>

            {message ? (
              <p className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                {message}
              </p>
            ) : null}

            <Button type="submit" className="w-full" disabled={loading || !isConfigured}>
              {loading ? "Creating account..." : "Register"}
            </Button>
          </form>

          <p className="text-sm text-slate-300">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-white">
              Sign in
            </Link>
          </p>
        </Card>
      </div>
    </Section>
  );
}
