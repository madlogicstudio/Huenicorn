"use client";

import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import { CopyIcon, Check, LockIcon, PlusIcon, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export const FreeColorPicker = () => {
    const [color, setColor] = useState("#aabbcc");
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const swatches = [
        // Gray
        [
            "#FFFFFF",
            "#F5F5F5",
            "#EEEEEE",
            "#E0E0E0",
            "#BDBDBD",
            "#9E9E9E",
            "#757575",
            "#616161",
            "#424242",
            "#000000",
        ],

        // Red
        [
            "#FFEBEE",
            "#FFCDD2",
            "#EF9A9A",
            "#E57373",
            "#EF5350",
            "#F44336",
            "#E53935",
            "#D32F2F",
            "#C62828",
            "#B71C1C",
        ],

        // Pink
        [
            "#FCE4EC",
            "#F8BBD0",
            "#F48FB1",
            "#F06292",
            "#EC407A",
            "#E91E63",
            "#D81B60",
            "#C2185B",
            "#AD1457",
            "#880E4F",
        ],

        // Purple
        [
            "#F3E5F5",
            "#E1BEE7",
            "#CE93D8",
            "#BA68C8",
            "#AB47BC",
            "#9C27B0",
            "#8E24AA",
            "#7B1FA2",
            "#6A1B9A",
            "#4A148C",
        ],

        // Deep Purple
        [
            "#EDE7F6",
            "#D1C4E9",
            "#B39DDB",
            "#9575CD",
            "#7E57C2",
            "#673AB7",
            "#5E35B1",
            "#512DA8",
            "#4527A0",
            "#311B92",
        ],

        // Indigo
        [
            "#E8EAF6",
            "#C5CAE9",
            "#9FA8DA",
            "#7986CB",
            "#5C6BC0",
            "#3F51B5",
            "#3949AB",
            "#303F9F",
            "#283593",
            "#1A237E",
        ],

        // Blue
        [
            "#E3F2FD",
            "#BBDEFB",
            "#90CAF9",
            "#64B5F6",
            "#42A5F5",
            "#2196F3",
            "#1E88E5",
            "#1976D2",
            "#1565C0",
            "#0D47A1",
        ],

        // Light Blue
        [
            "#E1F5FE",
            "#B3E5FC",
            "#81D4FA",
            "#4FC3F7",
            "#29B6F6",
            "#03A9F4",
            "#039BE5",
            "#0288D1",
            "#0277BD",
            "#01579B",
        ],

        // Cyan
        [
            "#E0F7FA",
            "#B2EBF2",
            "#80DEEA",
            "#4DD0E1",
            "#26C6DA",
            "#00BCD4",
            "#00ACC1",
            "#0097A7",
            "#00838F",
            "#006064",
        ],

        // Teal
        [
            "#E0F2F1",
            "#B2DFDB",
            "#80CBC4",
            "#4DB6AC",
            "#26A69A",
            "#009688",
            "#00897B",
            "#00796B",
            "#00695C",
            "#004D40",
        ],

        // Green
        [
            "#E8F5E9",
            "#C8E6C9",
            "#A5D6A7",
            "#81C784",
            "#66BB6A",
            "#4CAF50",
            "#43A047",
            "#388E3C",
            "#2E7D32",
            "#1B5E20",
        ],

        // Light Green
        [
            "#F1F8E9",
            "#DCEDC8",
            "#C5E1A5",
            "#AED581",
            "#9CCC65",
            "#8BC34A",
            "#7CB342",
            "#689F38",
            "#558B2F",
            "#33691E",
        ],

        // Lime
        [
            "#F9FBE7",
            "#F0F4C3",
            "#E6EE9C",
            "#DCE775",
            "#D4E157",
            "#CDDC39",
            "#C0CA33",
            "#AFB42B",
            "#9E9D24",
            "#827717",
        ],

        // Yellow
        [
            "#FFFDE7",
            "#FFF9C4",
            "#FFF59D",
            "#FFF176",
            "#FFEE58",
            "#FFEB3B",
            "#FDD835",
            "#FBC02D",
            "#F9A825",
            "#F57F17",
        ],

        // Amber
        [
            "#FFF8E1",
            "#FFECB3",
            "#FFE082",
            "#FFD54F",
            "#FFCA28",
            "#FFC107",
            "#FFB300",
            "#FFA000",
            "#FF8F00",
            "#FF6F00",
        ],

        // Orange
        [
            "#FFF3E0",
            "#FFE0B2",
            "#FFCC80",
            "#FFB74D",
            "#FFA726",
            "#FF9800",
            "#FB8C00",
            "#F57C00",
            "#EF6C00",
            "#E65100",
        ],

        // Deep Orange
        [
            "#FBE9E7",
            "#FFCCBC",
            "#FFAB91",
            "#FF8A65",
            "#FF7043",
            "#FF5722",
            "#F4511E",
            "#E64A19",
            "#D84315",
            "#BF360C",
        ],

        // Brown
        [
            "#EFEBE9",
            "#D7CCC8",
            "#BCAAA4",
            "#A1887F",
            "#8D6E63",
            "#795548",
            "#6D4C41",
            "#5D4037",
            "#4E342E",
            "#3E2723",
        ],

        // Blue Gray
        [
            "#ECEFF1",
            "#CFD8DC",
            "#B0BEC5",
            "#90A4AE",
            "#78909C",
            "#607D8B",
            "#546E7A",
            "#455A64",
            "#37474F",
            "#263238",
        ],
    ];

    const copyToClipboard = async (text: string, index: number) => {
        try {
            await navigator.clipboard.writeText(text);

            setCopiedIndex(index);

            setTimeout(() => {
                    setCopiedIndex(null);
                }, 1500);
            } catch (err) {
            console.error(err);
        }
    };

    const hexToRgb = (hex: string) => {
        const clean = hex.replace("#", "");

        if (clean.length !== 6) return "";

        const r = parseInt(clean.substring(0, 2), 16);
        const g = parseInt(clean.substring(2, 4), 16);
        const b = parseInt(clean.substring(4, 6), 16);

        return `rgb(${r}, ${g}, ${b})`;
    };

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
        <div className="font-sans w-full flex flex-col items-start justify-start gap-6 lg:p-6 p-3 rounded-lg bg-[var(--card)] lg:my-6">

            <div className="w-full flex flex-row items-start justify-between">
                <span className="text-foreground text-3xl font-bold">
                    Color Picker
                </span>
                <SquareArrowOutUpRight onClick={handleShare} className="text-[var(--primary)] hover:text-[var(--secondary)] size-6 cursor-pointer" />
            </div>

            <div className="w-full flex flex-col items-start justify-start gap-3">
                
                <div className="w-full flex flex-col lg:flex-row items-end justify-center gap-6">

                    <div className="flex-1 h-full flex flex-col items-start justify-start gap-3">
                        <span className="text-xl rainbow-text font-semibold">
                            How to Use Color Picker
                        </span>
                        <div className="flex flex-col gap-3 text-foreground/80">
                            <span className="group text-md">
                                1. <span className="text-foreground font-semibold">Choose a Color</span> -  
                                <span className="ml-2">Click anywhere on the color picker to select the color you want.</span>
                            </span>
                            <span className="group text-md">
                                2. <span className="text-foreground font-semibold">Fine-Tune Your Color</span> -  
                                <span className="ml-2">Drag around the color area and hue bar to find the perfect shade.</span>
                            </span>
                            <span className="group text-md">
                                3. <span className="text-foreground font-semibold">Check the Color Values</span> -  
                                <span className="ml-2">Your selected color will automatically display its HEX and RGB values.</span>
                            </span>
                            <span className="group text-md">
                                4. <span className="text-foreground font-semibold">Copy the Color Code</span> -  
                                <span className="ml-2">Click the copy button beside the HEX or RGB value to copy it to your clipboard.</span>
                            </span>
                            <span className="group text-md">
                                5. <span className="text-foreground font-semibold">Try the Color Sampler</span> -  
                                <span className="ml-2">Select from the preset color samples below the picker to quickly explore different shades.</span>
                            </span>
                        </div>

                        <HexColorPicker
                            color={color}
                            onChange={setColor} 
                            className="
                            !w-full !h-[400px]
                            sm:!w-[400px] sm:!h-[400px]
                            md:!w-[500px] md:!h-[500px]
                            lg:!w-[600px] lg:!h-[600px]
                            !rounded-none color-picker-square"
                            style={{
                                cursor: "crosshair",
                            }}
                        />
                    </div>

                    <div className="flex-1 w-full lg:w-auto flex flex-col items-start justify-start gap-3">
                        
                        <div className="w-full flex flex-col items-start justify-start gap-3">
                            <span className="text-foreground font-bold text-xl">
                                Pixel Color
                            </span>

                            <div className="flex flex-row items-start justify-start gap-3">
                                
                                <div className="w-32 h-32"
                                    style={{
                                        backgroundColor: color,
                                    }}
                                />

                                <div className="h-full flex flex-col items-start justify-start gap-4">
                                
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                        <span className="text-foreground/80 text-md">
                                            Hex Value:
                                            <span className="uppercase ml-1">
                                                {color}
                                            </span>
                                        </span>

                                        <button
                                            type="button"
                                            title="Copy HEX"
                                            onClick={() =>
                                                copyToClipboard(color.toUpperCase(), 0)
                                            }
                                            className="text-foreground/80 cursor-pointer">
                                            {copiedIndex === 0 ? (
                                                <Check className="text-green-500 size-4" />
                                            ) : (
                                                <CopyIcon className="size-4" />
                                            )}
                                        </button>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                                        <span className="text-foreground/80 text-md">
                                            RGB Value:
                                            <span className="ml-1">
                                                {hexToRgb(color)}
                                            </span>
                                        </span>

                                        <button
                                            type="button"
                                            title="Copy RGB"
                                            onClick={() =>
                                                copyToClipboard(hexToRgb(color), 1)
                                            }
                                            className="text-foreground/80 cursor-pointer">
                                            {copiedIndex === 1 ? (
                                                <Check className="text-green-500 size-4" />
                                            ) : (
                                                <CopyIcon className="size-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex flex-col items-start justify-start gap-3">
                            <span className="text-foreground font-bold text-xl">
                                Color Sampler
                            </span>

                            <div className="w-full flex flex-col items-center lg:items-start gap-2">
                                {swatches.map((row, rowIndex) => (
                                <div
                                    key={rowIndex}
                                    className="
                                    w-full
                                    flex flex-wrap
                                    justify-around
                                    gap-2">
                                    {row.map((swatch) => (
                                    <button
                                        key={swatch}
                                        type="button"
                                        onClick={() => setColor(swatch)}
                                        title={swatch}
                                        className="
                                        lg:w-7 lg:h-7
                                        w-6 h-6
                                        border border-foreground/20
                                        cursor-pointer
                                        transition-transform
                                        hover:scale-110"
                                        style={{
                                        backgroundColor: swatch,
                                        }}
                                    />
                                    ))}
                                </div>
                                ))}
                            </div>

                        </div>

                    </div>

                </div>
            </div>

            <div className="relative border border-foreground/20 p-6 min-h-[320px] rounded-lg w-full overflow-hidden">

                <div className="font-sans blur-[2px] opacity-70">

                    <span className="text-[color:var(--primary)] text-lg">
                        Color Palette Builder
                    </span>

                    <p className="text-sm mt-2">
                        Lock the colors you love and build your own palette with up to six colors.
                    </p>

                    <div className="mt-6">

                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm">
                                Your Palette
                            </span>

                            <span className="text-xs opacity-60">
                                4 / 6 colors
                            </span>
                        </div>

                        <div className="font-sans grid grid-cols-3 sm:grid-cols-6 gap-2">

                            <div className="h-20 bg-[#96B4EB] relative">
                                <span className="absolute bottom-1 left-1">
                                    <LockIcon className="text-[#171717] size-4" />
                                </span>
                            </div>

                                <div className="h-20 bg-[#F6E06E] relative">
                            <span className="absolute bottom-1 left-1">
                                    <LockIcon className="text-[#171717] size-4" />
                                </span>
                            </div>

                            <div className="h-20 bg-[#D789B9] relative">
                                <span className="absolute bottom-1 left-1">
                                    <LockIcon className="text-[#171717] size-4" />
                                </span>
                            </div>

                            <div className="h-20 bg-[#B8D8F5] relative">
                                <span className="absolute bottom-1 left-1">
                                    <LockIcon className="text-[#171717] size-4" />
                                </span>
                            </div>


                            <div className="h-20 border border-dashed border-gray-400 flex items-center justify-center">
                            <PlusIcon className="text-[#FDFDFD] size-6" />
                            </div>

                            <div className="h-20 border border-dashed border-gray-400 flex items-center justify-center">
                                <PlusIcon className="text-[#FDFDFD] size-6" />
                            </div>

                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-5">

                        <div className="flex flex-row items-center gap-2 px-4 py-2 border border-foreground/20 rounded-full">
                            <LockIcon className="text-[#FDFDFD] size-3" /> 
                            <span className="font-sans text-sm">Lock color</span>
                        </div>

                        <button type="button" className="px-4 py-2 text-sm bg-[color:var(--primary)] rounded-full">
                            <span className="font-sans text-sm">Generate remaining</span>
                        </button>

                    </div>

                </div>

                <div className="font-sans absolute inset-0 flex flex-col items-center justify-center bg-white/60 dark:bg-black/50 backdrop-blur-[3px]">

                    <LockIcon className="size-12 text-foreground/80 lg:mb-6 mb-3" />

                    <h3 className="text-lg font-semibold text-foreground/80">
                        Build Your Own Palette
                    </h3>
                    <p className="text-md opacity-70 text-center text-foreground/80 max-w-xs mt-2">
                        Lock the colors you love and create a custom palette of up to six colors.
                    </p>

                    <Link href="/login" type="button" className="mt-4 px-6 py-2 text-sm text-[#171717]/80 bg-[color:var(--primary)] 
                        rounded-full cursor-pointer">
                        Log in to use this feature
                    </Link>

                </div>

            </div>

        </div>
    );
};