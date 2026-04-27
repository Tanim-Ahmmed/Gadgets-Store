"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import gadgetsData from "@/data/gadgets.json";
import { ProtectedRoute } from "@/components/providers/protected-route";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { confirmDestructiveAction } from "@/lib/alerts";
import { deleteItem, getItems } from "@/lib/storage";
import type { Gadget } from "@/types/gadget";

const seedItemIds = new Set((gadgetsData as Gadget[]).map((item) => item.id));

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function getSourceLabel(item: Gadget) {
  return seedItemIds.has(item.id) ? "Seeded" : "Local";
}

export default function ManageItemsPage() {
  const [items, setItems] = useState<Gadget[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    return getItems();
  });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const stats = useMemo(() => {
    const localItems = items.filter((item) => !seedItemIds.has(item.id)).length;
    const averagePrice =
      items.length > 0
        ? Math.round(items.reduce((sum, item) => sum + item.price, 0) / items.length)
        : 0;

    return {
      total: items.length,
      localItems,
      averagePrice,
    };
  }, [items]);

  async function handleDelete(id: string) {
    const confirmed = await confirmDestructiveAction({
      title: "Delete this product?",
      text: "This will remove the product from your local catalog.",
      confirmButtonText: "Delete product",
    });

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    try {
      const nextItems = deleteItem(id);
      setItems(nextItems);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <ProtectedRoute>
      <div className="bg-transparent">
        <Section className="pt-16 sm:pt-20">
          <div className="space-y-8">
            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr] xl:items-end">
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                  Inventory control
                </p>
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Manage every product in one clean workspace
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-300">
                  Review the full catalog, including seeded items and anything saved
                  from this browser, then jump to details or remove entries instantly.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <Card className="p-6">
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-300">
                    Total items
                  </p>
                  <p className="mt-3 text-3xl font-semibold">{stats.total}</p>
                </Card>
                <Card className="p-6">
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
                    Local adds
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-white">
                    {stats.localItems}
                  </p>
                </Card>
                <Card className="p-6">
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
                    Avg. price
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-white">
                    {formatPrice(stats.averagePrice)}
                  </p>
                </Card>
              </div>
            </div>

            <Card className="p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    Product inventory
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    The list below reflects the current local catalog state and updates
                    immediately after deletions.
                  </p>
                </div>
                <Link href="/items/add" className={buttonVariants()}>
                  Add new item
                </Link>
              </div>
            </Card>

            {items.length === 0 ? (
              <Card className="p-10 text-center">
                <h2 className="text-2xl font-semibold text-white">
                  No items available
                </h2>
                <p className="mt-3 text-base leading-7 text-slate-300">
                  Add a new product to start building your local catalog.
                </p>
              </Card>
            ) : (
              <>
                <Card className="hidden overflow-hidden p-0 lg:block">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-white/10">
                      <thead className="bg-white/5">
                        <tr className="text-left text-sm text-slate-400">
                          <th className="px-6 py-4 font-medium">Product</th>
                          <th className="px-6 py-4 font-medium">Category</th>
                          <th className="px-6 py-4 font-medium">Brand</th>
                          <th className="px-6 py-4 font-medium">Price</th>
                          <th className="px-6 py-4 font-medium">Source</th>
                          <th className="px-6 py-4 font-medium">Created</th>
                          <th className="px-6 py-4 text-right font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10 bg-transparent">
                        {items.map((item) => (
                          <tr key={item.id} className="align-top">
                            <td className="px-6 py-5">
                              <div className="space-y-2">
                                <p className="font-semibold text-white">
                                  {item.title}
                                </p>
                                <p className="max-w-md text-sm leading-6 text-slate-300">
                                  {item.shortDesc}
                                </p>
                              </div>
                            </td>
                            <td className="px-6 py-5 text-sm text-slate-300">
                              {item.category}
                            </td>
                            <td className="px-6 py-5 text-sm text-slate-300">
                              {item.brand}
                            </td>
                            <td className="px-6 py-5 text-sm font-medium text-white">
                              {formatPrice(item.price)}
                            </td>
                            <td className="px-6 py-5">
                              <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">
                                {getSourceLabel(item)}
                              </span>
                            </td>
                            <td className="px-6 py-5 text-sm text-slate-300">
                              {formatDate(item.createdAt)}
                            </td>
                            <td className="px-6 py-5">
                              <div className="flex justify-end gap-3">
                                <Link
                                  href={`/items/${item.id}`}
                                  className={buttonVariants("outline", "px-4 py-2.5")}
                                >
                                  View
                                </Link>
                                <Button
                                  type="button"
                                  className="bg-rose-600 px-4 py-2.5 text-white hover:bg-rose-500"
                                  onClick={() => void handleDelete(item.id)}
                                  disabled={deletingId === item.id}
                                >
                                  {deletingId === item.id ? "Deleting..." : "Delete"}
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>

                <div className="grid gap-5 lg:hidden">
                  {items.map((item) => (
                    <Card key={item.id} className="space-y-5 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2">
                          <p className="text-xl font-semibold text-white">
                            {item.title}
                          </p>
                          <p className="text-sm leading-6 text-slate-300">
                            {item.shortDesc}
                          </p>
                        </div>
                        <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">
                          {getSourceLabel(item)}
                        </span>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                            Category
                          </p>
                          <p className="mt-1 text-sm font-medium text-white">
                            {item.category}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                            Brand
                          </p>
                          <p className="mt-1 text-sm font-medium text-white">
                            {item.brand}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                            Price
                          </p>
                          <p className="mt-1 text-sm font-medium text-white">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                            Created
                          </p>
                          <p className="mt-1 text-sm font-medium text-white">
                            {formatDate(item.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row">
                        <Link
                          href={`/items/${item.id}`}
                          className={buttonVariants("outline", "w-full")}
                        >
                          View
                        </Link>
                        <Button
                          type="button"
                          className="w-full bg-rose-600 text-white hover:bg-rose-500"
                          onClick={() => void handleDelete(item.id)}
                          disabled={deletingId === item.id}
                        >
                          {deletingId === item.id ? "Deleting..." : "Delete"}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </Section>
      </div>
    </ProtectedRoute>
  );
}
