import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

const principles = [
  {
    title: "Curated over crowded",
    description:
      "We would rather show a smaller catalog of strong devices than bury you under pages of forgettable options.",
  },
  {
    title: "Clear product storytelling",
    description:
      "Every listing should help you understand how a device feels in real use, not just repeat a spec sheet.",
  },
  {
    title: "Built for real workflows",
    description:
      "Our selection focuses on products that support work, travel, creativity, and daily routines with less friction.",
  },
];

const highlights = [
  { value: "8+", label: "Core gadgets in the curated catalog" },
  { value: "6", label: "Brands featured across the storefront" },
  { value: "4.7/5", label: "Average rating across showcase products" },
];

export default function AboutPage() {
  return (
    <div className="bg-transparent">
      <Section className="pt-16 sm:pt-20">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
              About gadget store
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              A modern tech storefront shaped around confidence, clarity, and taste.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Gadget Store was created for people who want premium devices without
              the noise that usually comes with online shopping. We focus on
              thoughtful selection, strong presentation, and a browsing experience
              that feels calm, polished, and easy to trust.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/items" className={buttonVariants(undefined, "px-6 py-3.5")}>
                Explore the catalog
              </Link>
              <Link
                href="/saved"
                className={buttonVariants("outline", "px-6 py-3.5")}
              >
                View saved items
              </Link>
            </div>
          </div>

          <Card className="space-y-6 border-white/10 bg-white/5 p-8 backdrop-blur">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Our promise
              </p>
              <h2 className="text-2xl font-semibold text-white">
                Shopping for tech should feel informed, not overwhelming.
              </h2>
            </div>
            <p className="text-sm leading-7 text-slate-300">
              We design every part of the experience to help customers move from
              interest to decision with less friction: a focused catalog, rich item
              descriptions, quick saving tools, and product details that stay useful
              after the first glance.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-[#110d2d] p-4"
                >
                  <p className="text-2xl font-semibold text-white">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section>
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
              How we think
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Principles behind the storefront
            </h2>
            <p className="max-w-2xl text-base leading-7 text-slate-300">
              These ideas guide the way we choose products, write descriptions, and
              shape the overall experience.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {principles.map((principle, index) => (
              <Card key={principle.title} className="space-y-4 p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/40 text-sm font-semibold text-teal-200 shadow-md">
                  0{index + 1}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {principle.title}
                </h3>
                <p className="text-sm leading-7 text-slate-300">
                  {principle.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <Card className="grid gap-6 border-white/10 bg-[linear-gradient(135deg,#100c29_0%,#17133a_100%)] p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Next step
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Start with a few strong products and build from there.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-slate-300">
              Browse the catalog, save the items you like, and use the guest cart to
              compare your shortlist before checkout is ready.
            </p>
          </div>
          <Link href="/items" className={buttonVariants(undefined, "px-6 py-3.5")}>
            Browse items
          </Link>
        </Card>
      </Section>
    </div>
  );
}
