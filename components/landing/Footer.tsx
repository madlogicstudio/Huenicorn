'use client'

import Link from "next/link";
import Image from "next/image";
import { Palette, ArrowUpRight, Heart, ChevronUp } from "lucide-react";
import { BsGithub } from "react-icons/bs";
import { CgVercel } from "react-icons/cg";
import { SiVercel } from "react-icons/si";

export default function Footer() {
    const toolLinks = [
        { name: "Palette Generator", href: "/generator" },
        { name: "Image Color Picker", href: "/picker" },
        { name: "Color Converter", href: "/converter" },
        { name: "Contrast Checker", href: "/contrast" },
    ];

    const resourceLinks = [
        { name: "All Tools", href: "/tools" },
        { name: "My Workspace", href: "/workspace" },
        { name: "Color History", href: "/workspace/history" },
        { name: "Favorites", href: "/workspace/favorites" },
    ];

    const companyLinks = [
        { name: "Docs", href: "/docs" },
        { name: "About", href: "/about" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Contact", href: "/contact" },
        
    ];

    return (
        <footer className="font-sans w-full flex flex-col border-t border-foreground/20 bg-card items-center">

            <div className="mx-auto max-w-[1080px] w-full px-3 py-16">

                <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr]">
                
                    <div className="max-w-sm">
                        <div className="flex flex-row lg:items-end items-center gap-3">   
                            <Image src="/Icon.png" height={36} width={36} alt="Huenicorn-icon" className="cursor-pointer fadeIn" />
                            <span className="font-mono font-semibold text-xl cursor-pointer text-foreground/80 hovered fadeIn">Huenicorn</span>
                        </div>

                        <p className="font-sans mt-5 text-md leading-6 text-foreground/55">
                            A simple collection of free color tools for designers,
                            developers, and anyone who loves working with color.
                        </p>

                        <div className="mt-6 flex overflow-hidden">
                            {[
                                "#5578C9",
                                "#96B4EB",
                                "#F6E06E",
                                "#D789B9",
                                "#B35D91",
                            ].map((color) => (
                                <div key={color} className="h-3 lg:max-w-[60px] full flex-1" style={{ backgroundColor: color }} />
                            ))}
                        </div>
                        
                        <div className="mt-6 flex lg:flex-row lg:gap-6 flex-col items-start gap-3">

                            <Link href="https://github.com/madlogicstudio" target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-sm text-foreground/50 transition-colors hover:text-[var(--primary)]">
                                <BsGithub size={18} className="mr-2" />
                                GitHub
                                <ArrowUpRight size={16} />
                            </Link>

                            <Link href="https://github.com/madlogicstudio" target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-sm text-foreground/50 transition-colors hover:text-[var(--primary)]">
                                <SiVercel size={18} className="mr-2" />
                                Vercel
                                <ArrowUpRight size={16} />
                            </Link>

                        </div>
                        

                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-foreground">Tools</h3>

                        <ul className="mt-3 space-y-2">
                            {toolLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-foreground/50 transition-colors hover:text-[#5578C9]">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-foreground"> Workspace</h3>

                        <ul className="mt-3 space-y-2">
                            {resourceLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href}
                                        className="text-sm text-foreground/50 transition-colors hover:text-[#5578C9]">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-foreground"> Huenicorn</h3>

                        <ul className="mt-3 space-y-2">
                            {companyLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href}
                                        className="text-sm text-foreground/50 transition-colors hover:text-[#5578C9]">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

            </div>

            <div className="max-w-[1080px] w-full border-t border-foreground/20">
                <div className="mx-auto flex sm:flex-row flex-col gap-4 px-3 py-6 sm:items-center sm:justify-between">
                    
                    <div className="flex flex-col gap-3">
                        <p className="text-sm text-foreground/40">
                            © {new Date().getFullYear()} Huenicorn. All rights reserved.
                        </p>
                        <div className="flex items-center gap-1.5 text-sm text-foreground/40">
                            Made with
                            <Heart size={18} className="fill-[var(--accent)] text-[#D789B9]" />
                            by
                            <span className="font-medium text-foreground/60">madlogicstudio</span>
                        </div>
                        
                    </div>
                    
                    <div className="h-6 w-6 flex flex-col items-center justify-center bg-[var(--primary)] p-1 rounded-full cursor-pointer sm:text-white text-[#1A233A] hover:text-[var(--secondary)] transition fadeIn"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                        <ChevronUp className="h-6 w-6" />
                    </div>
                </div>
            </div>

        </footer>
    );
}