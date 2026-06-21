"use client"

import { useEffect, useState } from "react";
import {type PostThumbnail } from "@/types/post"
import { createClient } from "@/lib/supabase/client";
import { Love_Ya_Like_A_Sister } from "next/font/google"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const love_ya = Love_Ya_Like_A_Sister({
    weight: "400",
})

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
        <div className="flex flex-col items-center justify-center p-8 w-full">
            <div className="flex h-fit min-h-[80vh] w-2/3 flex-col gap-4 card p-10">
                {userPosts?.map((thumbnail) => (
                    <div key={thumbnail.postId} className={`flex w-full flex-row justify-between gap-8 rounded-lg bg-muted/50 p-2 ${love_ya.className}`}>
                        <div className={`flex flex-col gap-0`}>
                            <a href={`/forums/posts/${thumbnail.postId}`} className="hover:underline">{thumbnail.postTitle}</a>
                            <p>{thumbnail.postSubtitle}</p>
                        </div>
                        <div>
                            <p>{thumbnail.postAuthor}</p>
                            <Button variant="destructive" onClick={(postId) => handleDelete(thumbnail.postId)}>Delete</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}