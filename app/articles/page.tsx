import { PageShell } from "@/components/page-shell";

export default function Page() {
    return (
        <PageShell className="flex min-h-[60vh] flex-col justify-center md:min-h-[80vh]">
            <main className="card w-full p-6 md:p-8">
                <h1 className="text-xl md:text-2xl">Articles</h1>
                <p className="mt-2 text-muted-foreground">No articles yet. Check back later!</p>
            </main>
        </PageShell>
    )
}
