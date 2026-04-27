"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import {
  MotionSection,
} from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/ui/section";
import { ItemShoppingActions } from "@/components/shop/item-shopping-actions";
import { useHasMounted } from "@/hooks/use-has-mounted";
import { getItems } from "@/lib/storage";
import type { Gadget } from "@/types/gadget";

const priceRanges = [
  { label: "All prices", value: "all", min: 0, max: Number.POSITIVE_INFINITY },
  { label: "Under $200", value: "under-200", min: 0, max: 200 },
  { label: "$200 - $500", value: "200-500", min: 200, max: 500 },
  { label: "$500 - $1000", value: "500-1000", min: 500, max: 1000 },
  { label: "Above $1000", value: "above-1000", min: 1000, max: Number.POSITIVE_INFINITY },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function applyFilters(
  items: Gadget[],
  {
    search,
    category,
    priceRange,
  }: {
    search: string;
    category: string;
    priceRange: string;
  },
) {
  const normalizedSearch = search.trim().toLowerCase();
  const normalizedCategory = category.trim().toLowerCase();
  const selectedRange =
    priceRanges.find((range) => range.value === priceRange) ?? priceRanges[0];

  return items.filter((gadget) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      gadget.title.toLowerCase().includes(normalizedSearch) ||
      gadget.brand.toLowerCase().includes(normalizedSearch);

    const matchesCategory =
      normalizedCategory === "all" ||
      gadget.category.trim().toLowerCase() === normalizedCategory;

    const matchesPrice =
      gadget.price >= selectedRange.min && gadget.price < selectedRange.max;

    return matchesSearch && matchesCategory && matchesPrice;
  });
}

export default function ItemsPage() {
  const mounted = useHasMounted();
  const [allItems] = useState<Gadget[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    return getItems();
  });
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const categories = useMemo(
    () => ["all", ...new Set(allItems.map((gadget) => gadget.category))],
    [allItems],
  );

  const filteredItems = useMemo(
    () =>
      applyFilters(allItems, {
        search,
        category,
        priceRange,
      }),
    [allItems, search, category, priceRange],
  );

  function handleSearchChange(value: string) {
    setSearch(value);
  }

  function handleCategoryChange(value: string) {
    setCategory(value);
  }

  function handlePriceRangeChange(value: string) {
    setPriceRange(value);
  }

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-transparent">
      <Section className="pt-16 sm:pt-20">
        <MotionSection className="space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
              Browse gadgets
            </p>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Find gear that fits how you work and live
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-300">
                  Search by title or brand, narrow by category, and refine by
                  price to quickly reach the right product.
                </p>
              </div>
              <Card className="flex w-full items-center justify-between gap-4 p-5 lg:max-w-xs">
                <div>
                  <p className="text-sm text-slate-400">Matching items</p>
                  <p className="text-2xl font-semibold text-white">
                    {filteredItems.length}
                  </p>
                </div>
                <div className="rounded-xl bg-primary/40 px-3 py-2 text-sm font-medium text-slate-100">
                  {allItems.length} total
                </div>
              </Card>
            </div>
          </div>

          <MotionSection delay={0.08}>
            <Card className="p-5 sm:p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <label
                  htmlFor="search"
                  className="text-sm font-medium text-slate-300"
                >
                  Search
                </label>
                <Input
                  id="search"
                  value={search}
                  onChange={(event) => handleSearchChange(event.target.value)}
                  placeholder="Search by title or brand"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="category"
                  className="text-sm font-medium text-slate-300"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(event) => handleCategoryChange(event.target.value)}
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-white shadow-md transition-all duration-200 ease-in-out hover:border-primary/80 hover:shadow-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/70 focus:ring-offset-2 focus:ring-offset-background"
                >
                  {categories.map((itemCategory) => (
                    <option key={itemCategory} value={itemCategory}>
                      {itemCategory === "all" ? "All categories" : itemCategory}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="priceRange"
                  className="text-sm font-medium text-slate-300"
                >
                  Price range
                </label>
                <select
                  id="priceRange"
                  value={priceRange}
                  onChange={(event) => handlePriceRangeChange(event.target.value)}
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-white shadow-md transition-all duration-200 ease-in-out hover:border-primary/80 hover:shadow-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/70 focus:ring-offset-2 focus:ring-offset-background"
                >
                  {priceRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            </Card>
          </MotionSection>

          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => (
                <div key={item.id}>
                  <Card className="flex h-full flex-col overflow-hidden p-0">
                    <div className="aspect-[4/3] overflow-hidden bg-[#151131]">
                      <Image
                        src={`${item.image}?auto=format&fit=crop&w=900&q=80`}
                        alt={item.title}
                        width={900}
                        height={675}
                        className="h-full w-full object-cover transition duration-200 hover:scale-[1.03]"
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-4 p-6">
                      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                        <span className="rounded-full bg-white/8 px-3 py-1 font-medium text-slate-300">
                          {item.category}
                        </span>
                        <span className="text-slate-400">{item.brand}</span>
                      </div>

                      <div className="space-y-3">
                        <h2 className="text-xl font-semibold text-white">
                          {item.title}
                        </h2>
                        <p className="line-clamp-2 text-sm leading-6 text-slate-300">
                          {item.shortDesc}
                        </p>
                      </div>

                      <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-lg font-semibold text-white">
                          {formatPrice(item.price)}
                        </p>
                        <Link
                          href={`/items/${item.id}`}
                          className={buttonVariants("primary", "w-full px-4 py-2.5 sm:w-auto")}
                        >
                          View Details
                        </Link>
                      </div>

                      <ItemShoppingActions itemId={item.id} />
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <Card className="p-10 text-center">
              <h2 className="text-2xl font-semibold text-white">
                No items match your filters
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-300">
                Try a different keyword, switch categories, or broaden the price
                range to see more products.
              </p>
            </Card>
          )}
        </MotionSection>
      </Section>
    </div>
  );
}
