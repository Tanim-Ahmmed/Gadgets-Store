import { SkeletonCard } from "@/components/ui/skeleton-card";
import { Section } from "@/components/ui/section";

export default function ItemDetailsLoading() {
  return (
    <Section className="pt-16 sm:pt-20">
      <div className="space-y-8">
        <div className="h-10 w-32 animate-pulse rounded-xl bg-white/10" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="aspect-[4/3] animate-pulse rounded-xl border border-white/10 bg-card shadow-md" />

          <div className="rounded-xl border border-white/10 bg-card p-6 shadow-md sm:p-8">
            <div className="space-y-5">
              <div className="flex flex-wrap gap-3">
                <div className="h-7 w-24 animate-pulse rounded-full bg-white/10" />
                <div className="h-7 w-20 animate-pulse rounded-full bg-white/10" />
                <div className="h-7 w-16 animate-pulse rounded-full bg-white/10" />
              </div>
              <div className="h-12 w-4/5 animate-pulse rounded-2xl bg-white/10" />
              <div className="h-8 w-36 animate-pulse rounded-full bg-white/10" />
              <div className="space-y-3">
                <div className="h-4 w-full animate-pulse rounded-full bg-white/10" />
                <div className="h-4 w-full animate-pulse rounded-full bg-white/10" />
                <div className="h-4 w-3/4 animate-pulse rounded-full bg-white/10" />
              </div>
              <div className="grid grid-cols-1 gap-4 border-t border-white/10 pt-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="space-y-2">
                    <div className="h-4 w-20 animate-pulse rounded-full bg-white/10" />
                    <div className="h-5 w-24 animate-pulse rounded-full bg-white/10" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="h-4 w-24 animate-pulse rounded-full bg-white/10" />
            <div className="h-10 w-48 animate-pulse rounded-2xl bg-white/10" />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
