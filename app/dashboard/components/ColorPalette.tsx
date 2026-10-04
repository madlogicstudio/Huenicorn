'use client'

import { useState, useEffect } from "react"
import { Check, CopyIcon } from "lucide-react";
import { RotateCcw, LockIcon, SquareArrowOutUpRight, InfoIcon } from "lucide-react";
import InfoCard from "./InfoCard";
import { WanderingEyes } from "@/components/ui/WanderingEyes";

export const ColorPalette = () => {

    const [spin, setSpin] = useState(false);
    const [refresh, setRefresh] = useState(0);
    // colors[0] // Primary
    // colors[1] // Secondary
    // colors[2] // Accent
    // colors[3] // Muted
    // colors[4] // Foreground
    // colors[5] // Background
    const [colors, setColors] = useState<number[][]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    function isDark(rgb: number[]) {
        const [r, g, b] = rgb;

        const luminance =
            (0.299 * r + 0.587 * g + 0.114 * b) / 255;

        return luminance < 0.45;
    }

    function darkenColor(rgb: number[], amount = 0.35) {
        return rgb.map((value) =>
            Math.max(0, Math.floor(value * (1 - amount)))
        );
    }

    useEffect(() => {
        async function fetchColors() {
            try {
                const res = await fetch("/api/palette");

                if (!res.ok) {
                    throw new Error(`Failed to fetch palette: ${res.status}`);
                }

                const data = await res.json();

                const newColors: number[][] = data.result.map(
                    (color: number[]) => [...color]
                );

                if (!isDark(newColors[0])) newColors[0] = darkenColor(newColors[0]);
                if (!isDark(newColors[4])) newColors[4] = darkenColor(newColors[4]);

                const lightColor = [
                    Math.floor(Math.random() * 16) + 240,
                    Math.floor(Math.random() * 16) + 240,
                    Math.floor(Math.random() * 16) + 240,
                ];

                newColors.push(lightColor);

                setColors(newColors);
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

    const [showTutorial, setShowTutorial] = useState("");
    const [palettePrompt ,setPalettePrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const loadingText = [
        "Finding the right colors...",
        "Mixing your palette...",
        "Adding the final touches...",
    ];

    const [loadingIndex, setLoadingIndex] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [paletteDescription, setPaletteDescription] = useState("");

    useEffect(() => {
        if (!loading) {
            setLoadingIndex(0);
            return;
        }

        const interval = setInterval(() => {
            setLoadingIndex((prev) => {
            if (prev >= loadingText.length - 1) {
                return 0;
            }

            return prev + 1;
            });
        }, 1500);

        return () => clearInterval(interval);
    }, [loading]);

    function hexToRgb(hex: string): number[] {
        const cleanHex = hex.replace("#", "");

        return [
            parseInt(cleanHex.slice(0, 2), 16),
            parseInt(cleanHex.slice(2, 4), 16),
            parseInt(cleanHex.slice(4, 6), 16),
        ];
    }

    const generateAiPalette = async () => {
        if (!palettePrompt.trim()) return;

        setLoading(true);
        setErrorMessage("");

        try {
            const res = await fetch("/api/ai-palette", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: palettePrompt,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                if (res.status === 503) {
                        throw new Error(
                        "AI palette generation is temporarily unavailable. Please try again in a moment."
                    );      
                }

                throw new Error(
                    data.error || "Failed to generate palette."
                );
            }

            const rgbColors = data.palette.map(hexToRgb);

            setColors(rgbColors);
            setPaletteDescription(data.description);

        } catch (error) {
            console.error("AI palette generation error:", error);

            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-sans flex flex-col bg-[var(--card)] lg:p-6 p-3 rounded-lg gap-6 lg:my-6">

            <div className="relative flex flex-row items-start justify-between my-3">
                <span className="text-foreground text-3xl">
                    Color Palette Generator
                </span>
                <div className="ml-auto flex flex-row items-end gap-3">
                    <div title="How to use">
                        <InfoIcon size={24} className="text-foreground/60 cursor-pointer hover:text-[var(--secondary)] 
                            transition duration-300 ease" 
                            onMouseEnter={() => setShowTutorial("palette-generator")} onMouseLeave={() => setShowTutorial("")}/>
                    </div>
                    {showTutorial === "palette-generator" && (
                        <InfoCard
                            content={
                                <>
                                    <span className="group text-sm">
                                        1.{" "}
                                        <span className="font-semibold">
                                            Generate a Palette
                                        </span>{" "}
                                        -{" "}
                                        <span className="ml-2">
                                            Click the Generate button to create a new color
                                            palette.
                                        </span>
                                    </span>

                                    <span className="group text-sm">
                                        2.{" "}
                                        <span className="font-semibold">
                                            Explore the Colors
                                        </span>{" "}
                                        -{" "}
                                        <span className="ml-2">
                                            Browse the generated colors and see how they work
                                            together as a palette.
                                        </span>
                                    </span>

                                    <span className="group text-sm">
                                        3.{" "}
                                        <span className="font-semibold">
                                            Copy a Color
                                        </span>{" "}
                                        -{" "}
                                        <span className="ml-2">
                                            Click the copy button beside any HEX value to copy
                                            that color to your clipboard.
                                        </span>
                                    </span>

                                    <span className="group text-sm">
                                        4.{" "}
                                        <span className="font-semibold">
                                            Generate Again
                                        </span>{" "}
                                        -{" "}
                                        <span className="ml-2">
                                            Click Generate again whenever you want a completely
                                            new palette.
                                        </span>
                                    </span>

                                    <span className="group text-sm">
                                        5.{" "}
                                        <span className="font-semibold">
                                            Try AI Palette Generator
                                        </span>{" "}
                                        -{" "}
                                        <span className="ml-2">
                                            Describe the colors or mood you want and let AI
                                            create a custom palette for you.
                                        </span>
                                    </span>
                                </>
                            }
                        />
                    )}
                    <SquareArrowOutUpRight onClick={handleShare} className="text-[var(--primary)] hover:text-[var(--secondary)] size-6 cursor-pointer
                        transition duration-300 ease" />
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
                
                <div className={`w-full flex flex-row items-center justify-center flex-wrap pt-6 pb-3 sm:px-0 gap-2`}>

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

                <section className="w-full flex flex-col my-6">

                    <div className="w-full flex flex-col gap-3">
                        <div className="relative w-full flex flex-row justify-between">
                            <span className="text-foreground/80 text-xl">
                                AI Palette Generator
                            </span>
                            <InfoIcon size={24} className="text-foreground/60 cursor-pointer hover:text-[var(--secondary)] 
                                transition duration-300 ease" 
                                onMouseEnter={() => setShowTutorial("ai-palette-generator")} onMouseLeave={() => setShowTutorial("")}/>
                            {showTutorial === "ai-palette-generator" && 
                                <InfoCard content={
                                    <>
                                        <span className="group text-sm">
                                            1. <span className=" font-semibold">Choose a Color</span> -  
                                            <span className="ml-2">Click anywhere on the color picker to select the color you want.</span>
                                        </span>
                                        <span className="group text-sm">
                                            2. <span className=" font-semibold">Fine-Tune Your Color</span> -  
                                            <span className="ml-2">Drag around the color area and hue bar to find the perfect shade.</span>
                                        </span>
                                    </>
                                }
                            />}
                        </div>
                    </div>

                    <div className="w-full flex flex-row my-3">   
                        <input type="text" placeholder="Describe what color palette you wanted to create..." 
                            className="text-md text-foreground/80 p-3 outline-none border border-foreground/20 flex-1 bg-[var(--card)]"
                            value={palettePrompt}
                            onChange={(e) => setPalettePrompt(e.target.value)}/>
                        <button className="text-sm text-foreground/80 font-semibold px-4 py-2 bg-[var(--primary)] cursor-pointer"
                            onClick={generateAiPalette}
                            disabled={loading || !palettePrompt.trim()}
                        >Generate</button>
                    </div>

                    {loading && !errorMessage && 
                        <div className="h-auto w-full flex flex-col items-center justify-center object-contain">
                            <div className="relative h-[120px] w-[320px] flex items-center justify-center">
                                <WanderingEyes
                                    className="text-[var(--primary)]"
                                    eyeScale={0.8}
                                />
                            </div>

                            <span className="text-md text-foreground/80">
                                {loadingText[loadingIndex]}
                            </span>

                        </div>                
                    }

                    {errorMessage &&
                        <span className="mt-3 text-md text-foreground/80 text-center">
                            {errorMessage}
                        </span>
                    }

                    {paletteDescription && !loading && (
                        <div className="font-sans mt-6 w-full border border-foreground/10 bg-[var(--card)] p-5">
                            <h3 className="text-md font-semibold text-foreground">
                                About this palette
                            </h3>

                            <p className="mt-2 text-md leading-6 text-foreground/60">
                                {paletteDescription}
                            </p>
                        </div>
                    )}
                    
                </section>
                
                {/* Preview */}
                {colors.length === 6 && !loading && (
                    <section className="w-full flex flex-col my-6">
                        <div className="relative w-full flex flex-row justify-between">
                            <span className="text-foreground/80 text-xl">Palette Preview</span>
                            <InfoIcon size={24} className="text-foreground/60 cursor-pointer hover:text-[var(--secondary)] transition duration-300 ease" onMouseEnter={() => setShowTutorial("palette-preview")} onMouseLeave={() => setShowTutorial("")} />
                            {showTutorial === "palette-preview" && (
                                <InfoCard content={
                                    <>
                                        <span className="group text-sm">1. <span className="font-semibold">Choose a Color</span> - <span className="ml-2">Click anywhere on the color picker to select the color you want.</span></span>
                                        <span className="group text-sm">2. <span className="font-semibold">Fine-Tune Your Color</span> - <span className="ml-2">Drag around the color area and hue bar to find the perfect shade.</span></span>
                                    </>
                                } />
                            )}
                        </div>

                        <span className="text-foreground/80 text-md mt-2">See how your colors work together in a UI.</span>

                        <div className="w-full overflow-hidden rounded-lg border border-foreground/10 my-6" style={{ backgroundColor: rgbToHex(colors[5]) }}>
                            {/* Top Navigation */}
                            <div className="flex h-12 items-center justify-between px-4" style={{ backgroundColor: rgbToHex(colors[0]) }}>
                                <div className="h-2.5 w-20 rounded-full" style={{ backgroundColor: rgbToHex(colors[5]) }} />

                                <div className="hidden sm:flex items-center gap-2">
                                    <div className="h-2 w-10 rounded-full" style={{ backgroundColor: `${rgbToHex(colors[5])}90` }} />
                                    <div className="h-2 w-10 rounded-full" style={{ backgroundColor: `${rgbToHex(colors[5])}90` }} />
                                    <div className="h-2 w-10 rounded-full" style={{ backgroundColor: `${rgbToHex(colors[5])}90` }} />
                                </div>

                                <div className="flex sm:hidden gap-1.5">
                                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: rgbToHex(colors[5]) }} />
                                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: rgbToHex(colors[5]) }} />
                                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: rgbToHex(colors[5]) }} />
                                </div>
                            </div>

                            {/* Mobile Preview */}
                            <div className="flex sm:hidden flex-col gap-3 p-3">
                                <div className="flex items-center justify-between rounded-md p-3" style={{ backgroundColor: rgbToHex(colors[1]) }}>
                                    <div className="h-12 w-16 rounded-full" style={{ backgroundColor: rgbToHex(colors[5]) }} />
                                    <div className="flex gap-2">
                                        <div className="h-2 w-8 rounded-full" style={{ backgroundColor: `${rgbToHex(colors[5])}80` }} />
                                        <div className="h-2 w-8 rounded-full" style={{ backgroundColor: `${rgbToHex(colors[5])}80` }} />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <div className="h-3 w-40 rounded-full" style={{ backgroundColor: rgbToHex(colors[4]) }} />
                                    <div className="h-2 w-28 rounded-full" style={{ backgroundColor: `${rgbToHex(colors[4])}60` }} />
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <div className="h-24 rounded-md p-3" style={{ backgroundColor: rgbToHex(colors[2]) }}>
                                        <div className="h-2 w-10 rounded-full" style={{ backgroundColor: rgbToHex(colors[5]) }} />
                                    </div>

                                    <div className="h-24 rounded-md p-3" style={{ backgroundColor: rgbToHex(colors[2]) }}>
                                        <div className="h-2 w-10 rounded-full" style={{ backgroundColor: rgbToHex(colors[5]) }} />
                                    </div>
                                </div>

                                <div className="rounded-md p-3" style={{ backgroundColor: rgbToHex(colors[3]) }}>
                                    <div className="h-12 w-24 rounded-full" style={{ backgroundColor: rgbToHex(colors[4]) }} />

                                    <div className="mt-3 flex gap-2">
                                        <div className="h-7 w-20 rounded-md" style={{ backgroundColor: rgbToHex(colors[0]) }} />
                                        <div className="h-7 w-20 rounded-md" style={{ backgroundColor: rgbToHex(colors[1]) }} />
                                    </div>
                                </div>

                                <div className="h-18 w-full rounded-md" style={{ backgroundColor: rgbToHex(colors[2]) }} />
                            </div>

                            {/* Desktop Preview */}
                            <div className="hidden sm:grid grid-cols-[180px_1fr] gap-3 p-3">
                                <div className="rounded-md p-3" style={{ backgroundColor: rgbToHex(colors[1]) }}>
                                    <div className="mb-6 h-2.5 w-10 rounded-full" style={{ backgroundColor: rgbToHex(colors[5]) }} />
                                    <div className="mb-3 h-7 w-full rounded-md" style={{ backgroundColor: rgbToHex(colors[0]) }} />

                                    <div className="space-y-3">
                                        <div className="h-2 w-4/5 rounded-full" style={{ backgroundColor: `${rgbToHex(colors[5])}80` }} />
                                        <div className="h-2 w-3/5 rounded-full" style={{ backgroundColor: `${rgbToHex(colors[5])}80` }} />
                                        <div className="h-2 w-4/5 rounded-full" style={{ backgroundColor: `${rgbToHex(colors[5])}80` }} />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <div>
                                        <div className="h-3 w-60 rounded-full" style={{ backgroundColor: rgbToHex(colors[4]) }} />
                                        <div className="mt-2 h-2 w-32 rounded-full" style={{ backgroundColor: `${rgbToHex(colors[4])}50` }} />
                                    </div>

                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="h-24 rounded-md p-3" style={{ backgroundColor: rgbToHex(colors[2]) }}>
                                            <div className="h-2 w-10 rounded-full" style={{ backgroundColor: rgbToHex(colors[5]) }} />
                                        </div>

                                        <div className="h-24 rounded-md p-3" style={{ backgroundColor: rgbToHex(colors[3]) }}>
                                            <div className="h-2 w-10 rounded-full" style={{ backgroundColor: rgbToHex(colors[4]) }} />
                                        </div>

                                        <div className="h-24 rounded-md p-3" style={{ backgroundColor: rgbToHex(colors[1]) }}>
                                            <div className="h-2 w-10 rounded-full" style={{ backgroundColor: rgbToHex(colors[5]) }} />
                                        </div>
                                    </div>

                                    <div className="rounded-md p-3" style={{ backgroundColor: rgbToHex(colors[3]) }}>
                                        <div className="h-2 w-28 rounded-full" style={{ backgroundColor: rgbToHex(colors[4]) }} />

                                        <div className="mt-3 flex gap-2">
                                            <div className="h-8 w-20 rounded-md" style={{ backgroundColor: rgbToHex(colors[0]) }} />
                                            <div className="h-8 w-20 rounded-md" style={{ backgroundColor: rgbToHex(colors[1]) }} />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-2">
                                            <div className="h-7 w-16 rounded-md" style={{ backgroundColor: rgbToHex(colors[0]) }} />
                                            <div className="h-7 w-16 rounded-md" style={{ backgroundColor: rgbToHex(colors[2]) }} />
                                        </div>

                                        <div className="h-8 w-8 rounded-full" style={{ backgroundColor: rgbToHex(colors[2]) }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

            </div>
        </div>
    )
}
