"use client"

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/client";
import { InfoIcon } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { PageShell } from "@/components/page-shell";

export default function ProtectedPage() {
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  useEffect(() => {
    async function UserDetails() {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getClaims();

      if (error || !data?.claims) {
        redirect("/auth/login");
      }

      setEmail(data.claims.email ?? "Email not found") 
      setDisplayName(data.claims.user_metadata?.display_name as string ?? "Username not found")
    }
    UserDetails()
  }, [])
  return (
    <PageShell>
      <main className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        <nav className="flex flex-row flex-wrap gap-3 lg:w-48 lg:flex-col lg:gap-y-4">
            <Link className="card px-3 py-3 shadow sm:flex-1 lg:w-full lg:flex-none lg:py-4" href="/profile">Overview</Link>
            <Link className="card px-3 py-3 shadow sm:flex-1 lg:w-full lg:flex-none lg:py-4" href="/profile/new-password">Update Password</Link>
            <Link className="card px-3 py-3 shadow sm:flex-1 lg:w-full lg:flex-none lg:py-4" href="/profile/posts">My Posts</Link>
        </nav>
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="flex min-h-14 w-full items-center justify-center gap-3 card p-3 text-base text-foreground sm:text-lg">
            <InfoIcon size="16" strokeWidth={2} />
            Profile
          </div>
          <div className="flex flex-col gap-6 sm:gap-8">
              <Suspense>
                <div className="flex min-h-28 w-full flex-col items-start justify-between rounded-lg bg-muted/50 p-4 shadow sm:p-6">
                  <h2 className="text-base font-medium sm:text-lg">Email</h2>
                  <Separator />
                  <p className="mt-2 break-all text-sm sm:text-lg">{email}</p>
                </div>
                <div className="flex min-h-28 w-full flex-col items-start justify-between rounded-lg bg-muted/50 p-4 shadow sm:p-6">
                  <h2 className="text-lg font-medium sm:text-2xl">Username</h2>
                  <Separator />
                  <p className="mt-2 break-all text-sm sm:text-lg">{displayName}</p>
                </div>
              </Suspense>
          </div>
        </div>
      </main> 
    </PageShell>
  );
}
