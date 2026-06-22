import { UpdatePasswordForm } from "@/components/update-password-form";
import { PageShell } from "@/components/page-shell";

export default function Page() {
    return (
        <PageShell className="flex items-center justify-center">
            <div className="w-full max-w-md">
                <UpdatePasswordForm />
            </div>
        </PageShell>
    )
}
