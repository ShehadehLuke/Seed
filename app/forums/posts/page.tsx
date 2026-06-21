"use client"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react"
import { Fascinate_Inline } from "next/font/google"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client";
import { Love_Ya_Like_A_Sister } from "next/font/google"
import { type PostThumbnail } from "@/types/post" 
import { ArrowLeft, ArrowRight } from "lucide-react";

const love_ya = Love_Ya_Like_A_Sister({
    weight: "400",
})

export default function PostsPage() {
    const [sortSelection, setSortSelection] = useState<"Best" | "Newest" | "Oldest" | "Most Popular">("Best")
    const [pagePostThumbnails, setPagePostThumbnails] = useState<PostThumbnail[]>()
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        async function getPagePosts(pageNumber: number) {
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
    }, [currentPage])

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <main className="flex h-fit min-h-[80vh] w-2/3 flex-col gap-4 card">
                <h1 className="text-3xl font-bold">Posts</h1>
                <div className={`flex flex-row items-center justify-between gap-2 ${love_ya.className}`}>
                    <Link href="/forums/create-new-post" className="rounded-lg border border-border p-2 shadow-md transition-colors hover:bg-accent hover:text-accent-foreground">Create Post</Link>
                    {/*<DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="bg-[--card] border shadow-md shadow-black" variant="outline">Sort</Button>
                        </DropdownMenuTrigger>  
                        <DropdownMenuContent className={`bg-[--card] border-black border ${love_ya.className}`}>
                            <DropdownMenuItem onSelect={() => setSortSelection("Best")}>Best</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setSortSelection("Newest")}>Newest</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setSortSelection("Oldest")}>Oldest</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setSortSelection("Most Popular")}>Most Popular</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>*/}
                </div>
                {pagePostThumbnails?.map((thumbnail) => (
                    <div key={thumbnail.postId} className={`flex w-full flex-row justify-between gap-8 rounded-lg bg-muted/50 p-2 ${love_ya.className}`}>
                        <div className={`flex flex-col gap-0`}>
                            <a href={`/forums/posts/${thumbnail.postId}`} className="hover:underline">{thumbnail.postTitle}</a>
                            <p>{thumbnail.postSubtitle}</p>
                        </div>
                        <p>{thumbnail.postAuthor}</p>
                    </div>
                ))}
            </main>
            <div className="flex flex-row gap-8 mt-2">
                <Button disabled={currentPage < 2} onClick={() => setCurrentPage(currentPage - 1)} className="p-0"><ArrowLeft /></Button>
                <p className="hover:underline">{currentPage}</p>
                <Button disabled={(pagePostThumbnails?.length ?? 0) < 25} onClick={() => setCurrentPage(currentPage + 1)} className="p-0"><ArrowRight /></Button>
            </div>
        </div>
    )
}