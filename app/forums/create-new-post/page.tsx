import CreatePostForm from "@/components/forum-components/create_post_form"
import { Suspense } from "react";
import { PageShell } from "@/components/page-shell";

export default function CreateNewPostPage(){
    return (
        <PageShell>
            <main className="w-full">
                <Suspense>
                    <CreatePostForm />
                </Suspense>
            </main>
        </PageShell>
    )
}
