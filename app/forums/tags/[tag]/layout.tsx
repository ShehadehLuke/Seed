import { Suspense } from "react";

export default function TagLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full">
        <Suspense>
            {children}
        </Suspense>
    </main>
  );
}
