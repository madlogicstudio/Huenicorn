"use client";

import { useState } from "react";
import {
    Check,
    CopyIcon,
    InfoIcon,
    SquareArrowOutUpRight
} from "lucide-react";
import InfoCard from "./InfoCard";

type ColorValues = {
    hex: string;
    rgb: string;
    hsl: string;
    oklch: string;
};

export default function CssColorConverter() {
    const [hex, setHex] = useState("#5578C9");
    const [copied, setCopied] = useState("");
    const [showTutorial, setShowTutorial] = useState("");

    const hexToRgb = (value: string) => {
        let clean = value.replace("#", "");

        if (clean.length === 3) {
            clean = clean
                .split("")
                .map((char) => char + char)
                .join("");
        }

        if (!/^[0-9A-Fa-f]{6}$/.test(clean)) {
            return null;
        }

        return {
            r: parseInt(clean.substring(0, 2), 16),
            g: parseInt(clean.substring(2, 4), 16),
            b: parseInt(clean.substring(4, 6), 16),
        };
    };

    const rgbToHsl = (r: number, g: number, b: number) => {
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);

        let h = 0;
        let s = 0;
        const l = (max + min) / 2;

        if (max !== min) {
            const d = max - min;

            s = l > 0.5
                ? d / (2 - max - min)
                : d / (max + min);

            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
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

    /*
     * Approximation of OKLCH values from sRGB.
     * Good for displaying a useful CSS representation.
     */
    const rgbToOklch = (r: number, g: number, b: number) => {
        const srgbToLinear = (value: number) => {
            value /= 255;

            return value <= 0.04045
                ? value / 12.92
                : Math.pow((value + 0.055) / 1.055, 2.4);
        };

        const R = srgbToLinear(r);
        const G = srgbToLinear(g);
        const B = srgbToLinear(b);

        const l =
            0.4122214708 * R +
            0.5363325363 * G +
            0.0514459929 * B;

        const m =
            0.2119034982 * R +
            0.6806995451 * G +
            0.1073969566 * B;

        const s =
            0.0883024619 * R +
            0.2817188376 * G +
            0.6299787005 * B;

        const l_ = Math.cbrt(l);
        const m_ = Math.cbrt(m);
        const s_ = Math.cbrt(s);

        const L =
            0.2104542553 * l_ +
            0.793617785 * m_ -
            0.0040720468 * s_;

        const a =
            1.9779984951 * l_ -
            2.428592205 * m_ +
            0.4505937099 * s_;

        const bValue =
            0.0259040371 * l_ +
            0.7827717662 * m_ -
            0.808675766 * s_;

        const C = Math.sqrt(a * a + bValue * bValue);

        let H = Math.atan2(bValue, a) * (180 / Math.PI);

        if (H < 0) {
            H += 360;
        }

        return {
            l: L,
            c: C,
            h: H,
        };
    };

    const rgb = hexToRgb(hex);

    const hsl = rgb
        ? rgbToHsl(rgb.r, rgb.g, rgb.b)
        : null;

    const oklch = rgb
        ? rgbToOklch(rgb.r, rgb.g, rgb.b)
        : null;

    const values: ColorValues | null =
        rgb && hsl && oklch
            ? {
                  hex: hex.toUpperCase(),
                  rgb: `rgb(${rgb.r} ${rgb.g} ${rgb.b})`,
                  hsl: `hsl(${hsl.h} ${hsl.s}% ${hsl.l}%)`,
                  oklch: `oklch(${oklch.l.toFixed(3)} ${oklch.c.toFixed(
                      3
                  )} ${oklch.h.toFixed(1)})`,
              }
            : null;

    const handleHexChange = (value: string) => {
        let formatted = value;

        if (!formatted.startsWith("#")) {
            formatted = `#${formatted}`;
        }

        formatted = formatted.slice(0, 7);

        setHex(formatted.toUpperCase());
    };

    const copyValue = async (value: string, type: string) => {
        await navigator.clipboard.writeText(value);

        setCopied(type);

        setTimeout(() => {
            setCopied("");
        }, 1500);
    };

    const handleShare = async () => {
        if (!navigator.share) return;

        await navigator.share({
            title: "CSS Color Converter - Huenicorn",
            text: `Convert ${hex} into CSS color formats with Huenicorn.`,
            url: window.location.href,
        });
    };

    return (
        <div className="font-sans w-full flex flex-col items-start justify-start cursor-pointer lg:p-6 p-3 gap-3 bg-[var(--card)] rounded-lg lg:my-6">

            {/* Header */}
            <div className="w-full flex items-center justify-between my-3">

                <div className="relative w-full flex flex-row items-start justify-between my-3">

                <span className="group flex flex-row items-center gap-2 text-foreground sm:text-3xl text-2xl">
                    CSS Color Converter
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
                                            Enter a HEX Color
                                        </span>{" "}
                                        -
                                        <span className="ml-2">
                                            Enter a valid HEX color such as
                                            #5578C9.
                                        </span>
                                    </span>

                                    <span className="group text-sm">
                                        2.{" "}
                                        <span className="font-semibold">
                                            Preview the Color
                                        </span>{" "}
                                        -
                                        <span className="ml-2">
                                            The preview updates automatically
                                            as you change the HEX value.
                                        </span>
                                    </span>

                                    <span className="group text-sm">
                                        3.{" "}
                                        <span className="font-semibold">
                                            Explore CSS Formats
                                        </span>{" "}
                                        -
                                        <span className="ml-2">
                                            View the same color as HEX, RGB,
                                            HSL, and OKLCH.
                                        </span>
                                    </span>

                                    <span className="group text-sm">
                                        4.{" "}
                                        <span className="font-semibold">
                                            Copy a Format
                                        </span>{" "}
                                        -
                                        <span className="ml-2">
                                            Click the copy button beside any
                                            format to copy it to your
                                            clipboard.
                                        </span>
                                    </span>

                                    <span className="group text-sm">
                                        5.{" "}
                                        <span className="font-semibold">
                                            Use the CSS Value
                                        </span>{" "}
                                        -
                                        <span className="ml-2">
                                            Paste the copied value directly
                                            into your CSS.
                                        </span>
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

            </div>

            <div className="w-full flex flex-col my-6 gap-6">

                {/* Input + Preview */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Color Preview */}
                    <div className="flex flex-col gap-3">

                        <div className="font-sans flex flex-row items-center justify-between">
                            <span className="text-xl text-foreground/80">
                                Color Preview
                            </span>

                            {values && (
                                <span className="text-md text-foreground/50">
                                    {values.hex}
                                </span>
                            )}
                        </div>

                        <div
                            className="w-full h-48 border border-foreground/10 transition-colors duration-200"
                            style={{
                                backgroundColor: values?.hex ?? "#ffffff",
                            }}
                        />

                    </div>

                    {/* HEX Input */}
                    <div className="flex flex-col gap-3">

                        <span className="text-xl text-foreground/80">
                            HEX Color
                        </span>

                        <div className="flex items-start gap-3">

                            <div
                                className="w-12 h-12 shrink-0 border border-foreground/10"
                                style={{
                                    backgroundColor: values?.hex ?? "#fff",
                                }}
                            />

                            <input
                                type="text"
                                value={hex}
                                onChange={(e) =>
                                    handleHexChange(e.target.value)
                                }
                                maxLength={7}
                                spellCheck={false}
                                className="w-full h-12 px-4 border border-foreground/10 bg-background outline-none font-mono text-md focus:border-foreground/30 transition"
                                placeholder="#5578C9"
                            />

                        </div>

                        {!values && hex.length > 1 && (
                            <span className="font-mono text-xs text-red-500">
                                Enter a valid HEX color.
                            </span>
                        )}

                    </div>

                </div>

                {/* Formats */}
                {values && (
                    <div className="flex flex-col gap-3">

                        <span className="text-xl text-foreground/80">
                            CSS Color Formats
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                            {/* HEX */}
                            <ColorValue
                                label="HEX"
                                value={values.hex}
                                copied={copied === "hex"}
                                onCopy={() =>
                                    copyValue(values.hex, "hex")
                                }
                            />

                            {/* RGB */}
                            <ColorValue
                                label="RGB"
                                value={values.rgb}
                                copied={copied === "rgb"}
                                onCopy={() =>
                                    copyValue(values.rgb, "rgb")
                                }
                            />

                            {/* HSL */}
                            <ColorValue
                                label="HSL"
                                value={values.hsl}
                                copied={copied === "hsl"}
                                onCopy={() =>
                                    copyValue(values.hsl, "hsl")
                                }
                            />

                            {/* OKLCH */}
                            <ColorValue
                                label="OKLCH"
                                value={values.oklch}
                                copied={copied === "oklch"}
                                onCopy={() =>
                                    copyValue(values.oklch, "oklch")
                                }
                            />

                        </div>

                    </div>
                )}

                {/* CSS Output */}
                {values && (
                    <div className="flex flex-col gap-3">

                        <span className="font-sans text-xl text-foreground/80">
                            CSS
                        </span>

                        <div className="flex items-center justify-between gap-4 px-4 py-3 border border-foreground/10 bg-background">

                            <code className="font-sans text-md break-all">
                                color: {values.hex};
                            </code>

                            <button
                                onClick={() =>
                                    copyValue(
                                        `color: ${values.hex};`,
                                        "css"
                                    )
                                }
                                className="shrink-0 text-foreground/50 hover:text-foreground transition cursor-pointer"
                            >
                                {copied === "css" ? (
                                    <Check size={16} className="text-green-500" />
                                ) : (
                                    <CopyIcon size={16} />
                                )}
                            </button>

                        </div>

                    </div>
                )}

            </div>

        </div>

    );
}

function ColorValue({
    label,
    value,
    copied,
    onCopy,
}: {
    label: string;
    value: string;
    copied: boolean;
    onCopy: () => void;
}) {
    return (
        <div className="flex items-center justify-between gap-3 px-4 py-4 border border-foreground/10 bg-background">

            <div className="flex flex-col gap-1 min-w-0 gap-2">

                <span className="font-sans text-sm uppercase tracking-wider text-foreground/40">
                    {label}
                </span>

                <code className="font-sans text-md truncate">
                    {value}
                </code>

            </div>

            <button
                onClick={onCopy}
                className="shrink-0 text-foreground/60 hover:text-foreground transition cursor-pointer"
                aria-label={`Copy ${label}`}
            >
                {copied ? (
                    <Check size={16} className="text-green-500" />
                ) : (
                    <CopyIcon size={16} />
                )}
            </button>

        </div>
    );
}