import CreatePostForm from "@/components/forum-components/create_post_form"
import { Suspense } from "react";

export default function CreateNewPostPage(){
    return (
        <div className="flex flex-col items-center justify-center w-full h-fit mt-10">
            <main className="w-2/3 h-3/4">
                <Suspense>
                    <CreatePostForm />
                </Suspense>
            </main>
        </div>
    )
}