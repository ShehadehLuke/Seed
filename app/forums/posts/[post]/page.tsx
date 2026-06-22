"use client"
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { use } from 'react'
import StarterKit from '@tiptap/starter-kit'
import Strike from "@tiptap/extension-strike"
import { renderToHTMLString } from "@tiptap/static-renderer/pm/html-string";
import DOMPurify from "dompurify"
import { type Post } from "@/types/post"
import { PageShell } from "@/components/page-shell"
import Link from "next/link";

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
        <PageShell className="flex flex-col items-center">
            <main className="min-h-[50vh] w-full card p-4 md:p-6">
                {
                loading 
                ? <h1>Loading...</h1> 
                : (
                <div className="flex h-full flex-col gap-6 md:gap-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">{postContent.postTitle}</h1>
                        <h2 className="text-lg text-muted-foreground sm:text-xl md:text-2xl">{postContent.postSubtitle}</h2>
                        <p className="text-sm text-muted-foreground sm:text-base">{postContent.postAuthor}</p>
                        <p className="text-sm text-muted-foreground sm:text-base">{postContent.createdAt}</p>
                        <div className="flex flex-row items-center gap-2">
                            {postContent.tags.map((tag) => (
                                <Link href={`/forums/tags/${tag}`} className="text-sm text-muted-foreground sm:text-base hover:underline">{tag}</Link>
                            ))}
                        </div>
                    </div>
                    <hr />
                    <div className="h-full overflow-x-auto rounded-lg border border-border p-3 shadow-inner sm:p-4 [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl [&_h4]:text-lg [&_h5]:text-base [&_h6]:text-sm md:[&_h1]:text-5xl md:[&_h2]:text-4xl md:[&_h3]:text-3xl md:[&_h4]:text-2xl md:[&_h5]:text-xl md:[&_h6]:text-lg" dangerouslySetInnerHTML={{ __html: postContent.postBody}}></div>
                </div>
                )}
            </main>
        </PageShell>
    )
}