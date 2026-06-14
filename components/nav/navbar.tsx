import Link from "next/link"
import NavDropdown from "./dropdown"
import { Fascinate_Inline } from "next/font/google"
import { AuthButton } from "@/components/auth-button"
import { Suspense } from "react"

const fascinateinline = Fascinate_Inline({
    weight: "400"
})

export interface LinkInterface {
    title: string,
    href: string,
    children?: LinkInterface[],
}

const Links: LinkInterface[] = [
    {
        title: "Forums",
        href: "",
        children: [
            {
                title: "Tags",
                href: "/forums/tags",
            },
            {
                title: "Posts",
                href: "/forums/posts",
            }
        ]
    },
    {
        title: "Resources",
        href: "/resources",
    },
    {
        title: "Articles",
        href: "/articles",
    },
    {
        title: "Profile",
        href: "/profile",
    }
]

export default function NavBar() {
    
    return (
        <nav className={`flex flex-row items-center justify-between p-8 bg-gradient-to-r from-green-800/40 via-green-800/70 to-green-800/40 text-xl ${fascinateinline.className}`}>
            <Link href="/">Home</Link>
            <div className={`flex flex-row items-center justify-end gap-x-10`}>
                {Links.map((link) => (
                    <div key={link.href}>
                        {
                        link.children 
                        ? <NavDropdown parentLink={link} />
                        : <Link href={link.href}>{link.title}</Link>
                        }
                    </div>
                ))}

                <Suspense fallback={<div>Loading...</div>}>
                    <AuthButton />
                </Suspense>
            </div>
        </nav>
    )
}