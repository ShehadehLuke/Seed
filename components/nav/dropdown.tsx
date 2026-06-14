"use client"
import { useState } from 'react'
import { LinkInterface } from "@/components/nav/navbar"
import Link from "next/link"

interface NavDropdownProps {
    parentLink: LinkInterface | null,
    className?: string,
}
export default function NavDropdown(props: NavDropdownProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    return (
        <div className="p-0 w-fit relative" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
            <Link href={props.parentLink?.href ?? ""}>{props.parentLink?.title ?? ""}</Link>
            <div className={`bg-green-700/30 px-2 py-4 absolute top-6 right-6 rounded-md ${isDropdownOpen ? "" : "hidden"}`}>
            {props.parentLink?.children?.map((childLink) => (
                <div key={childLink.href}>
                    {childLink.children
                    ? (<NavDropdown parentLink={childLink}/>)
                    : (<Link href={childLink.href}>{childLink.title}</Link>)}
                </div>
            ))}
            </div>
        </div>
    )
}