"use client"

import { PostThumbnail } from "@/types/post";
import { useState, useEffect } from "react";
import { use } from "react";
import { createClient } from "@/lib/supabase/client";
import { PageShell } from "@/components/page-shell";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function TagPage({params}:{params: Promise<{tag: string}>}) {
    const { tag } = use(params);
    const [loading, setLoading] = useState(false);
    const [pagePostThumbnails, setPagePostThumbnails] = useState<PostThumbnail[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setLoading(true)
        async function getPagePosts(page: number) {
            const supabase = createClient()
            const {data, error} = await supabase.from("posts").select("*").contains("tags", [tag])
            if (error) {
                console.error(error)
                return
            }
            setPagePostThumbnails(data.map((post) => ({
                postId: post.post_id,
                postTitle: post.post_title,
                postSubtitle: post.post_subtitle,
                tags: post.tags,
                postAuthor: post.author_username,
            })))
            pagePostThumbnails?.reverse()
        }
        getPagePosts(currentPage)
        .catch((error) => {
            console.error(error)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [tag, currentPage])
    return (
        <PageShell className="flex flex-col items-center gap-4">
            <main className="flex min-h-[60vh] w-full flex-col gap-4 card md:min-h-[80vh]">
                <h1 className="text-2xl font-bold md:text-3xl">Posts tagged with {tag}</h1>
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