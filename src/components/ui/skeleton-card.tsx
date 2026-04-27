import { cn } from "@/lib/utils";

type SkeletonCardProps = {
  className?: string;
  showImage?: boolean;
  lineCount?: number;
};

export function SkeletonCard({
  className,
  showImage = true,
  lineCount = 3,
}: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/10 bg-card shadow-md",
        className,
      )}
    >
      {showImage ? (
        <div className="aspect-[4/3] animate-pulse bg-white/8" />
      ) : null}

      <div className="space-y-4 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="h-6 w-24 animate-pulse rounded-full bg-white/10" />
          <div className="h-4 w-16 animate-pulse rounded-full bg-white/10" />
        </div>

        <div className="space-y-3">
          <div className="h-6 w-2/3 animate-pulse rounded-full bg-white/10" />
          {Array.from({ length: lineCount }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-4 animate-pulse rounded-full bg-white/10",
                index === lineCount - 1 ? "w-3/5" : "w-full",
              )}
            />
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          <div className="h-5 w-24 animate-pulse rounded-full bg-white/10" />
          <div className="h-10 w-28 animate-pulse rounded-xl bg-white/10" />
        </div>
      </div>
    </div>
  );
}
