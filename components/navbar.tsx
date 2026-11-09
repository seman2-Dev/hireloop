"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MenuIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const NAV_LINKS = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

const signInClasses =
  "h-[58px] rounded-[12px] bg-transparent px-6 text-[18px] font-semibold leading-[26px] text-[#5c53fe] shadow-[0_3px_10px_0_rgba(255,255,255,0.2)] [font-family:var(--font-manrope)] hover:bg-transparent hover:opacity-80"

const getStartedClasses =
  "h-[52px] rounded-[12px] border-[#090a15]/10 bg-[#5c53fe] px-6 text-[18px] font-medium leading-[26px] text-white shadow-[0_3px_10px_0_rgba(255,255,255,0.2)] [font-family:var(--font-instrument)] hover:bg-[#5c53fe]/90"

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="px-[60px] pt-6 max-lg:px-4">
      <nav className="mx-auto flex h-[74px] w-full max-w-[1320px] items-center justify-between rounded-[16px] bg-[#222222] pl-6 max-lg:pr-3 lg:pr-0">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/hireloop-logo.png"
            alt="HireLoop"
            width={795}
            height={224}
            className="h-11 w-[154px]"
            priority
          />
        </Link>

        {/* Desktop — exact Figma spec */}
        <div className="h-full items-center pl-8 pr-2 lg:flex max-lg:hidden">
          <div className="flex h-[58px] items-center gap-6">
            <div className="flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-base leading-[29px] text-white transition-colors hover:text-white/70"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="h-6 w-px bg-[#a8a8a8]/40" />

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                nativeButton={false}
                render={<Link href="/sign-in" />}
                className={signInClasses}
              >
                Sign In
              </Button>
              <Button
                variant="default"
                nativeButton={false}
                render={<Link href="/sign-up" />}
                className={getStartedClasses}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile — drawer nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="size-10 text-white hover:bg-white/10 hover:text-white lg:hidden"
              />
            }
          >
            <MenuIcon className="size-6" />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent
            showCloseButton={false}
            className="w-[85%] max-w-xs gap-0 border-white/10 bg-[#222222] text-white"
          >
            <SheetHeader className="flex-row items-center justify-between border-b border-white/10">
              <SheetTitle className="sr-only">HireLoop menu</SheetTitle>
              <Image
                src="/images/hireloop-logo.png"
                alt="HireLoop"
                width={795}
                height={224}
                className="h-8 w-auto"
              />
              <SheetClose
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10 hover:text-white"
                  />
                }
              >
                <XIcon className="size-5" />
                <span className="sr-only">Close</span>
              </SheetClose>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4 pt-4 pb-6">
              {NAV_LINKS.map((link) => (
                <SheetClose
                  key={link.label}
                  render={
                    <Link
                      href={link.href}
                      className="rounded-[8px] px-2 py-3 text-base leading-[29px] text-white transition-colors hover:bg-white/5"
                    />
                  }
                >
                  {link.label}
                </SheetClose>
              ))}
              <div className="my-3 h-px w-full bg-[#a8a8a8]/40" />
              <SheetClose
                render={<Link href="/sign-in" />}
                className="flex h-[52px] items-center justify-center rounded-[12px] text-[18px] font-semibold leading-[26px] text-[#5c53fe] [font-family:var(--font-manrope)] transition-opacity hover:opacity-80"
              >
                Sign In
              </SheetClose>
              <SheetClose
                render={<Link href="/sign-up" />}
                className="mt-2 flex h-[52px] items-center justify-center rounded-[12px] bg-[#5c53fe] text-[18px] font-medium leading-[26px] text-white [font-family:var(--font-instrument)] transition-opacity hover:opacity-90"
              >
                Get Started
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  )
}

export { Navbar }
