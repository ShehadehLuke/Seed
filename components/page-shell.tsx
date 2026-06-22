import { cn } from "@/lib/utils";

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "main" | "section";
}

export function PageShell({
  children,
  className,
  as: Component = "div",
}: PageShellProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-5xl px-4 py-6 md:px-6 md:py-8",
        className,
      )}
    >
      {children}
    </Component>
  );
}
