"use client"

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/client";
import { InfoIcon } from "lucide-react";
import { FetchDataSteps } from "@/components/tutorial/fetch-data-steps";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

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
    <div className="w-full flex h-fit items-center mt-[10vh] justify-around">
      <main className="flex flex-row w-1/2  gap-12 ">
        <div className="flex flex-col gap-y-8 items-start justify-start">
            <Link className="px-2 py-4 bg-gray-500/10 rounded-xl w-full shadow shadow-black" href="/profile">Overview</Link>
            <Link className="px-2 py-4 bg-gray-500/10 rounded-xl w-full shadow shadow-black" href="/profile/new-password">Update Password</Link>
            <Link className="px-2 py-4 bg-gray-500/10 rounded-xl w-full shadow shadow-black" href="/profile/posts">My Posts</Link>
        </div>
        <div className="w-full flex flex-col h-full">
          <div className="bg-green-800/80 text-lg p-3 px-5 rounded-md text-foreground flex gap-3 items-center w-full h-16 justify-center">
            <InfoIcon size="16" strokeWidth={2} />
            Profile
          </div>
          <div className="">
            <pre className="flex flex-col items-start justify-start p-3 rounded overflow-auto gap-12">
              <Suspense>
                <div className="flex flex-col gap-4 justify-between items-start p-6 w-full h-36 bg-gray-500/10 rounded-lg shadow shadow-black">
                  <h1 className="text-lg">Email</h1>
                  <Separator />
                  <p className="text-lg mt-4">{email}</p>
                </div>
                <div className="flex flex-col justify-between items-start p-6 w-full h-36 bg-gray-500/10 rounded-lg shadow shadow-black">
                  <h1 className="text-2xl">Username</h1>
                  <Separator />
                  <p className="text-lg mt-4">{displayName}</p>
                </div>
              </Suspense>
            </pre>
          </div>
        </div>
      </main> 
    </div>
  );
}
