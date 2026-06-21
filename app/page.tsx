import Image from "next/image";
import { Fascinate_Inline } from "next/font/google"
import LatestPostsHP from "@/components/latest-posts-hp";

export default function Home() {
  return (
    <div className="flex flex-col p-8">
      <div className="flex flex-row p-8">
        <h1 className={`text-4xl uppercase bold`}>Seed - The Site for Hobby Exploration</h1> 
      </div>
      <div className="flex flex-col gap-8 card">
        <h3 className={`text-2xl`}>Check out the latest posts</h3>
        <LatestPostsHP />
      </div>
    </div>
  );
}
