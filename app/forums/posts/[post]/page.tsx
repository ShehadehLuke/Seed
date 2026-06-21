"use client"
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { use } from 'react'
import { Love_Ya_Like_A_Sister } from "next/font/google"
import StarterKit from '@tiptap/starter-kit'
import Strike from "@tiptap/extension-strike"
import { renderToHTMLString } from "@tiptap/static-renderer/pm/html-string";
import DOMPurify from "dompurify"
import { type Post } from "@/types/post"

const love_ya = Love_Ya_Like_A_Sister({
    weight: "400",
})

export default function PostPage({params}:{params: Promise<{post: string}>}){
    const { post } = use(params)
    const [loading, setLoading] = useState(false)
    const [postContent, setPostContent] = useState<Post>({postTitle: "", postSubtitle: "", postAuthor: "", postBody: JSON.parse("{}"), createdAt: "", tags: []});

    useEffect(() => {
        setLoading(true)
        async function getPost(){
            const supabase = createClient()
            const {data, error} = await supabase.from("posts").select("*").eq("post_id", post).single()
            return {data, error}
        }
        getPost()
        .then((response) => {
            console.log(response.data?.post_body)
            setPostContent({
                postTitle: response.data?.post_title, 
                postSubtitle: response.data?.post_subtitle, 
                postAuthor: response.data?.author_username,
                postBody: renderToHTMLString({
                            extensions: [StarterKit, Strike],
                            content: response.data?.post_body,
                        }),
                createdAt: response.data?.created_at,
                tags: response.data?.tags,
            })
            postContent.postBody = DOMPurify.sanitize(postContent.postBody)
        })
        .catch((error) => {
            console.error(error)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])
    
    return(
        <div className="flex flex-col items-center justify-center h-full">
            <main className={`h-fit min-h-[50vh] w-2/3 card p-4 ${love_ya.className}`}>
                {
                loading 
                ? <h1>Loading...</h1> 
                : (
                <div className="flex flex-col gap-8 h-full">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl">{postContent.postTitle}</h1>
                        <h2 className="text-2xl">{postContent.postSubtitle}</h2>
                    </div>
                    <hr />
                    <div className="h-full rounded-lg border border-border p-4 shadow-inner [&_h1]:text-5xl [&_h2]:text-4xl [&_h3]:text-3xl [&_h4]:text-2xl [&_h5]:text-xl [&_h6]:text-lg" dangerouslySetInnerHTML={{ __html: postContent.postBody}}></div>
                </div>
                )}
            </main>
        </div>
    )
}