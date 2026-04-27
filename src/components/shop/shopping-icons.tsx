import { cn } from "@/lib/utils";

type IconProps = {
  className?: string;
};

export function HeartIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn("h-5 w-5", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20.25 4.95 13.6a4.75 4.75 0 0 1 6.72-6.72L12 7.2l.33-.32a4.75 4.75 0 1 1 6.72 6.72L12 20.25Z" />
    </svg>
  );
}

export function CartIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn("h-5 w-5", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="19" r="1.5" />
      <circle cx="18" cy="19" r="1.5" />
      <path d="M3 4h2.2a1 1 0 0 1 .97.76l.68 2.74m0 0h12.89a1 1 0 0 1 .98 1.2l-1.15 5.3a1 1 0 0 1-.98.8H8.2a1 1 0 0 1-.97-.76L5.85 7.5Z" />
    </svg>
  );
}

export function BoltIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn("h-5 w-5", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 2 5 13h5l-1 9 8-11h-5l1-9Z" />
    </svg>
  );
}
