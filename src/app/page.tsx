"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { gsap } from "gsap";

import gadgets from "@/data/gadgets.json";
import {
  MotionSection,
  StaggerGroup,
  StaggerItem,
} from "@/components/motion/reveal";
import type { Gadget } from "@/types/gadget";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

const featuredProducts = (gadgets as Gadget[]).slice(0, 4);
const topBrands = [...new Set((gadgets as Gadget[]).map((item) => item.brand))].slice(
  0,
  6,
);

const features = [
  {
    title: "Curated premium catalog",
    description:
      "We focus on devices worth owning, with balanced specs, thoughtful design, and long-term value.",
  },
  {
    title: "Fast, dependable delivery",
    description:
      "Orders are processed quickly and packed carefully so your gear arrives ready to use.",
  },
  {
    title: "Human support that helps",
    description:
      "From buying advice to post-purchase questions, our team keeps support practical and clear.",
  },
];

const testimonials = [
  {
    quote:
      "The product selection feels intentional. I found a laptop that matched my workflow without digging through hundreds of weak options.",
    name: "Elena M.",
    role: "Product Designer",
  },
  {
    quote:
      "Checkout was smooth, shipping was fast, and the accessory bundle recommendation was genuinely useful instead of random upselling.",
    name: "Marcus T.",
    role: "Remote Consultant",
  },
  {
    quote:
      "The store feels premium without being fussy. Clear details, good pricing, and products I would actually recommend to friends.",
    name: "Nadia R.",
    role: "Content Creator",
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function Home() {
  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const heroCopyRef = useRef<HTMLParagraphElement>(null);
  const heroActionsRef = useRef<HTMLDivElement>(null);
  const heroVisualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          duration: 0.72,
          ease: "power2.out",
        },
      });

      timeline
        .from(heroBadgeRef.current, {
          y: 18,
          autoAlpha: 0,
        })
        .from(
          heroHeadingRef.current,
          {
            y: 36,
            autoAlpha: 0,
          },
          "-=0.4",
        )
        .from(
          heroCopyRef.current,
          {
            y: 24,
            autoAlpha: 0,
          },
          "-=0.46",
        )
        .from(
          heroActionsRef.current,
          {
            y: 20,
            autoAlpha: 0,
          },
          "-=0.42",
        )
        .from(
          heroVisualRef.current,
          {
            y: 30,
            autoAlpha: 0,
          },
          "-=0.62",
        )
        .to(
          heroVisualRef.current,
          {
            y: -8,
            repeat: -1,
            yoyo: true,
            duration: 2.8,
            ease: "sine.inOut",
          },
          "-=0.15",
        );
    });

    return () => context.revert();
  }, []);

  return (
    <div className="bg-transparent">
      <Section className="pt-16 sm:pt-20">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div className="space-y-8">
            <div
              ref={heroBadgeRef}
              className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-teal-200 shadow-md backdrop-blur"
            >
              Modern gear for work, travel, and everyday life
            </div>
            <div className="space-y-5">
              <h1
                ref={heroHeadingRef}
                className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                Premium gadgets chosen with taste, not clutter.
              </h1>
              <p
                ref={heroCopyRef}
                className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg"
              >
                Explore high-performance phones, laptops, and accessories in a
                storefront designed for confident buying and effortless browsing.
              </p>
            </div>
            <div ref={heroActionsRef} className="flex flex-col gap-4 sm:flex-row">
              <Link href="/items" className={buttonVariants(undefined, "px-6 py-3.5")}>
                Shop featured products
              </Link>
              <Link
                href="/about"
                className={buttonVariants("outline", "px-6 py-3.5")}
              >
                Learn about us
              </Link>
            </div>
            <StaggerGroup className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                { value: "8+", label: "Curated gadgets" },
                { value: "6", label: "Trusted brands" },
                { value: "4.7/5", label: "Average ratings" },
              ].map((stat) => (
                <StaggerItem key={stat.label}>
                  <Card className="p-5">
                    <p className="text-2xl font-semibold text-white">{stat.value}</p>
                    <p className="mt-2 text-sm text-slate-300">{stat.label}</p>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          <StaggerGroup
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
            delay={0.15}
            stagger={0.1}
          >
            {featuredProducts.slice(0, 2).map((product, index) => (
              <StaggerItem key={product.id}>
                <div ref={index === 0 ? heroVisualRef : undefined}>
                  <Card className="overflow-hidden p-0">
                    <div className="aspect-[4/5] overflow-hidden bg-[#151131]">
                      <Image
                        src={`${product.image}?auto=format&fit=crop&w=900&q=80`}
                        alt={product.title}
                        width={900}
                        height={1125}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="space-y-3 p-6">
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full bg-white/8 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-slate-300">
                          {product.category}
                        </span>
                        <span className="text-sm font-medium text-amber-300">
                          {product.rating.toFixed(1)} rating
                        </span>
                      </div>
                      <div>
                        <p className="text-xl font-semibold text-white">
                          {product.title}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {product.shortDesc}
                        </p>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-lg font-semibold text-white">
                          {formatPrice(product.price)}
                        </p>
                        <p className="text-sm text-slate-400">{product.brand}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Section>

      <Section>
        <MotionSection className="space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                Featured products
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white">
                Best picks for your next upgrade
              </h2>
              <p className="max-w-2xl text-base leading-7 text-slate-300">
                A short list of standout devices, selected for design quality,
                reliable performance, and everyday usefulness.
              </p>
            </div>
            <Link href="/items" className={buttonVariants("outline")}>
              Browse all items
            </Link>
          </div>

          <StaggerGroup className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <StaggerItem key={product.id}>
                <Card className="overflow-hidden p-0">
                  <div className="aspect-[4/3] overflow-hidden bg-[#151131]">
                    <Image
                      src={`${product.image}?auto=format&fit=crop&w=900&q=80`}
                      alt={product.title}
                      width={900}
                      height={675}
                      className="h-full w-full object-cover transition duration-200 hover:scale-[1.03]"
                    />
                  </div>
                  <div className="space-y-4 p-6">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="rounded-full bg-white/8 px-3 py-1 font-medium text-slate-300">
                        {product.category}
                      </span>
                      <span className="text-slate-400">{product.brand}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {product.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        {product.shortDesc}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-lg font-semibold text-white">
                        {formatPrice(product.price)}
                      </p>
                      <p className="text-sm font-medium text-amber-300">
                        {product.rating.toFixed(1)} / 5
                      </p>
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </MotionSection>
      </Section>

      <Section className="bg-slate-950">
        <MotionSection className="space-y-8">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Top brands
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Trusted names across every category
            </h2>
            <p className="max-w-2xl text-base leading-7 text-slate-300">
              Our catalog keeps the brand mix sharp, focused, and relevant to
              how people actually shop for tech now.
            </p>
          </div>

          <StaggerGroup className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {topBrands.map((brand) => (
              <StaggerItem key={brand}>
                <Card
                  className="border-white/10 bg-white/5 p-6 text-white backdrop-blur"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold">{brand}</p>
                      <p className="mt-2 text-sm text-slate-300">
                        Precision-built tech with a premium customer fit.
                      </p>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 text-sm font-semibold text-white shadow-md transition duration-200 hover:shadow-lg">
                      {brand
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </MotionSection>
      </Section>

      <Section>
        <MotionSection className="space-y-8">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
              Why choose us
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              A cleaner way to shop for modern tech
            </h2>
          </div>

          <StaggerGroup className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <StaggerItem key={feature.title}>
                <Card className="space-y-4 p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/40 text-sm font-semibold text-teal-200 shadow-md">
                    0{index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-7 text-slate-300">
                    {feature.description}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </MotionSection>
      </Section>

      <Section>
        <MotionSection className="space-y-8">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
              Testimonials
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              People notice the difference
            </h2>
          </div>

          <StaggerGroup className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <StaggerItem key={testimonial.name}>
                <Card className="space-y-6 p-8">
                  <p className="text-base leading-7 text-slate-300">
                    <span aria-hidden="true">&ldquo;</span>
                    {testimonial.quote}
                    <span aria-hidden="true">&rdquo;</span>
                  </p>
                  <div>
                    <p className="font-semibold text-white">
                      {testimonial.name}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      {testimonial.role}
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </MotionSection>
      </Section>
    </div>
  );
}
