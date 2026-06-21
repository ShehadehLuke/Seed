"use client"

import { createClient } from "@/lib/supabase/client"
import { useState, useEffect } from "react"
import { type PostThumbnail }from "@/types/post"
import Link from "next/link"
import { Badge } from "./ui/badge"

export default function LatestPostsHP() {
    const [pagePostThumbnails, setPagePostThumbnails] = useState<PostThumbnail[]>()

    useEffect(() => {
        async function getFrontPagePosts() {
            const supabase = createClient()
            const {data, error} = await supabase.from("posts").select("post_title, tags, post_subtitle, author_username, post_id").limit(4)
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
        }
        getFrontPagePosts()
    }, [])
    return (
        <div className="flex flex-row gap-4">
            {pagePostThumbnails?.map((post) => (
                <div key={post.postId} className="flex w-1/4 flex-col gap-2 rounded-md border border-border bg-secondary/50 p-4 shadow-lg">
                    <Link href={`/forums/posts/${post.postId}`} className="w-fit underline transition-transform hover:scale-105">{post.postTitle}</Link>
                    <p className="text-muted-foreground">{post.postSubtitle}</p>
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="max-w-96 truncate">{tag}</Badge>
                        ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{post.postAuthor}</p>
                </div>
            ))}
        </div>
    )
}