"use client"
import { useEffect, useState } from "react"
import { type Tag } from "@/types/tags"
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import Link from "next/link";

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
        <PageShell className="flex flex-col items-center gap-4">
            <main className="flex min-h-[60vh] w-full flex-col gap-4 card md:min-h-[80vh]">
                <h1 className="text-2xl font-bold md:text-3xl">Tags</h1>
                <div className="flex flex-col items-start justify-start gap-2">
                    {tags?.map((tag) => (
                        <div key={tag.name} className="flex w-full flex-row items-center justify-between gap-4 rounded-lg bg-muted/50 py-2 pl-2 pr-4 sm:pr-6">
                            <Link href={`/forums/tags/${tag.name}`} className="truncate text-base sm:text-lg hover:underline">{tag.name}</Link>
                            <p className="shrink-0">{tag.occurences}</p>
                        </div>
                    ))}
                </div>
            </main>
            <div className="flex flex-row items-center gap-4 sm:gap-8">
                <Button disabled={currentPage < 2} onClick={() => setCurrentPage(currentPage - 1)} className="p-0"><ArrowLeft /></Button>
                <p>{currentPage}</p>
                <Button disabled={(tags?.length ?? 0) < 25} onClick={() => setCurrentPage(currentPage + 1)} className="p-0"><ArrowRight /></Button>
            </div>
        </PageShell>
    )
}
