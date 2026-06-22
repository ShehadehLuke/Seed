import Link from "next/link"
import NavDropdown from "./dropdown"
import MobileNavMenu from "./mobile-nav-menu"
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
        <nav className="sticky top-0 z-50 border-b-2 border-border bg-card/80 backdrop-blur">
            <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 md:py-4">
                <Link href="/" className="text-base font-semibold md:text-lg">
                    Seed
                </Link>

                <div className="hidden items-center gap-x-6 md:flex lg:gap-x-10">
                    {Links.map((link) => (
                        <div key={link.href || link.title}>
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
                    <ThemeSwitcher />
                </div>

                <div className="flex items-center gap-2 md:hidden">
                    <ThemeSwitcher />
                        <Suspense fallback={null}>
                            <AuthButton />
                        </Suspense>
                    <MobileNavMenu links={Links} />
                </div>
            </div>
        </nav>
    )
}
