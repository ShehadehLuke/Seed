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

const fascinateinline = Fascinate_Inline({
    weight: "400"
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
            <main className="flex flex-col gap-4 w-2/3 bg-green-800/40 p-10 min-h-[80vh] rounded-md border-4 border-black shadow-lg shadow-black h-fit">
                <h1 className={`text-3xl font-bold ${fascinateinline.className}`}>Posts</h1>
                <div className={`flex flex-row gap-2 items-center justify-between ${love_ya.className}`}>
                    <Link href="/forums/create-new-post" className="p-2 rounded-lg shadow-md shadow-black border border-white hover:bg-white hover:text-black transition-colors">Create Post</Link>
                    {/*<DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="bg-green-800/10 border shadow-md shadow-black" variant="outline">Sort</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className={`bg-green-500/40 border-black border ${love_ya.className}`}>
                            <DropdownMenuItem onSelect={() => setSortSelection("Best")}>Best</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setSortSelection("Newest")}>Newest</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setSortSelection("Oldest")}>Oldest</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setSortSelection("Most Popular")}>Most Popular</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>*/}
                </div>
                {pagePostThumbnails?.map((thumbnail) => (
                    <div key={thumbnail.postId} className={`flex flex-row gap-8 w-full rounded-lg bg-white/10 p-2 justify-between ${love_ya.className}`}>
                        <div className={`flex flex-col gap-0`}>
                            <a href={`/forums/posts/${thumbnail.postId}`} className="hover:underline">{thumbnail.postTitle}</a>
                            <p>{thumbnail.postSubtitle}</p>
                        </div>
                        <p>{thumbnail.postAuthor}</p>
                    </div>
                ))}
            </main>
            <div className="flex flex-row gap-8 mt-2">
                <Button disabled={currentPage < 2} onClick={() => setCurrentPage(currentPage - 1)} className="p-0 bg-green-800/70"><ArrowLeft /></Button>
                <p className="hover:underline">{currentPage}</p>
                <Button disabled={(pagePostThumbnails?.length ?? 0) < 25} onClick={() => setCurrentPage(currentPage + 1)} className="p-0 bg-green-800/70"><ArrowRight /></Button>
            </div>
        </div>
    )
}