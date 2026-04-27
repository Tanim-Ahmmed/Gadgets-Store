import { SkeletonCard } from "@/components/ui/skeleton-card";
import { Section } from "@/components/ui/section";

export default function ItemsLoading() {
  return (
    <Section className="pt-16 sm:pt-20">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="h-4 w-28 animate-pulse rounded-full bg-white/10" />
          <div className="h-12 w-full max-w-2xl animate-pulse rounded-2xl bg-white/10" />
          <div className="h-5 w-full max-w-xl animate-pulse rounded-full bg-white/10" />
        </div>

        <div className="rounded-xl border border-white/10 bg-card p-5 shadow-md sm:p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <div className="h-4 w-20 animate-pulse rounded-full bg-white/10" />
                <div className="h-12 animate-pulse rounded-xl bg-white/10" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    </Section>
  );
}
