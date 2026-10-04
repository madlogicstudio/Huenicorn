"use client";

import {
    InfoIcon,
    SquareArrowOutUpRight,
    ArrowRight,
    Copy,
    Check,
} from "lucide-react";
import InfoCard from "./InfoCard";
import { useState } from "react";

function HexToHsl() {
    const [showTutorial, setShowTutorial] = useState("");
    const [hexInput, setHexInput] = useState("#5578C9");
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({
                title: "Huenicorn",
                text: "Check out Huenicorn!, a simple collection of free color tools for designers, developers, and anyone who loves working with colors.",
                url: window.location.href,
            });
        }
    };

    const hexToHsl = (hex: string) => {
        let cleanHex = hex.replace("#", "");

        if (cleanHex.length === 3) {
            cleanHex = cleanHex
                .split("")
                .map((char) => char + char)
                .join("");
        }

        if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
            return null;
        }

        const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
        const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
        const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);

        let h = 0;
        let s = 0;
        const l = (max + min) / 2;

        if (max !== min) {
            const delta = max - min;

            s =
                l > 0.5
                    ? delta / (2 - max - min)
                    : delta / (max + min);

            switch (max) {
                case r:
                    h =
                        ((g - b) / delta +
                            (g < b ? 6 : 0));
                    break;

                case g:
                    h =
                        ((b - r) / delta + 2);
                    break;

                case b:
                    h =
                        ((r - g) / delta + 4);
                    break;
            }

            h /= 6;
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100),
        };
    };

    const hsl = hexToHsl(hexInput);

    const copyHsl = async () => {
        if (!hsl) return;

        const value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

        await navigator.clipboard.writeText(value);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1500);
    };

    const handleHexChange = (value: string) => {
        if (!value.startsWith("#")) {
            value = "#" + value;
        }

        setHexInput(value);
    };

    return (
        <div className="font-sans w-full flex flex-col items-start justify-start cursor-pointer lg:p-6 p-3 gap-3 bg-[var(--card)] rounded-lg lg:my-6">

            {/* Header */}
            <div className="relative w-full flex flex-row items-start justify-between my-3">

                <span className="group flex flex-row items-center gap-2 text-foreground sm:text-3xl text-2xl">
                    Hex <ArrowRight size={24} /> Hsl
                </span>

                <div className="ml-auto flex flex-row items-end gap-3">

                    <div title="How to use">

                        <InfoIcon
                            size={24}
                            className="text-foreground/60 cursor-pointer hover:text-[var(--secondary)] transition duration-300 ease"
                            onMouseEnter={() =>
                                setShowTutorial("hex-hsl")
                            }
                            onMouseLeave={() =>
                                setShowTutorial("")
                            }
                        />

                    </div>

                    {showTutorial === "hex-hsl" && (
                        <InfoCard
                            content={
                                <>
                                    <span className="group text-sm">
                                        1.{" "}
                                        <span className="font-semibold">
                                            Enter a HEX Value
                                        </span>{" "}
                                        - Enter a valid HEX color code.
                                    </span>

                                    <span className="group text-sm">
                                        2.{" "}
                                        <span className="font-semibold">
                                            Preview Your Color
                                        </span>{" "}
                                        - Your selected HEX color will be
                                        displayed below.
                                    </span>

                                    <span className="group text-sm">
                                        3.{" "}
                                        <span className="font-semibold">
                                            Get the HSL Value
                                        </span>{" "}
                                        - Huenicorn automatically converts
                                        your HEX color into HSL.
                                    </span>

                                    <span className="group text-sm">
                                        4.{" "}
                                        <span className="font-semibold">
                                            Copy the HSL Code
                                        </span>{" "}
                                        - Click the copy button to copy the
                                        HSL value.
                                    </span>
                                </>
                            }
                        />
                    )}

                    <SquareArrowOutUpRight
                        onClick={handleShare}
                        className="text-[var(--primary)] hover:text-[var(--secondary)] size-6 cursor-pointer transition duration-300 ease"
                    />

                </div>
            </div>

            {/* Main Content */}
            <div className="w-full flex sm:flex-row flex-col gap-6 my-3">

                {/* HEX INPUT */}
                <div className="flex-1 flex flex-col gap-6">

                    <span className="text-foreground/80 text-xl">
                        Color Input
                    </span>

                    <div className="flex flex-col gap-3">

                        <div className="relative w-full max-w-[300px] flex flex-row items-center border border-foreground/10">

                            <span className="w-[100px] text-foreground/80 text-md px-6 text-center">
                                HEX
                            </span>

                            <div className="relative flex flex-1 items-center border-l border-foreground/10 bg-background">

                                <input
                                    type="text"
                                    value={hexInput}
                                    maxLength={7}
                                    onChange={(e) =>
                                        handleHexChange(
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-transparent px-6 py-3 outline-none font-mono uppercase"
                                    placeholder="#5578C9"
                                />

                            </div>

                        </div>

                    </div>

                    {/* RESULT */}
                    <div className="h-full w-full flex flex-row gap-3 mt-6 mb-12">

                        <div
                            className="h-30 w-30 border border-foreground/20"
                            style={{
                                backgroundColor: hexInput,
                            }}
                        />

                        <div className="flex flex-col justify-center gap-3 border border-foreground/10 px-6 py-3 lg:min-w-[300px] bg-background">

                            <span className="text-sm text-foreground/60">
                                HSL
                            </span>

                            <div className="flex sm:flex-row flex-col sm:items-center items-start justify-between gap-4">

                                <span className="font-mono sm:text-lg text-sm">
                                    {hsl
                                        ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
                                        : "Invalid HEX"}
                                </span>

                                <button
                                    type="button"
                                    onClick={copyHsl}
                                    title="Copy HSL"
                                    disabled={!hsl}
                                    className="text-foreground/50 hover:text-[var(--secondary)] transition cursor-pointer disabled:opacity-30"
                                >
                                    {copied ? (
                                        <Check
                                            size={20}
                                            className="text-green-500"
                                        />
                                    ) : (
                                        <Copy size={20} />
                                    )}
                                </button>

                            </div>

                            <span className="font-mono text-sm text-foreground/50">
                                {hexInput.toUpperCase()}
                            </span>

                        </div>

                    </div>

                </div>

                {/* HSL SLIDERS */}
                <div className="flex-1 flex flex-col gap-6">

                    <span className="text-foreground/80 text-xl">
                        Color Slider
                    </span>

                    <div className="flex flex-col gap-6">

                        {/* HUE */}
                        <div className="w-full max-w-[400px]">

                            <div className="mb-2 flex items-center justify-between">

                                <span className="font-mono text-md text-foreground/80">
                                    Hue
                                </span>

                                <span className="font-mono text-md text-foreground/50">
                                    {hsl ? `${hsl.h}°` : "--"}
                                </span>

                            </div>

                            <input
                                type="range"
                                min="0"
                                max="360"
                                value={hsl?.h ?? 0}
                                readOnly
                                className="h-3 w-full cursor-default appearance-none
                                bg-[linear-gradient(to_right,red,orange,yellow,lime,cyan,blue,magenta,red)]
                                accent-blue-500"
                            />

                        </div>

                        {/* SATURATION */}
                        <div className="w-full max-w-[400px]">

                            <div className="mb-2 flex items-center justify-between">

                                <span className="font-mono text-md text-foreground/80">
                                    Saturation
                                </span>

                                <span className="font-mono text-md text-foreground/50">
                                    {hsl ? `${hsl.s}%` : "--"}
                                </span>

                            </div>

                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={hsl?.s ?? 0}
                                readOnly
                                className="h-3 w-full cursor-default appearance-none
                                bg-[linear-gradient(to_right,#888,#5578C9)]
                                accent-blue-500"
                            />

                        </div>

                        {/* LIGHTNESS */}
                        <div className="w-full max-w-[400px]">

                            <div className="mb-2 flex items-center justify-between">

                                <span className="font-mono text-md text-foreground/80">
                                    Lightness
                                </span>

                                <span className="font-mono text-md text-foreground/50">
                                    {hsl ? `${hsl.l}%` : "--"}
                                </span>

                            </div>

                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={hsl?.l ?? 0}
                                readOnly
                                className="h-3 w-full cursor-default appearance-none
                                bg-[linear-gradient(to_right,#000,#5578C9,#fff)]
                                accent-blue-500"
                            />

                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
}

export default HexToHsl;
