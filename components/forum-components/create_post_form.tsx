"use client"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import {
    Input
} from "@/components/ui/input"
import {
    Button
} from "@/components/ui/button"
import { useState, useEffect, KeyboardEvent, Suspense } from "react"
import { createClient } from "@/lib/supabase/client"
import { MenuBar } from "./editor-components/menubar";
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Strike from "@tiptap/extension-strike"
import { toast } from "sonner"

export default function CreatePostForm() {
    const [postTitle, setPostTitle] = useState("")
    const [postSubtitle, setPostSubtitle] = useState("")
    const [tags, setTags] = useState<string[]>([])
    const [tagInput, setTagInput] = useState("")
    const [globalError, setGlobalError] = useState<Error>()

    async function handleCreatePost() {
        const supabase = createClient();
        const { data: {user} } = await supabase.auth.getUser()
        if (user) {     
            const { data, error } = await supabase.from("posts").insert({tags: tags, post_title: postTitle, post_subtitle: postSubtitle, post_body: editor?.getJSON(), author_user_id: user.id, author_username: user.user_metadata.display_name})
            if (error) {
                setGlobalError(error)
            }
            tags.forEach(async (tag) => {
                const tagData = (await supabase.from("tags").select("tag_name, tag_occurences").eq("tag_name", tag).single()).data
                if (!tagData) {
                    const { data, error } = await supabase.from("tags").insert({tag_name: tag, tag_occurences: 1})
                    if (error) {
                        setGlobalError(error)
                    }
                }
                else {
                    const { data, error } = await supabase.from("tags").update({tag_occurences: tagData?.tag_occurences + 1}).eq("tag_name", tag)
                    if (error) {
                        setGlobalError(error)
                    }
                }
            })
            if (globalError){
                toast.error(globalError.message + ". Please try again later")
                return
            }
            setPostTitle("")
            setPostSubtitle("")
            editor?.commands.clearContent()
            setTagInput("")
            setTags([])
        }
    }
    
    function handleTagInputKeyDown(event: KeyboardEvent){
        if (event.key === "Enter"){
            setTags([...tags, tagInput.toLowerCase()])
            setTagInput("")
        }
    }

    const editor = useEditor({
        extensions: [StarterKit, Strike, ],
        content: ``,
        immediatelyRender: false,

    })

    return (
        <div className="w-full h-full card p-10">
            <FieldSet className="h-[90%]">
                <FieldLegend>Create New Post</FieldLegend>
                <FieldGroup className="h-full">
                    <Field>
                        <FieldLabel>Post Title</FieldLabel>
                        <Input id="title" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} autoComplete="off" placeholder="Super cool post title..." />
                    </Field>
                    <Field>
                        <FieldLabel>Post Subtitle</FieldLabel>
                        <Input id="subtitle" value={postSubtitle} onChange={(e) => setPostSubtitle(e.target.value)} autoComplete="off" placeholder="Super cool post subtitle..." />
                    </Field>
                    <Field>
                        <FieldLabel>Tags</FieldLabel>
                        <Input id="tags" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => handleTagInputKeyDown(e)} />
                        <div className="flex flex-row gap-2">  
                            {tags.map((tag) => (
                                <p key={tag} className="max-w-fit rounded-2xl bg-secondary px-2 py-1">{tag}</p>
                            ))}
                        </div> 
                    </Field>
                    <Field className="h-full">
                        <FieldLabel>Post Content</FieldLabel>
                        <MenuBar editor={editor}/>
                        <EditorContent editor={editor} />
                    </Field>
                </FieldGroup>
            </FieldSet>
            <Button onClick={handleCreatePost} className="mt-4 mr-4">Post</Button>
            <Button variant="destructive">Cancel</Button>
        </div>
    )
}