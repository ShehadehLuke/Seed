"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { type LinkInterface } from "./navbar";

interface MobileNavMenuProps {
  links: LinkInterface[];
}

export default function MobileNavMenu({ links }: MobileNavMenuProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="rounded-md p-2 hover:bg-accent"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        onClick={() => setMobileOpen((open) => !open)}
      >
        {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {mobileOpen && (
        <div className="absolute left-0 right-0 top-full border-t border-border bg-card px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) =>
              link.children ? (
                <div key={link.title} className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-muted-foreground">
                    {link.title}
                  </span>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="pl-3 text-base"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.title}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.title}
                </Link>
              ),
            )}
          </div>
        </div>
      )}
    </>
  );
}
