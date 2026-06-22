import type { Editor } from "@tiptap/core"
import { useEditorState } from "@tiptap/react"
import { Bold, Code, Heading, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Italic, Pilcrow, Strikethrough } from "lucide-react"
import React from "react"

import { menuBarStateSelector } from "./menuBarState"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";

export const MenuBar = ({ editor }: { editor: Editor | null }) => {
    const editorState = useEditorState({
        editor,
        selector: menuBarStateSelector
    })

    if (!editor) {
        return null
    }
    
    return (
        <div className="my-2 flex w-full flex-wrap gap-2 rounded-lg bg-muted/50 px-2 py-2 sm:px-4">
            <button className={`rounded-md p-1 ${editorState?.isBold ? "bg-accent" : ""}`} onClick={() => editor.chain().focus().toggleBold().run()}><Bold height={20} width={20} /></button>
            <button className={`rounded-md p-1 ${editorState?.isStrike ? "bg-accent" : ""}`} onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough height={20} width={20} /></button>
            <button className={`rounded-md p-1 ${editorState?.isItalic ? "bg-accent" : ""}`} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic height={20} width={20} /></button>
            <button className={`rounded-md p-1 ${editorState?.isCode ? "bg-accent" : ""}`} onClick={() => editor.chain().focus().toggleCode().run()}><Code height={20} width={20} /></button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className={`rounded-md p-1`}><Heading /></button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <DropdownMenuLabel>Header Level</DropdownMenuLabel>
                        <DropdownMenuRadioGroup>
                            <DropdownMenuRadioItem value="heading1" onSelect={() => editor.chain().focus().toggleHeading({level:1}).run()}><Heading1 /></DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="heading2" onSelect={() => editor.chain().focus().toggleHeading({level:2}).run()}><Heading2 /></DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="heading3" onSelect={() => editor.chain().focus().toggleHeading({level:3}).run()}><Heading3 /></DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="heading4" onSelect={() => editor.chain().focus().toggleHeading({level:4}).run()}><Heading4 /></DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="heading5" onSelect={() => editor.chain().focus().toggleHeading({level:5}).run()}><Heading5 /></DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="heading6" onSelect={() => editor.chain().focus().toggleHeading({level:6}).run()}><Heading6 /></DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="paragraph" onSelect={() => editor.chain().focus().setParagraph().run()}><Pilcrow /></DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}