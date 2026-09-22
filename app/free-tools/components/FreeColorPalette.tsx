'use client'

import { useState, useEffect } from "react"
import { Check, CopyIcon } from "lucide-react";
import { RotateCcw, LockIcon, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export const FreeColorPalette = () => {

    const [spin, setSpin] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [colors, setColors] = useState<number[][]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    useEffect(() => {
        async function fetchColors() {
            try {
                const res = await fetch("/api/palette");

                if (!res.ok) {
                    throw new Error(`Failed to fetch palette: ${res.status}`);
                }

                const data = await res.json();

                const newColor = [
                    Math.floor(Math.random() * 256),
                    Math.floor(Math.random() * 256),
                    Math.floor(Math.random() * 256),
                ];

                setColors([...data.result, newColor]);

            } catch (err) {
                console.error(err);
            } finally {
                setSpin(false);
            }
        }

        fetchColors();
    }, [refresh]);

    function rgbToHex(rgb: number[]) {
        return (
            "#" +
            rgb
            .map((value) => value.toString(16).padStart(2, "0"))
            .join("")
            .toUpperCase()
        );
    }

    async function copyToClipboard(text: string, index: number) {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedIndex(index);
            setTimeout(() => {
                setCopiedIndex(null);
            }, 1500);
        } catch (err) {
            console.error(err);
        }
    }

    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({
                title: "Huenicorn",
                text: "Check out Huenicorn!, a simple collection of free color tools for designers, developers, and anyone who loves working with colors.",
                url: window.location.href,
            });
        }
    };

    return (
        <div className="flex flex-col bg-[var(--card)] lg:p-6 p-3 rounded-lg gap-6">

            <div className="flex flex-row items-start justify-between">
                <span className="text-foreground font-bold text-3xl">
                    Color Palette Generator
                </span>
                <SquareArrowOutUpRight onClick={handleShare} className="text-[var(--primary)] hover:text-[var(--secondary)] size-6 cursor-pointer" />
            </div>

            <div className="flex-1 h-full flex flex-col items-start justify-start gap-3">
                <span className="text-xl rainbow-text font-semibold">
                    How to Use Color Palette Generator
                </span>
                <div className="flex flex-col gap-3 text-foreground/80">
                    <span className="group text-md">
                        1. <span className="text-foreground font-semibold">Generate a Palette</span> -  
                        <span className="ml-2">Click the Generate button to create a new palette containing five colors.</span>
                    </span>
                    <span className="group text-md">
                        2. <span className="text-foreground font-semibold">Explore the Colors</span> -  
                        <span className="ml-2">Review the generated color swatches and find colors that fit your design or project.</span>
                    </span>
                    <span className="group text-md">
                        3. <span className="text-foreground font-semibold">Check the HEX Code</span> -  
                        <span className="ml-2">Each color displays its HEX code underneath the swatch.</span >
                    </span>
                    <span className="group text-md">
                        4. <span className="text-foreground font-semibold">Copy a Color</span> -  
                        <span className="ml-2">Click the Copy icon beside any HEX code to instantly copy it to your clipboard.</span>
                    </span>
                    <span className="group text-md">
                        5. <span className="text-foreground font-semibold">Generate Again</span> -  
                        <span className="ml-2">Not quite what you need? Click Generate again to create a completely new palette.</span>
                    </span>
                </div>
            </div>

            <div className="w-full flex flex-col items-start justify-center pb-6">

                <div className="w-full flex flex-row items-start justify-between">
                    <span className="text-foreground/80 text-xl">Color Palette</span>
                    <div className="fadeIn flex items-center gap-2 button-hovered border border-foreground/20 px-4 py-2 rounded-full cursor-pointer
                        hover:border-transparent text-foreground/80 hover:text-[#5578C9]"
                        onClick={() => {
                            setSpin(true);
                            setRefresh((prev) => prev + 1);
                        }}>
                        <RotateCcw className={`size-3.5 ${spin ? "animate-spin" : ""}`} />
                        <span className="font-semibold text-sm">Generate</span>
                    </div>

                </div>
                
                <div className={`w-full flex flex-row items-center justify-between flex-wrap pt-6 pb-3 sm:px-0`}>

                    {colors.map((color, index) => (
                        <div key={index} className={`w-[164px] flex flex-col items-start justify-start object-contain sm:h-54 h-52`}>
                            <div className="w-full h-full cursor-pointer fadeIn"
                                style={{
                                    backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                                }}>
                            </div>
                            <div className="w-full flex flex-row items-center justify-between p-3 gap-3 flex-wrap">
                                <span className="text-sm">{rgbToHex(color)}</span>
                                <button title="Copy" className="cursor-pointer"
                                    onClick={() => copyToClipboard(rgbToHex(color), index)}>
                                    {copiedIndex === index ? (
                                        <Check className="text-green-500 size-4" />
                                    ) : (
                                        <CopyIcon className="size-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}

                </div>

                <div className="w-full py-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                        <div className="relative border border-foreground/20 p-6 min-h-[320px] rounded-lg overflow-hidden">
                            <div className="blur-[2px] opacity-70">
                                <span className="text-[color:var(--primary)] text-lg">
                                    AI Palette Generator
                                </span>

                                <p className="text-sm mt-2">
                                    Describe the palette you want and let AI create
                                    the perfect color combination for you.
                                </p>

                                <div className="mt-6 border border-gray-300 p-3 text-sm">
                                    Give me a blue pastel palette
                                </div>

                                <div className="flex gap-2 mt-4">
                                    <div className="h-16 flex-1 bg-[#DCEEFF]" />
                                    <div className="h-16 flex-1 bg-[#B8D8F5]" />
                                    <div className="h-16 flex-1 bg-[#91BFE8]" />
                                    <div className="h-16 flex-1 bg-[#669FD1]" />
                                    <div className="h-16 flex-1 bg-[#3E7FB8]" />
                                </div>

                                <button className="mt-5 px-5 py-2 bg-[color:var(--primary)] text-sm">
                                    Generate with AI
                                </button>
                            </div>

                            <div className="absolute font-sans inset-0 flex flex-col items-center justify-center bg-white/60 dark:bg-black/50 backdrop-blur-[3px]">
                                <LockIcon className="text-foreground/80 size-12 lg:mb-6 mb-3" />
                                <h3 className="text-lg font-semibold text-foreground/80">
                                    AI Palette Generator
                                </h3>
                                <p className="text-md text-foreground/80 opacity-70 text-center mt-2">
                                    Log in to generate palettes using AI prompts.
                                </p>
                                <Link href="/login" type="button" className="mt-4 px-6 py-2 text-sm text-[#171717]/80 bg-[color:var(--primary)] rounded-full cursor-pointer">
                                    Log in to use this feature
                                </Link>
                            </div>
                        </div>

                        <div className="relative border border-foreground/20 p-6 min-h-[320px] rounded-lg overflow-hidden">
                            <div className="blur-[2px] opacity-70">
                                <span className="text-[color:var(--primary)] text-lg">
                                    Palette Preview
                                </span>

                                <p className="text-sm mt-2">
                                    See how your palette looks across UI designs,
                                    themes, and artwork.
                                </p>

                                <div className="grid grid-cols-2 gap-3 mt-6">

                                <div className="h-32 bg-[#F5F7FA] border border-gray-200 p-3">
                                    <div className="w-16 h-3 bg-[#96B4EB]" />

                                    <div className="flex gap-2 mt-4">
                                        <div className="w-8 h-8 bg-[#B8D8F5]" />
                                        <div className="w-8 h-8 bg-[#F6E06E]" />
                                        <div className="w-8 h-8 bg-[#D789B9]" />
                                    </div>
                                </div>

                                <div className="h-32 bg-[#1A233A] p-3">
                                    <div className="w-16 h-3 bg-[#96B4EB]" />

                                    <div className="flex gap-2 mt-4">
                                        <div className="w-8 h-8 bg-[#245A8A]" />
                                        <div className="w-8 h-8 bg-[#F6E06E]" />
                                        <div className="w-8 h-8 bg-[#D789B9]" />
                                    </div>
                                </div>

                                <div className="h-24 bg-white border border-gray-200 p-3">
                                    <div className="w-20 h-7 bg-[#96B4EB]" />
                                    <div className="w-full h-5 bg-[#B8D8F5] mt-3" />
                                </div>

                                <div className="h-24 bg-[#96B4EB] relative overflow-hidden">
                                    <div className="absolute w-10 h-10 rounded-full bg-[#F6E06E] top-2 right-2" />
                                    <div className="absolute bottom-0 w-full h-10 bg-[#D789B9]" />
                                </div>

                                </div>
                            </div>
                            
                            <div className="absolute font-sans inset-0 flex flex-col items-center justify-center bg-white/60 dark:bg-black/50 backdrop-blur-[3px]">
                                <LockIcon className="size-12 text-foreground/80 lg:mb-6 mb-3" />

                                <h3 className="text-lg font-semibold text-foreground/80">
                                    Palette Preview
                                </h3>
                                <p className="text-md opacity-70 text-center text-foreground/80 max-w-xs mt-2">
                                    Log in to preview your palette on UI designs, themes, and artwork.
                                </p>
                                <Link href="/login" type="button" className="mt-4 px-6 py-2 text-sm text-[#171717]/80 bg-[color:var(--primary)] rounded-full cursor-pointer">
                                    Log in to use this feature
                                </Link>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}
