"use client"

import { createClient } from "@/lib/supabase/client"
import { useState, useEffect } from "react"
import { type PostThumbnail }from "@/types/post"
import Link from "next/link"
import { Badge } from "./ui/badge"

export default function LatestPostsHP() {
    const [pagePostThumbnails, setPagePostThumbnails] = useState<PostThumbnail[]>()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
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
        .finally(() => {
            setLoading(false)
        })
    }, [])
    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pagePostThumbnails?.map((post) => (
                <div key={post.postId} className="flex flex-col gap-2 rounded-md border border-border bg-secondary/50 p-4 shadow-lg">
                    <Link href={`/forums/posts/${post.postId}`} className="w-fit underline transition-transform hover:scale-105">{post.postTitle}</Link>
                    <p className="text-muted-foreground">{post.postSubtitle}</p>
                    <div className="flex flex-wrap gap-2 max-h-xl overflow-y-auto">
                        {post.tags.map((tag) => (
                            <Link href={`/forums/tags/${tag}`} key={tag} className="bg-accent px-2 py-1 rounded-2xl max-w-96 truncate hover:underline">{tag}</Link>
                        ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{post.postAuthor}</p>
                </div>
            ))}
        </div>
    )
}