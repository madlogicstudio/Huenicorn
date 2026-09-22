'use client'

import Image from "next/image"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { BsGithub } from "react-icons/bs"
import { ArrowRight, Menu } from "lucide-react"
import Link from "next/link"

function Header() {

    return (
        <section className="w-full flex flex-row items-center justify-center gap-3 p-3 border-b border-[var(--border)] bg-background sticky top-0 z-1">
            
            <div className="max-w-[1080px] flex flex-row lg:items-end items-center justify-between w-full">
                <div className="flex flex-row lg:items-end items-center gap-3">   
                    <Image src="/Icon.png" height={36} width={36} alt="Huenicorn-icon" className="cursor-pointer fadeIn" />
                    <span className="font-mono font-semibold lg:text-xl text-lg cursor-pointer text-foreground/80 hovered fadeIn">Huenicorn</span>
                </div>

                <div className="lg:flex hidden flex-row items-end gap-6">
                    <Link href="/features" className="font-mono font-semibold text-sm cursor-pointer text-foreground/80 header-hovered fadeIn">
                        Features
                    </Link>
                    <Link href="/tools" className="font-mono font-semibold text-sm cursor-pointer text-foreground/80 header-hovered fadeIn">
                        Tools
                    </Link>
                    <Link href="/about" className="font-mono font-semibold text-sm cursor-pointer text-foreground/80 header-hovered fadeIn">
                        About
                    </Link>
                    <Link href="/docs" className="font-mono font-semibold text-sm cursor-pointer text-foreground/80 header-hovered fadeIn">
                        Docs
                    </Link>
                </div>
                
                <div className="lg:flex hidden flex-row items-center gap-4">

                    <BsGithub size={22} className="text-foreground/80 hovered cursor-pointer fadeIn" />

                    <ThemeToggle />

                    <Link href="/signup" className="fadeIn flex items-center gap-2 text-foreground/80 button-hovered border border-foreground/20 px-3 py-2 rounded-full cursor-pointer
                        hover:text-[#5578C9] hover:border-transparent">
                        <span className="font-sans font-semibold text-xs ">
                            Get Started
                        </span>
                        <ArrowRight size={16} className="" />
                    </Link>
                    
                </div>     

                <div className="lg:hidden flex flex-row items-center fadeIn">
                    <Menu size={22} className="text-foreground" />
                </div> 

            </div>
             

        </section>
    )

}

export default Header