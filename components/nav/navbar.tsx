import Link from "next/link"
import NavDropdown from "./dropdown"
import { AuthButton } from "@/components/auth-button"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { Suspense } from "react"

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
        <nav className="flex flex-row items-center justify-between border-b-2 border-border bg-card/80 p-4 backdrop-blur md:px-8 md:py-4">
            <Link href="/" className="text-lg font-semibold">Home</Link>
            <div className="flex flex-row items-center justify-end gap-x-6 md:gap-x-10">
                {Links.map((link) => (
                    <div key={link.href}>
                        {
                        link.children 
                        ? <NavDropdown parentLink={link} />
                        : <Link href={link.href}>{link.title}</Link>
                        }
                    </div>
                ))}

                <ThemeSwitcher />
                <Suspense fallback={<div>Loading...</div>}>
                    <AuthButton />
                </Suspense>
            </div>
        </nav>
    )
}