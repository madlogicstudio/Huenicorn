'use client'

import { useState, Dispatch, SetStateAction } from "react";
import { Pipette, Palette, Image, ArrowRight, Repeat2, SwatchBook, Eclipse, Blend, Paintbrush, ImageDown  } from "lucide-react";
import type { ActiveTab } from "../page";

type SideNavProps = {
    activeTab: string;
    setActiveTab: Dispatch<SetStateAction<ActiveTab>>;
}

function SideNav({activeTab, setActiveTab}: SideNavProps) {

    return (
        <section className='min-h-full min-w-[260px] lg:flex hidden flex-col items-start justify-start p-3 border-r border-foreground/20'>

            <div className="font-sans w-full flex flex-col gap-2 py-3">
                <p className="uppercase text-xs font-semibold pb-2">Main Tools</p>
                <span className={`${activeTab === "color-picker" ? "bg-[var(--secondary)]/60 dark:bg-[var(--primary)]/80" : ""}
                    group flex items-center gap-2 px-3 py-2 rounded-md text-foreground/80 text-sm cursor-pointer`}
                    onClick={() =>setActiveTab("color-picker")}><Pipette size={18} />Color Picker</span>
                <span className={`${activeTab === "palette-generator" ? "bg-[var(--secondary)]/60 dark:bg-[var(--primary)]/80" : ""}
                    group flex items-center gap-2 px-3 py-2 rounded-md text-foreground/80 text-sm cursor-pointer`}
                    onClick={() => setActiveTab("palette-generator")}><Palette size={18} />Palette Generator</span>
                <span className={`${activeTab === "image-color-picker" ? "bg-[var(--secondary)]/60 dark:bg-[var(--primary)]/80" : ""}
                    group flex items-center gap-2 px-3 py-2 rounded-md text-foreground/80 text-sm cursor-pointer`}
                    onClick={() => setActiveTab("image-color-picker")}><Image size={18} />Image Color Picker</span>    
            </div>

            <div className="font-sans w-full flex flex-col gap-2 py-3">
                <p className="uppercase text-xs font-semibold pb-2">Convert</p>
                <span className={`${activeTab === "rgb-hex" ? "bg-[var(--secondary)]/60 dark:bg-[var(--primary)]/80" : ""}
                    group flex items-center gap-2 px-3 py-2 rounded-md text-foreground/80 text-sm cursor-pointer`}
                    onClick={() => setActiveTab("rgb-hex")}><Repeat2 size={18} />RGB <ArrowRight size={12} /> HEX</span>
                <span className={`${activeTab === "hex-hsl" ? "bg-[var(--secondary)]/60 dark:bg-[var(--primary)]/80" : ""}
                    group flex items-center gap-2 px-3 py-2 rounded-md text-foreground/80 text-sm cursor-pointer`}
                    onClick={() => setActiveTab("hex-hsl")}><Repeat2 size={18} />HEX <ArrowRight size={12} /> HSL</span>
                <span className={`${activeTab === "css-color-converter" ? "bg-[var(--secondary)]/60 dark:bg-[var(--primary)]/80" : ""}
                    group flex items-center gap-2 px-3 py-2 rounded-md text-foreground/80 text-sm cursor-pointer`}
                    onClick={() => setActiveTab("css-color-converter")}><SwatchBook size={18} />CSS Color Converter</span>    
            </div>

            <div className="font-sans w-full flex flex-col gap-2 py-3">
                <p className="uppercase text-xs font-semibold pb-2">Generate</p>
                <span className={`${activeTab === "shades-tints" ? "bg-[var(--secondary)]/60 dark:bg-[var(--primary)]/80" : ""}
                    group flex items-center gap-2 px-3 py-2 rounded-md text-foreground/80 text-sm cursor-pointer`}
                    onClick={() => setActiveTab("shades-tints")}><Eclipse size={18} />Shades & Tints</span>
                <span className={`${activeTab === "gradient-generator" ? "bg-[var(--secondary)]/60 dark:bg-[var(--primary)]/80" : ""}
                    group flex items-center gap-2 px-3 py-2 rounded-md text-foreground/80 text-sm cursor-pointer`}
                    onClick={() => setActiveTab("gradient-generator")}><Blend size={18} />Gradient Generator</span>
                <span className={`${activeTab === "random-color" ? "bg-[var(--secondary)]/60 dark:bg-[var(--primary)]/80" : ""}
                    group flex items-center gap-2 px-3 py-2 rounded-md text-foreground/80 text-sm cursor-pointer`}
                    onClick={() => setActiveTab("random-color")}><Paintbrush size={18} />Random Color</span>    
            </div>

            <div className="font-sans w-full flex flex-col gap-2 py-3">
                <p className="uppercase text-xs font-semibold pb-2">Extract</p>
                <span className={`${activeTab === "image-palette-extractor" ? "bg-[var(--secondary)]/60 dark:bg-[var(--primary)]/80" : ""}
                    group flex items-center gap-2 px-3 py-2 rounded-md text-foreground/80 text-sm cursor-pointer`}
                    onClick={() => setActiveTab("image-palette-extractor")}><ImageDown size={18} />Image Palette Extractor</span>   
            </div>

            <div className="font-sans w-full flex flex-col gap-2 py-3">
                <p className="uppercase text-xs font-semibold pb-2">Accessibility</p>
                <span className={`${activeTab === "contrast-checker" ? "bg-[var(--secondary)]/60 dark:bg-[var(--primary)]/80" : ""}
                    group flex items-center gap-2 px-3 py-2 rounded-md text-foreground/80 text-sm cursor-pointer`}
                    onClick={() => setActiveTab("contrast-checker")}><Eclipse size={18} />Contrast Checker</span>
                <span className={`${activeTab === "color-blindness-simulator" ? "bg-[var(--secondary)]/60 dark:bg-[var(--primary)]/80" : ""}
                    group flex items-center gap-2 px-3 py-2 rounded-md text-foreground/80 text-sm cursor-pointer`}
                    onClick={() => setActiveTab("color-blindness-simulator")}><Blend size={18} />Color Blindness Simulator</span>
            </div>

        </section>
    )
}

export default SideNav