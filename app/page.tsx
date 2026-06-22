import LatestPostsHP from "@/components/latest-posts-hp";
import { PageShell } from "@/components/page-shell";

export default function Home() {
  return (
    <PageShell className="flex flex-col gap-6 md:gap-8">
      <header>
        <h1 className="text-2xl font-bold uppercase sm:text-3xl md:text-4xl">
          Seed - The Site for Hobby Exploration
        </h1>
      </header>
      <section className="flex flex-col gap-6 card md:gap-8">
        <h2 className="text-xl md:text-2xl">Check out the latest posts</h2>
        <LatestPostsHP />
      </section>
    </PageShell>
  );
}
