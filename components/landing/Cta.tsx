'use client'

import Link from "next/link";
import { ArrowRight, Palette, Sparkles, Bookmark, History } from "lucide-react";
import { useEffect, useState } from "react";

export default function CTA() {

    const colors = ["#5578C9", "#96B4EB", "#F6E06E", "#D789B9", "#B35D91"];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % colors.length)
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="w-full flex flex-row items-center justify-center gap-3 p-3 my-6">
                
            <div className="relative max-w-[1080px] w-full flex flex-col items-center justify-between">

                <div className="sm:absolute hidden -bottom-8 -left-8 -z-10 h-24 w-24 rounded-full bg-[#96B4EB]/30 blur-2xl" />
                <div className="sm:absolute hidden -right-8 -top-8 -z-10 h-24 w-24 rounded-full bg-[#D789B9]/30 blur-2xl" />

                <div className="sm:absolute hidden pointer-events-none left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#96B4EB]/10 blur-3xl" />

                <div className="w-full relative">
                    
                    <div className="relative overflow-hidden rounded-lg border border-foreground/20 bg-card py-12 px-6 text-center shadow-sm bg-[var(--card)]">

                    <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-[#96B4EB]/20 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-[#D789B9]/20 blur-3xl" />

                        <div className="relative">

                            <h2 className="mt-3 lg:text-5xl text-4xl font-bold tracking-tight text-foreground hovered cursor-pointer">
                                Ready to create something
                                <span className="block rainbow-text">
                                    colorful?
                                </span>
                            </h2>

                            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-foreground/60 sm:text-lg">
                                Explore powerful color tools, create beautiful palettes, and turn your ideas into colors you can use anywhere.
                            </p>

                            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <Link href="/signup" className="fadeIn flex items-center gap-2 text-white px-4 py-2 rounded-full cursor-pointer 
                                    transition duration-300 ease" style={{ backgroundColor: colors[index] }}>
                                    <span className={`font-sans font-semibold text-sm`} >
                                        Get Started
                                    </span>
                                    <ArrowRight size={16} className="" />
                                </Link>
                            </div>
                            
                        </div>
                    </div>

                </div>

            </div>

        </section>
    );
}