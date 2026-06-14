import { Suspense } from "react";

export default function ProtectedLayout({
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
