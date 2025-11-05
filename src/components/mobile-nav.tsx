"use client"

import * as React from "react"
import Link, { type LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-foreground/70">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader className="text-left">
            <SheetTitle>
              <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
                <Icons.logo className="mr-2 h-6 w-6" />
                <span className="font-bold">{siteConfig.name}</span>
              </Link>
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-4 mt-8">
            {siteConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-foreground/80",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
                onClick={() => setOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
