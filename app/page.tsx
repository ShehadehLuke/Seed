import Image from "next/image";
import { Fascinate_Inline } from "next/font/google"

const fascinateinline = Fascinate_Inline({
    weight: "400"
})


export default function Home() {
  return (
    <div className="flex flex-col p-8">
      <div className="flex flex-row p-8">
        <h1 className={`text-4xl uppercase bold ${fascinateinline.className}`}>Seed - The Site for Hobby Exploration</h1> 
      </div>
    </div>
  );
}
