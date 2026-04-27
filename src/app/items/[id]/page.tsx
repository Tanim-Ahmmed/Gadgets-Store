import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import gadgetsData from "@/data/gadgets.json";
import { ItemShoppingActions } from "@/components/shop/item-shopping-actions";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import type { Gadget } from "@/types/gadget";

const gadgets = gadgetsData as Gadget[];

type ItemDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export default async function ItemDetailsPage({
  params,
}: ItemDetailsPageProps) {
  const { id } = await params;
  const item = gadgets.find((gadget) => gadget.id === id);

  if (!item) {
    notFound();
  }

  const relatedItems = gadgets
    .filter(
      (gadget) => gadget.category === item.category && gadget.id !== item.id,
    )
    .slice(0, 3);

  return (
    <div className="bg-transparent">
      <Section className="pt-16 sm:pt-20">
        <div className="space-y-10">
          <Link
            href="/items"
            className={buttonVariants("outline", "px-4 py-2.5")}
          >
            Back to items
          </Link>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <Card className="overflow-hidden p-0">
              <div className="aspect-[4/3] overflow-hidden bg-[#151131]">
                <Image
                  src={`${item.image}?auto=format&fit=crop&w=1200&q=80`}
                  alt={item.title}
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </Card>

            <Card className="space-y-6 p-8 sm:p-10">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded-full bg-white/8 px-3 py-1 font-medium text-slate-300">
                  {item.category}
                </span>
                <span className="rounded-full bg-primary/40 px-3 py-1 font-medium text-slate-100">
                  {item.brand}
                </span>
                <span className="rounded-full bg-white/8 px-3 py-1 font-medium text-amber-300">
                  {item.rating.toFixed(1)} / 5
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {item.title}
                </h1>
                <p className="text-3xl font-semibold text-white">
                  {formatPrice(item.price)}
                </p>
                <p className="text-base leading-8 text-slate-300">
                  {item.fullDesc}
                </p>
              </div>

              <ItemShoppingActions itemId={item.id} layout="detail" />

              <div className="grid grid-cols-1 gap-4 border-t border-white/10 pt-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-1">
                  <p className="text-sm text-slate-400">Category</p>
                  <p className="font-medium text-white">{item.category}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-slate-400">Brand</p>
                  <p className="font-medium text-white">{item.brand}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-slate-400">Added</p>
                  <p className="font-medium text-white">
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                Related items
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white">
                More in {item.category}
              </h2>
            </div>

            {relatedItems.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedItems.map((relatedItem) => (
                  <Card
                    key={relatedItem.id}
                    className="flex h-full flex-col overflow-hidden p-0"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-[#151131]">
                      <Image
                        src={`${relatedItem.image}?auto=format&fit=crop&w=900&q=80`}
                        alt={relatedItem.title}
                        width={900}
                        height={675}
                        className="h-full w-full object-cover transition duration-200 hover:scale-[1.03]"
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-4 p-6">
                      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                        <span className="rounded-full bg-white/8 px-3 py-1 font-medium text-slate-300">
                          {relatedItem.brand}
                        </span>
                        <span className="text-slate-400">
                          {formatPrice(relatedItem.price)}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-white">
                          {relatedItem.title}
                        </h3>
                        <p className="line-clamp-2 text-sm leading-6 text-slate-300">
                          {relatedItem.shortDesc}
                        </p>
                      </div>

                      <Link
                        href={`/items/${relatedItem.id}`}
                        className={buttonVariants("primary", "mt-auto w-full px-4 py-2.5 sm:w-auto")}
                      >
                        View Details
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8">
                <p className="text-base leading-7 text-slate-300">
                  No related items are available in this category yet.
                </p>
              </Card>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
