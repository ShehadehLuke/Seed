"use client"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client";
import { type PostThumbnail } from "@/types/post" 
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";

export default function PostsPage() {
    const [sortSelection, setSortSelection] = useState<"Best" | "Newest" | "Oldest" | "Most Popular">("Best")
    const [pagePostThumbnails, setPagePostThumbnails] = useState<PostThumbnail[]>()
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getPagePosts(pageNumber: number) {
            setLoading(true)
            const supabase = createClient()
            const {data, error} = await supabase.from("posts").select("post_title, tags, post_subtitle, author_username, post_id").range((pageNumber - 1) * 25, (pageNumber*25) - 1).limit(25)
            if (error) {
                console.error(error)
                return
            }   
            setPagePostThumbnails(
                data.map((post) => 
                    ({
                        postTitle: post.post_title, 
                        postSubtitle: post.post_subtitle, 
                        tags: post.tags, 
                        postAuthor: post.author_username,
                        postId: post.post_id,
                    })
                )
            )
            pagePostThumbnails?.reverse()
        }
        getPagePosts(currentPage)
        .finally(() => {
            setLoading(false)
        })
    }, [currentPage])
    if (loading) {
        return (
            <PageShell className="flex flex-col items-center gap-4">
                <main className="flex min-h-[60vh] w-full flex-col gap-4 card md:min-h-[80vh]">
                    <h1 className="text-2xl font-bold md:text-3xl">Posts</h1>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <Link href="/forums/create-new-post" className="w-fit rounded-lg border border-border p-2 text-center shadow-md transition-colors hover:bg-accent hover:text-accent-foreground">Create Post</Link>
                    </div>
                    <p>Loading...</p>
                </main>
            </PageShell>
        )
    }
    return (
        <PageShell className="flex flex-col items-center gap-4">
            <main className="flex min-h-[60vh] w-full flex-col gap-4 card md:min-h-[80vh]">
                <h1 className="text-2xl font-bold md:text-3xl">Posts</h1>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <Link href="/forums/create-new-post" className="w-fit rounded-lg border border-border p-2 text-center shadow-md transition-colors hover:bg-accent hover:text-accent-foreground">Create Post</Link>
                </div>
                {pagePostThumbnails?.map((thumbnail) => (
                    <div key={thumbnail.postId} className="flex flex-col gap-2 rounded-lg bg-muted/50 p-3 sm:flex-row sm:items-start sm:justify-between sm:gap-8 sm:p-2">
                        <div className="flex min-w-0 flex-col gap-0">
                            <Link href={`/forums/posts/${thumbnail.postId}`} className="hover:underline">{thumbnail.postTitle}</Link>
                            <p className="text-sm text-muted-foreground sm:text-base">{thumbnail.postSubtitle}</p>
                        </div>
                        <p className="shrink-0 text-sm text-muted-foreground sm:text-base">{thumbnail.postAuthor}</p>
                    </div>
                ))}
            </main>
            <div className="flex flex-row items-center gap-4 sm:gap-8">
                <Button disabled={currentPage < 2} onClick={() => setCurrentPage(currentPage - 1)} className="p-0"><ArrowLeft /></Button>
                <p>{currentPage}</p>
                <Button disabled={(pagePostThumbnails?.length ?? 0) < 25} onClick={() => setCurrentPage(currentPage + 1)} className="p-0"><ArrowRight /></Button>
            </div>
        </PageShell>
    )
}
