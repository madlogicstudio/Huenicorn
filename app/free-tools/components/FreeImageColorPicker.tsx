"use client";

import { useRef, useState } from "react";
import { SquareArrowOutUpRight, Check, CopyIcon, LockIcon } from "lucide-react"
import Link from "next/link";

export default function FreeImageColorPicker() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const [color, setColor] = useState("#000000");

    const handleImageUpload = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        const image = new Image();

        image.onload = () => {
            imageRef.current = image;

            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            canvas.width = image.width;
            canvas.height = image.height;

            ctx.drawImage(image, 0, 0);
        };

        image.src = URL.createObjectURL(file);
    };

    const handleMouseClick = ( event: React.MouseEvent<HTMLCanvasElement> ) => {
        const canvas = canvasRef.current;

        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const x = Math.floor((event.clientX - rect.left) * scaleX);
        const y = Math.floor((event.clientY - rect.top) * scaleY);

        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        const pixel = ctx.getImageData(x, y, 1, 1).data;

        const [r, g, b] = pixel;

        const hex =
        "#" +
        [r, g, b]
            .map((value) => value.toString(16).padStart(2, "0"))
            .join("");

        setColor(hex.toUpperCase());
    };

    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

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
        <div className="font-sans w-full flex flex-col items-start justify-start cursor-pointer lg:p-6 p-3 gap-3 bg-[var(--card)] rounded-lg">

            <div className="w-full flex flex-row items-start justify-between">
                <span className="text-foreground font-bold text-3xl">
                    Image Color Picker
                </span>
                <SquareArrowOutUpRight onClick={handleShare} className="text-[var(--primary)] hover:text-[var(--secondary)] size-6 cursor-pointer" />
            </div>

            <div className="flex-1 h-full flex flex-col items-start justify-start gap-3 mt-3">
                <span className="text-xl rainbow-text font-semibold">
                    How to Use Image Color Picker
                </span>
                <div className="flex flex-col gap-3 text-foreground/80">
                    <span className="group text-md">
                        1. <span className="text-foreground font-semibold">Upload an Image</span> -  
                        <span className="ml-2">Click the choose image button to choose an image from your device.</span>
                    </span>
                    <span className="group text-md">
                        2. <span className="text-foreground font-semibold">Pick a Color</span> -  
                        <span className="ml-2">Click anywhere on the image to select a color.</span>
                    </span>
                    <span className="group text-md">
                        3. <span className="text-foreground font-semibold">View Color Values</span> -  
                        <span className="ml-2">Check the selected color’s HEX and RGB values.</span >
                    </span>
                    <span className="group text-md">
                        4. <span className="text-foreground font-semibold">Copy the Color</span> -  
                        <span className="ml-2">Click the copy button to save the color code.</span>
                    </span>
                    <span className="group text-md">
                        5. <span className="text-foreground font-semibold">Explore More Colors</span> -  
                        <span className="ml-2">Click different areas of the image to find other colors.</span>
                    </span>
                </div>
            </div>
            

            <div className="w-full flex flex-col lg:items-start items-center mt-6">
                <div className="flex flex-row items-center my-6 cursor-pointer border border-foreground/20 px-6 py-2 rounded-full">
                    <label htmlFor="image-upload" className="text-sm cursor-pointer">
                        Choose Image
                    </label>
                    <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden"/>
                </div>

                <span className="font-sans text-md text-center mb-6 text-foreground/80">Click Choose Image and select an image from your device.</span>

                <canvas ref={canvasRef} onClick={handleMouseClick} className="w-full cursor-crosshair border border-foreground/20"/>

                <div className="flex items-center gap-4 py-6">
                    <div className="h-12 w-12 border border-foreground/20" style={{ backgroundColor: color }}/>

                    <div className="flex flex-col gap-1">
                        <p className="text-sm text-gray-500">
                            Selected color
                        </p>

                        <div className="flex flex-row items-center gap-3">
                            <p className="font-mono text-sm">
                                {color}
                            </p>
                            <button title="Copy" className="cursor-pointer" onClick={() => copyToClipboard(color.toUpperCase(), 0)}>
                                {copiedIndex === 0 ? (
                                    <Check className="text-green-500 size-4" />
                                    ) : (
                                    <CopyIcon className="size-4" />
                                )}
                            </button>
                        </div>

                    </div>
                </div>

            </div>

            <div className="relative max-h-[360px] w-full border border-foreground/20 rounded-lg p-6 overflow-hidden">

                <div className="blur-[2px] opacity-70">

                    <div className="grid grid-cols-2 lg:grid-rows-1 gap-6">

                        <div className="h-[280px] bg-gradient-to-br from-[#96B4EB] via-[#D789B9] to-[#F6E06E] relative overflow-hidden">

                            <div className="absolute w-32 h-32 rounded-full bg-[#B8D8F5] top-8 left-8" />

                            <div className="absolute w-40 h-40 rounded-full bg-[#F6E06E] bottom-[-30px] right-8" />

                            <div className="absolute w-24 h-24 bg-[#33446E] rotate-12 top-20 right-20" />

                            <div className="absolute top-[45%] left-[45%]">

                                <div className="w-12 h-12 border-2 border-white rounded-full shadow-lg" />

                                <div className="absolute left-14 top-0 bg-white px-2 py-1 text-xs whitespace-nowrap shadow">
                                    #D789B9
                                </div>

                            </div>
                        </div>

                        <div className="border border-gray-300 p-5">

                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">
                                Extracted Color Palette
                                </span>

                                <span className="text-xs opacity-60">
                                5 colors
                                </span>
                            </div>

                            <div className="grid grid-cols-5 gap-2 mt-4">

                                <div className="h-20 bg-[#96B4EB]" />
                                <div className="h-20 bg-[#B8D8F5]" />
                                <div className="h-20 bg-[#F6E06E]" />
                                <div className="h-20 bg-[#D789B9]" />
                                <div className="h-20 bg-[#33446E]" />

                            </div>

                        </div>

                        <div className="border border-gray-300 p-5">

                            <span className="text-sm font-medium">
                                Selected Color
                            </span>

                            <div className="flex items-center gap-4 mt-4">

                            <div className="w-16 h-16 bg-[#D789B9]" />

                                <div>
                                    <div className="text-sm font-medium">
                                        #D789B9
                                    </div>

                                    <div className="text-xs opacity-70 mt-1">
                                        RGB 215, 137, 185
                                    </div>

                                    <div className="text-xs opacity-70 mt-1">
                                        HSL 322°, 47%, 69%
                                    </div>
                                </div>

                            </div>

                            <button type="button" className="mt-5 px-4 py-2 text-sm border border-gray-300">
                                Copy HEX
                            </button>

                        </div>

                        <div className="border border-gray-300 p-5">

                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">
                                    Build Your Palette
                                </span>

                                <span className="text-xs opacity-60">
                                    4 / 6
                                </span>
                            </div>

                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-4">

                                <div className="h-16 bg-[#96B4EB]" />
                                <div className="h-16 bg-[#F6E06E]" />
                                <div className="h-16 bg-[#D789B9]" />
                                <div className="h-16 bg-[#33446E]" />

                                <div className="h-16 border border-dashed border-gray-400 flex items-center justify-center text-lg">
                                    +
                                </div>

                                <div className="h-16 border border-dashed border-gray-400 flex items-center justify-center text-lg">
                                    +
                                </div>

                            </div>

                        </div>

                    </div>
                </div>

                <div className="absolute font-sans inset-0 flex flex-col items-center justify-center bg-white/60 dark:bg-black/50 backdrop-blur-[3px]">
                    <LockIcon className="size-12 text-foreground/80 lg:mb-6 mb-3" />

                    <h3 className="text-lg font-semibold text-foreground/80 text-center">
                        Unlock More Image Color Picker Features
                    </h3>
                    <p className="text-md opacity-70 text-center text-foreground/80 max-w-xs mt-2">
                        Pick colors with precision, extract palettes from images, and build your own palette with up to six colors.
                    </p>
                    <Link href="/login" type="button" className="mt-4 px-6 py-2 text-sm text-[#171717]/80 bg-[color:var(--primary)] rounded-full cursor-pointer">
                        Log in to use this feature
                    </Link>
                </div>

            </div>

        </div>
    );
}