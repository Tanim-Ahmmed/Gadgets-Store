"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { useShopping } from "@/context/shopping-context";
import { CartIcon, HeartIcon } from "@/components/shop/shopping-icons";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { useHasMounted } from "@/hooks/use-has-mounted";
import { confirmDestructiveAction } from "@/lib/alerts";
import { getItems } from "@/lib/storage";
import type { Gadget } from "@/types/gadget";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function EmptyState({
  title,
  copy,
}: {
  title: string;
  copy: string;
}) {
  return (
    <Card className="p-8 text-center sm:p-10">
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-base leading-7 text-slate-300">{copy}</p>
    </Card>
  );
}

export default function SavedPage() {
  const mounted = useHasMounted();
  const [allItems] = useState<Gadget[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    return getItems();
  });
  const {
    addToCart,
    cart,
    cartCount,
    decreaseCartQty,
    removeFromCart,
    removeFromWishlist,
    wishlist,
    wishlistCount,
  } = useShopping();

  async function handleRemoveFromCart(id: string) {
    const confirmed = await confirmDestructiveAction({
      title: "Remove this cart item?",
      text: "This will remove the product from your guest cart.",
      confirmButtonText: "Remove item",
    });

    if (!confirmed) {
      return;
    }

    removeFromCart(id);
  }

  const itemsById = useMemo(
    () => new Map(allItems.map((item) => [item.id, item])),
    [allItems],
  );

  const wishlistItems = useMemo(
    () =>
      wishlist
        .map((itemId) => itemsById.get(itemId))
        .filter((item): item is Gadget => Boolean(item)),
    [itemsById, wishlist],
  );

  const cartItems = useMemo(
    () =>
      cart
        .map((cartItem) => {
          const item = itemsById.get(cartItem.id);

          if (!item) {
            return null;
          }

          return {
            ...cartItem,
            item,
          };
        })
        .filter(
          (
            cartItem,
          ): cartItem is {
            id: string;
            item: Gadget;
            qty: number;
          } => Boolean(cartItem),
        ),
    [cart, itemsById],
  );

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-transparent">
      <Section className="pt-16 sm:pt-20">
        <div className="space-y-10">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                Saved items
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Manage your wishlist and cart in one place
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300">
                Review saved favorites, adjust cart quantities, and jump back to
                product details whenever you are ready to decide.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-rose-300/20 bg-rose-500/10 p-3 text-rose-200">
                    <HeartIcon />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Wishlist items</p>
                    <p className="text-3xl font-semibold text-white">
                      {wishlistCount}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-white/10 bg-primary/30 p-3 text-slate-100">
                    <CartIcon />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Cart quantity</p>
                    <p className="text-3xl font-semibold text-white">
                      {cartCount}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                Wishlist
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white">
                Favorites you want to revisit
              </h2>
            </div>

            {wishlistItems.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {wishlistItems.map((item) => (
                  <Card
                    key={item.id}
                    className="flex h-full flex-col overflow-hidden p-0"
                  >
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
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="rounded-full bg-white/8 px-3 py-1 font-medium text-slate-300">
                          {item.category}
                        </span>
                        <span className="text-slate-400">{item.brand}</span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="text-lg font-semibold text-white">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      <div className="mt-auto flex flex-col gap-3 sm:flex-row">
                        <Link
                          href={`/items/${item.id}`}
                          className={buttonVariants("primary", "w-full")}
                        >
                          View Details
                        </Link>
                        <button
                          type="button"
                          className={buttonVariants("outline", "w-full")}
                          onClick={() => removeFromWishlist(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyState
                title="Your wishlist is empty"
                copy="Save products you like so you can compare them later and jump back into the details view quickly."
              />
            )}
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                Cart
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white">
                Adjust quantities before checkout arrives
              </h2>
            </div>

            {cartItems.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {cartItems.map(({ id, item, qty }) => (
                  <Card
                    key={id}
                    className="flex h-full flex-col overflow-hidden p-0"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-[#151131]">
                      <Image
                        src={`${item.image}?auto=format&fit=crop&w=900&q=80`}
                        alt={item.title}
                        width={900}
                        height={675}
                        className="h-full w-full object-cover transition duration-200 hover:scale-[1.03]"
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-5 p-6">
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="rounded-full bg-white/8 px-3 py-1 font-medium text-slate-300">
                          {item.category}
                        </span>
                        <span className="text-slate-400">{item.brand}</span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-white">
                          {item.title}
                        </h3>
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-lg font-semibold text-white">
                            {formatPrice(item.price)}
                          </p>
                          <p className="text-sm text-slate-400">
                            Line total {formatPrice(item.price * qty)}
                          </p>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-sm font-medium text-slate-300">
                            Quantity
                          </p>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              aria-label={`Decrease quantity for ${item.title}`}
                              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-card text-lg text-white transition duration-200 hover:border-white/20 hover:bg-[#17133a]"
                              onClick={() => decreaseCartQty(id)}
                            >
                              -
                            </button>
                            <span className="min-w-8 text-center text-lg font-semibold text-white">
                              {qty}
                            </span>
                            <button
                              type="button"
                              aria-label={`Increase quantity for ${item.title}`}
                              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-card text-lg text-white transition duration-200 hover:border-white/20 hover:bg-[#17133a]"
                              onClick={() => addToCart(id)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-auto flex flex-col gap-3">
                        <Link
                          href={`/items/${item.id}`}
                          className={buttonVariants("primary", "w-full")}
                        >
                          View Details
                        </Link>
                        <button
                          type="button"
                          className={buttonVariants("outline", "w-full")}
                          onClick={() => void handleRemoveFromCart(id)}
                        >
                          Remove from Cart
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyState
                title="Your cart is empty"
                copy="Add products from the catalog to start building a guest cart. You can come back here anytime to adjust quantities."
              />
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
