"use client"

import { useEffect, useState } from "react";
import {type PostThumbnail } from "@/types/post"
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
import { PageShell } from "@/components/page-shell";

export default function Page(){
    const [userPosts, setUserPosts] = useState<PostThumbnail[]>()
    const [globalError, setGlobalError] = useState<Error>()

    useEffect(() => {
        async function getPagePosts(pageNumber: number) {
            const supabase = createClient()
            const { data: {user} } = await supabase.auth.getUser()
            const {data, error} = await supabase.from("posts").select("post_title, tags, post_subtitle, author_username, post_id").eq("author_user_id", user?.id).limit(25)
            if (error) {
                console.error(error)
                return
            }
            setUserPosts(
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
        getPagePosts(1)
    }, [])

    async function handleDelete(postId: number){
        const supabase = createClient()
        const { data: {user} } = await supabase.auth.getUser()
        const {data, error} = await supabase.from("posts").delete().select("tags").eq("post_id", postId).eq("author_user_id", user?.id).single()
        if (error){
            setGlobalError(error)
            return
        }
        const modifiedTags: string[] = data?.tags
        modifiedTags.forEach(async (tag) => {
            const data = (await supabase.from("tags").select("tag_occurences").eq("tag_name", tag).single()).data
            const { error } = await supabase.from("tags").update({tag_occurences: data?.tag_occurences - 1}).eq("tag_name", tag)
            if (error) {
                setGlobalError(error)
                return
            }
        });
        if (globalError) {
            toast.error("Error occured trying to delete post: " + globalError.message)
            return
        }
        setUserPosts(userPosts?.filter((post) => post.postId !== postId))
    }
    return (
        <PageShell>
            <div className="flex min-h-[60vh] w-full flex-col gap-4 card p-4 sm:p-6 md:min-h-[80vh] md:p-10">
                {userPosts?.map((thumbnail) => (
                    <div key={thumbnail.postId} className="flex flex-col gap-3 rounded-lg bg-muted/50 p-3 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                        <div className="flex min-w-0 flex-col gap-0">
                            <Link href={`/forums/posts/${thumbnail.postId}`} className="hover:underline">{thumbnail.postTitle}</Link>
                            <p className="text-sm text-muted-foreground">{thumbnail.postSubtitle}</p>
                        </div>
                        <div className="flex shrink-0 flex-row items-center gap-3 sm:flex-col sm:items-end">
                            <p className="text-sm text-muted-foreground">{thumbnail.postAuthor}</p>
                            <Button variant="destructive" onClick={() => handleDelete(thumbnail.postId)}>Delete</Button>
                        </div>
                    </div>
                ))}
            </div>
        </PageShell>
    )
}
