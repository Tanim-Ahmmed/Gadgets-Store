"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useAuth } from "@/context/auth-context";
import { SiteContainer } from "@/components/layout/site-container";
import { ShoppingStatus } from "@/components/shop/shopping-status";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/items", label: "Items" },
  { href: "/saved", label: "Saved" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const { loading, logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    await logout();
    setIsDropdownOpen(false);
    setIsOpen(false);
  }

  const userName = user?.displayName || user?.email || "Account";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080616]/78 backdrop-blur-xl">
      <SiteContainer>
        <div className="flex min-h-18 items-center justify-between gap-3 py-3 sm:gap-4 sm:py-4">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-primary text-sm font-semibold text-white shadow-md transition duration-200">
              GS
            </div>
            <div className="space-y-0.5">
              <p className="truncate text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                Gadget Store
              </p>
              <p className="hidden text-sm text-slate-400 sm:block">
                Premium devices, curated well.
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-300 transition duration-200 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ShoppingStatus />
            {loading ? (
              <div className="h-11 w-40 rounded-xl border border-white/10 bg-white/5 shadow-md" />
            ) : user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-left shadow-md transition duration-200 hover:border-white/20 hover:bg-white/8 hover:shadow-lg"
                  onClick={() => setIsDropdownOpen((open) => !open)}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{userName}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                </button>

                {isDropdownOpen ? (
                  <div className="absolute right-0 top-[calc(100%+12px)] w-72 rounded-xl border border-white/10 bg-card p-3 shadow-lg shadow-black/30">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm font-semibold text-white">{userName}</p>
                      <p className="mt-1 text-sm text-slate-400">{user.email}</p>
                    </div>
                    <div className="mt-3 space-y-1">
                      <Link
                        href="/items/add"
                        className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-300 transition duration-200 hover:bg-white/8 hover:text-white"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Add Product
                      </Link>
                      <Link
                        href="/items/manage"
                        className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-300 transition duration-200 hover:bg-white/8 hover:text-white"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Manage Products
                      </Link>
                      <button
                        type="button"
                        className="block w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-rose-300 transition duration-200 hover:bg-rose-500/10"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <>
                <Link href="/login" className={buttonVariants("outline")}>
                  Login
                </Link>
                <Link href="/register" className={buttonVariants()}>
                  Register
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white shadow-md transition duration-200 hover:bg-white/10 hover:shadow-lg lg:hidden"
            onClick={() => setIsOpen((open) => !open)}
          >
            <span className="relative h-4 w-5">
              <span
                className={cn(
                  "absolute left-0 top-0 h-0.5 w-5 bg-current transition duration-200",
                  isOpen && "top-1.5 rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 h-0.5 w-5 bg-current transition duration-200",
                  isOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-3 h-0.5 w-5 bg-current transition duration-200",
                  isOpen && "top-1.5 -rotate-45",
                )}
              />
            </span>
          </button>
        </div>

        {isOpen ? (
          <div className="space-y-6 border-t border-white/10 py-6 lg:hidden">
            <nav className="space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-300 transition duration-200 hover:bg-white/8 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <ShoppingStatus className="flex-wrap" />
            <div className="grid gap-3 sm:grid-cols-2">
              {loading ? (
                <div className="sm:col-span-2 h-11 rounded-xl border border-white/10 bg-white/5 shadow-md" />
              ) : user ? (
                <div className="sm:col-span-2 space-y-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div>
                    <p className="text-sm font-semibold text-white">{userName}</p>
                    <p className="mt-1 text-sm text-slate-400">{user.email}</p>
                  </div>
                  <Link
                    href="/items/add"
                    className={buttonVariants("outline", "w-full")}
                    onClick={() => setIsOpen(false)}
                  >
                    Add Product
                  </Link>
                  <Link
                    href="/items/manage"
                    className={buttonVariants("outline", "w-full")}
                    onClick={() => setIsOpen(false)}
                  >
                    Manage Products
                  </Link>
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[#24206c] hover:shadow-lg"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={buttonVariants("outline")}
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className={buttonVariants()}
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        ) : null}
      </SiteContainer>
    </header>
  );
}
