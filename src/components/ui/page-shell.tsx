import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

type PageShellProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

export function PageShell({ title, description, children }: PageShellProps) {
  return (
    <Section>
      <Card className="space-y-4 p-6 lg:p-8">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          {title}
        </h1>
        <p className="max-w-2xl text-base leading-7 text-slate-300">
          {description}
        </p>
        {children ? <div className="mt-6">{children}</div> : null}
      </Card>
    </Section>
  );
}
