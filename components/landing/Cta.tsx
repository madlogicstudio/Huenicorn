'use client'

import Link from "next/link";
import { ArrowRight, Palette, Sparkles, Bookmark, History } from "lucide-react";

export default function CTA() {

    return (
        <section className="w-full flex flex-row items-center justify-center gap-3 p-3 my-6">
                
            <div className="max-w-[1080px] w-full flex flex-col items-center justify-between">

                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#96B4EB]/10 blur-3xl" />
                
                <div className="w-full relative">
                    
                    <div className="relative overflow-hidden rounded-lg border border-foreground/20 bg-card py-12 px-6 text-center shadow-sm bg-[var(--primary)]">

                    <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-[#96B4EB]/20 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-[#D789B9]/20 blur-3xl" />

                        <div className="relative">

                            <h2 className="mt-3 lg:text-5xl text-4xl font-bold tracking-tight text-foreground hovered cursor-pointer">
                                Ready to create something
                                <span className="block bg-gradient-to-r from-[#96B4EB] via-[#F6E06E] to-[#D789B9] bg-clip-text text-transparent">
                                    colorful?
                                </span>
                            </h2>

                            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-foreground/60 sm:text-lg">
                                Explore powerful color tools, create beautiful palettes, and turn your ideas into colors you can use anywhere.
                            </p>

                            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <div className="fadeIn flex items-center gap-2 text-[#171717]/80 px-4 py-2 rounded-full cursor-pointer bg-[var(--secondary)]
                                    hover:bg-[var(--accent)] transition duration-300 ease">
                                    <span className="font-sans font-semibold text-sm">
                                        Get Started
                                    </span>
                                    <ArrowRight size={16} className="" />
                                </div>
                            </div>
                            
                        </div>
                    </div>

                </div>

            </div>

        </section>
    );
}