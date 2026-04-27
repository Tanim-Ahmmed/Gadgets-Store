import Link from "next/link";

import { SiteContainer } from "@/components/layout/site-container";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#080616] text-slate-300">
      <SiteContainer>
        <div className="grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-primary text-sm font-semibold text-white shadow-md">
                GS
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                  Gadget Store
                </p>
                <p className="text-sm text-slate-400">
                  Devices selected for modern work and life.
                </p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-400">
              Discover reliable phones, high-performance laptops, and smart
              accessories with thoughtful support from a store built for
              clarity.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
              Explore
            </p>
            <div className="space-y-3 text-sm text-slate-400">
              <Link href="/" className="block transition duration-200 hover:text-white">
                Home
              </Link>
              <Link
                href="/items"
                className="block transition duration-200 hover:text-white"
              >
                Items
              </Link>
              <Link
                href="/about"
                className="block transition duration-200 hover:text-white"
              >
                About
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
              Account
            </p>
            <div className="space-y-3 text-sm text-slate-400">
              <Link
                href="/login"
                className="block transition duration-200 hover:text-white"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block transition duration-200 hover:text-white"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-5 text-sm text-slate-500">
          Copyright 2026 Gadget Store. All rights reserved.
        </div>
      </SiteContainer>
    </footer>
  );
}
