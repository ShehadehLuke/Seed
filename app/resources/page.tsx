import { LinkIcon } from "lucide-react";
import Link from "next/link";
import { Love_Ya_Like_A_Sister } from "next/font/google"

const love_ya = Love_Ya_Like_A_Sister({
    weight: "400",
})
interface Resource {
    name: string,
    hobby: string,
    link: string,
}

const resources: Resource[] = [
    {
        name: "Self Hosting: The Ultimate Guide for Beginners",
        hobby: "Self Hosting",
        link: "https://binarytechlabs.com/self-hosting-ultimate-guide/",
    },
    {
        name: "Awesome Self-Hosted",
        hobby: "Self Hosting",
        link: "https://github.com/awesome-selfhosted/awesome-selfhosted"
    }
]

export default function Page(){
    return (
        <div className="flex flex-col justify-center items-center h-[90vh]">
            <main className="grid grid-cols-6 grid-rows-4 p-8 h-full m-12 rounded-lg gap-4">
                {resources.map((resource) => (
                    <div key={resource.name} className={`flex flex-col justify-between bg-green-800/70 p-4 rounded-lg gap-4 h-50 ${love_ya.className}`}>
                        <Link href={resource.link} className="text-2xl hover:underline text-white">{resource.name}</Link>
                        <p className="w-fit p-1 rounded-2xl bg-orange-500/40">{resource.hobby}</p>
                    </div>
                ))}
            </main>
        </div>
    )
}