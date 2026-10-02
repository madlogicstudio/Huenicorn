'use client'

import { ArrowRight } from "lucide-react"

type SideNavProps = {
    setIsActive: React.Dispatch<React.SetStateAction<string>>;
    isActive: string;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileSideNav({isActive, setIsActive, isOpen, setIsOpen}: SideNavProps) {
    return (
        <div className={`h-auto w-full px-2 my-3 sm:hidden flex flex-col gap-2 bg-background border-b border-foreground/20 text-md shadow-xl pb-6
            absolute top-12 left-0 transition-transform duration-300
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
            `}>

            <span className="w-full text-foreground/80 text-lg font-semibold">Getting Started</span>

            <div className={`${isActive === "Overview" ? "bg-[var(--primary)]/30" : ""}
                w-full px-3 py-2 cursor-pointer`}
                onClick={() => {
                    setIsActive("Overview");
                    setIsOpen(false);
                }}>
                <span className="w-full text-foreground/80 ">Overview</span>
            </div>
            <div className={`${isActive === "What is huenicorn" ? "bg-[var(--primary)]/30" : ""}
                w-full px-3 py-2 cursor-pointer`}
                onClick={() => setIsActive("What is huenicorn")}>
                <span className="w-full text-foreground/80 ">What is Huenicorn?</span>
            </div>          
            <div className={`${isActive === "Who is it for" ? "bg-[var(--primary)]/30" : ""}
                w-full px-3 py-2 cursor-pointer`}
                onClick={() => setIsActive("Who is it for")}>
                <span className="w-full text-foreground/80 ">Who is it for?</span>
            </div>
            <div className={`${isActive === "Free tools" ? "bg-[var(--primary)]/30" : ""}
                w-full px-3 py-2 cursor-pointer`}
                onClick={() => setIsActive("Free tools")}>
                <span className="w-full text-foreground/80 ">Free tools</span>
            </div>
            <div className={`${isActive === "Creating an account" ? "bg-[var(--primary)]/30" : ""}
                w-full px-3 py-2 cursor-pointer`}
                onClick={() => setIsActive("Creating an account")}>
                <span className="w-full text-foreground/80 ">Creating an account</span>
            </div>
            <div className={`${isActive === "Navigating the dashboard" ? "bg-[var(--primary)]/30" : ""}
                w-full px-3 py-2 cursor-pointer`}
                onClick={() => setIsActive("Navigating the dashboard")}>
                <span className="w-full text-foreground/80 ">Navigating the dashboard</span>
            </div>

            <span className="w-full text-foreground/80 text-lg font-semibold mt-3">Color Tools</span>

            <div className={`${isActive === "Color picker" ? "bg-[var(--primary)]/30" : ""}
                w-full px-3 py-2 cursor-pointer`}
                onClick={() => setIsActive("Color picker")}>
                <span className="w-full text-foreground/80 ">Color picker</span>
            </div>
            
            <div className={`${isActive === "Color palette generator" ? "bg-[var(--primary)]/30" : ""}
                w-full px-3 py-2 cursor-pointer`}
                onClick={() => setIsActive("Color palette generator")}>
                <span className="w-full text-foreground/80 ">Color palette generator</span>
            </div>

            <div className={`${isActive === "Image color picker" ? "bg-[var(--primary)]/30" : ""}
                w-full px-3 py-2 cursor-pointer`}
                onClick={() => setIsActive("Image color picker")}>
                <span className="w-full text-foreground/80 ">Image color picker</span>
            </div>

            <div className={`${isActive === "Rgb to hex" ? "bg-[var(--primary)]/30" : ""}
                w-full px-3 py-2 cursor-pointer`}
                onClick={() => setIsActive("Rgb to hex")}>
                <div className="flex flex-row items-center gap-3">
                    <span className="text-foreground/80 ">RGB</span>
                    <ArrowRight size={12} />
                    <span className="text-foreground/80 ">HEX</span>
                </div>
            </div>

            <div className={`${isActive === "Hex to hsl" ? "bg-[var(--primary)]/30" : ""}
                w-full px-3 py-2 cursor-pointer`}
                onClick={() => setIsActive("Hex to hsl")}>
                <div className="flex flex-row items-center gap-3">
                    <span className="text-foreground/80 ">HEX</span>
                    <ArrowRight size={12} />
                    <span className="text-foreground/80 ">HSL</span>
                </div>
            </div>

            <div className={`${isActive === "CSS color converter" ? "bg-[var(--primary)]/30" : ""}
                w-full px-3 py-2 cursor-pointer`}
                onClick={() => setIsActive("CSS color converter")}>
                <span className="w-full text-foreground/80 ">CSS color converter</span>
            </div>

            <div className={`${isActive === "Shades & tints" ? "bg-[var(--primary)]/30" : ""}
                w-full px-3 py-2 cursor-pointer`}
                onClick={() => setIsActive("Shades & tints")}>
                <span className="w-full text-foreground/80 ">Shades & tints</span>
            </div>

            <div className={`${isActive === "Gradient generator" ? "bg-[var(--primary)]/30" : ""}
                w-full px-3 py-2 cursor-pointer`}
                onClick={() => setIsActive("Gradient generator")}>
                <span className="w-full text-foreground/80 ">Gradient generator</span>
            </div>

            <div className={`${isActive === "Random color" ? "bg-[var(--primary)]/30" : ""}
                w-full px-3 py-2 cursor-pointer`}
                onClick={() => setIsActive("Random color")}>
                <span className="w-full text-foreground/80 ">Random color</span>
            </div>

            <div className={`${isActive === "Image palette extractor" ? "bg-[var(--primary)]/30" : ""}
                w-full px-3 py-2 cursor-pointer`}
                onClick={() => setIsActive("Image palette extractor")}>
                <span className="w-full text-foreground/80 ">Image palette extractor</span>
            </div>

            <div className={`${isActive === "Contrast checker" ? "bg-[var(--primary)]/30" : ""}
                w-full px-3 py-2 cursor-pointer`}
                onClick={() => setIsActive("Contrast checker")}>
                <span className="w-full text-foreground/80 ">Contrast checker</span>
            </div>

            <div className={`${isActive === "Color blindness simulator" ? "bg-[var(--primary)]/30" : ""}
                w-full px-3 py-2 cursor-pointer`}
                onClick={() => setIsActive("Color blindness simulator")}>
                <span className="w-full text-foreground/80 ">Color blindness simulator</span>
            </div>

        </div>
    )   
}

export default MobileSideNav