import Link from "next/link";
import { PageShell } from "@/components/page-shell";

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
    },
    {
        name: "DND 5e Wikidot",
        hobby: "DND 5e",
        link: "https://dnd5e.wikidot.com/",
    },
    {
        name: "5e Tools",
        hobby: "DND 5e",
        link: "https://5e.tools/",
    },
    {
        name: "Yoga Basics; Yoga for Beginners",
        hobby: "Yoga",
        link: "https://www.yogabasics.com/practice/yoga-for-beginners/",
    }
]

export default function Page(){
    return (
        <PageShell>
            <main className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {resources.map((resource) => (
                    <div key={resource.name} className="flex min-h-48 flex-col justify-between gap-4 card p-4">
                        <Link href={resource.link} className="text-lg hover:underline sm:text-xl md:text-2xl">{resource.name}</Link>
                        <p className="w-fit rounded-2xl bg-secondary p-1 text-sm">{resource.hobby}</p>
                    </div>
                ))}
            </main>
        </PageShell>
    )
}
