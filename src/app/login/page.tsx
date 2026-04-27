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

export default function LoginPage() {
  const router = useRouter();
  const { isConfigured, isGoogleAvailable, login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await login(email, password);
      router.push("/");
    } catch (error) {
      setMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setLoading(true);
    setMessage(null);

    try {
      await loginWithGoogle();
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
              Welcome back
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Sign in to your account
            </h1>
            <p className="text-sm leading-6 text-slate-300">
              Access your account to manage saved products and your catalog tools.
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
                placeholder="Enter your password"
                required
              />
            </div>

            {message ? (
              <p className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                {message}
              </p>
            ) : null}

            <Button type="submit" className="w-full" disabled={loading || !isConfigured}>
              {loading ? "Signing in..." : "Login"}
            </Button>
          </form>

          {isGoogleAvailable ? (
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
              disabled={loading || !isConfigured}
            >
              Continue with Google
            </Button>
          ) : null}

          <p className="text-sm text-slate-300">
            New here?{" "}
            <Link href="/register" className="font-medium text-white">
              Create an account
            </Link>
          </p>
        </Card>
      </div>
    </Section>
  );
}
