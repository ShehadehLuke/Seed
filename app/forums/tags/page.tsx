"use client"
import { Love_Ya_Like_A_Sister } from "next/font/google"
import { Fascinate_Inline } from "next/font/google"
import { useEffect, useState } from "react"
import { type Tag } from "@/types/tags"
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const love_ya = Love_Ya_Like_A_Sister({
    weight: "400",
})

const fascinateinline = Fascinate_Inline({
    weight: "400"
})

export default function Page(){
    const [tags, setTags] = useState<Tag[]>()
    const [currentPage, setCurrentPage] = useState(1)
    const [globalError, setGlobalError] = useState<Error>()

    useEffect(() => {
        async function getPageTags(pageNumber: number) {
            const supabase = createClient()
            const {data, error} = await supabase.from("tags").select("tag_name, tag_occurences").range((pageNumber - 1) * 50, (pageNumber*50) - 1).limit(50)
            if (error) {
                setGlobalError(error)
                toast.error(globalError?.message + ". Failed fetching tags.")
                return
            }
            setTags(
                data.map((tag) => 
                    ({
                        name: tag.tag_name,
                        occurences: tag.tag_occurences
                    })
                )
            )
            tags?.reverse()
        }
        getPageTags(currentPage)
    }, [currentPage])

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <main className="flex flex-col gap-4 w-2/3 bg-green-800/40 p-10 min-h-[80vh] rounded-md border-4 border-black shadow-lg shadow-black h-fit">
                <h1 className={`text-3xl font-bold ${fascinateinline.className}`}>Tags</h1>
                <div className={`flex flex-col gap-2 items-start justify-start ${love_ya.className}`}>
                    {tags?.map((tag) => (
                        <div key={tag.name} className="flex flex-row items-center justify-between bg-white/50 w-full pr-6 pl-2 rounded-lg">
                            <p className="text-lg">{tag.name}</p>
                            <p>{tag.occurences}</p>
                        </div>
                    ))}
                </div>
            </main>
            <div className="flex flex-row gap-8 mt-2">
                <Button disabled={currentPage < 2} onClick={() => setCurrentPage(currentPage - 1)} className="p-0 bg-green-800/70"><ArrowLeft /></Button>
                <p className="hover:underline">{currentPage}</p>
                <Button disabled={(tags?.length ?? 0) < 25} onClick={() => setCurrentPage(currentPage + 1)} className="p-0 bg-green-800/70"><ArrowRight /></Button>
            </div>
        </div>
    )
}