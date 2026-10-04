"use client";

import { useState } from "react";
import {
    Check,
    CopyIcon,
    InfoIcon,
    SquareArrowOutUpRight,
} from "lucide-react";
import InfoCard from "./InfoCard";

export default function ShadesTints() {
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

    const rgbToHex = (r: number, g: number, b: number) => {
        return (
            "#" +
            [r, g, b]
                .map((value) =>
                    Math.max(0, Math.min(255, Math.round(value)))
                        .toString(16)
                        .padStart(2, "0")
                )
                .join("")
                .toUpperCase()
        );
    };

    const createShade = (
        r: number,
        g: number,
        b: number,
        amount: number
    ) => {
        return rgbToHex(
            r * (1 - amount),
            g * (1 - amount),
            b * (1 - amount)
        );
    };

    const createTint = (
        r: number,
        g: number,
        b: number,
        amount: number
    ) => {
        return rgbToHex(
            r + (255 - r) * amount,
            g + (255 - g) * amount,
            b + (255 - b) * amount
        );
    };

    const rgb = hexToRgb(hex);

    const shades = rgb
            ? [
                createShade(rgb.r, rgb.g, rgb.b, 0.1),
                createShade(rgb.r, rgb.g, rgb.b, 0.2),
                createShade(rgb.r, rgb.g, rgb.b, 0.3),
                createShade(rgb.r, rgb.g, rgb.b, 0.4),
                createShade(rgb.r, rgb.g, rgb.b, 0.5),
                createShade(rgb.r, rgb.g, rgb.b, 0.6),
                createShade(rgb.r, rgb.g, rgb.b, 0.7),
                createShade(rgb.r, rgb.g, rgb.b, 0.8),
                createShade(rgb.r, rgb.g, rgb.b, 0.9),
            ]
        : [];

    const tints = rgb
            ? [
                createTint(rgb.r, rgb.g, rgb.b, 0.1),
                createTint(rgb.r, rgb.g, rgb.b, 0.2),
                createTint(rgb.r, rgb.g, rgb.b, 0.3),
                createTint(rgb.r, rgb.g, rgb.b, 0.4),
                createTint(rgb.r, rgb.g, rgb.b, 0.5),
                createTint(rgb.r, rgb.g, rgb.b, 0.6),
                createTint(rgb.r, rgb.g, rgb.b, 0.7),
                createTint(rgb.r, rgb.g, rgb.b, 0.8),
                createTint(rgb.r, rgb.g, rgb.b, 0.9),
            ]
        : [];

    const copyValue = async (value: string, type: string) => {
        await navigator.clipboard.writeText(value);

        setCopied(type);

        setTimeout(() => {
            setCopied("");
        }, 1500);
    };

    const handleHexChange = (value: string) => {
        let formatted = value;

        if (!formatted.startsWith("#")) {
            formatted = `#${formatted}`;
        }

        formatted = formatted.slice(0, 7);

        setHex(formatted.toUpperCase());
    };

    const handleShare = async () => {
        if (!navigator.share) return;

        await navigator.share({
            title: "Shades & Tints - Huenicorn",
            text: `Create shades and tints from ${hex} with Huenicorn.`,
            url: window.location.href,
        });
    };

    return (
        <div className="font-sans w-full flex flex-col items-start justify-start cursor-pointer lg:p-6 p-3 gap-3 bg-[var(--card)] rounded-lg lg:my-6">

            <div className="relative w-full flex items-center justify-between my-2">

                <h2 className="text-foreground sm:text-3xl text-2xl">
                    Shades & Tints
                </h2>

                <div className="ml-auto flex flex-row items-end gap-3">

                    <div title="How to use">

                        <InfoIcon
                            size={24}
                            className="text-foreground/60 cursor-pointer hover:text-[var(--secondary)] transition duration-300 ease"
                            onMouseEnter={() =>
                                setShowTutorial("shades-tints")
                            }
                            onMouseLeave={() =>
                                setShowTutorial("")
                            }
                        />

                    </div>

                    {showTutorial === "shades-tints" && (
                        <InfoCard
                            content={
                                <>
                                    <span className="group text-sm">
                                        1.{" "}
                                        <span className="font-semibold">
                                            Choose a Base Color
                                        </span>{" "}
                                        -
                                        <span className="ml-2">
                                            Enter a HEX color to use as
                                            the starting color.
                                        </span>
                                    </span>

                                    <span className="group text-sm">
                                        2.{" "}
                                        <span className="font-semibold">
                                            Explore Shades
                                        </span>{" "}
                                        -
                                        <span className="ml-2">
                                            Shades are created by
                                            progressively adding black
                                            to your base color.
                                        </span>
                                    </span>

                                    <span className="group text-sm">
                                        3.{" "}
                                        <span className="font-semibold">
                                            Explore Tints
                                        </span>{" "}
                                        -
                                        <span className="ml-2">
                                            Tints are created by
                                            progressively adding white
                                            to your base color.
                                        </span>
                                    </span>

                                    <span className="group text-sm">
                                        4.{" "}
                                        <span className="font-semibold">
                                            Copy a Color
                                        </span>{" "}
                                        -
                                        <span className="ml-2">
                                            Click the copy button on any
                                            color to copy its HEX value.
                                        </span>
                                    </span>

                                    <span className="group text-sm">
                                        5.{" "}
                                        <span className="font-semibold">
                                            Experiment
                                        </span>{" "}
                                        -
                                        <span className="ml-2">
                                            Try different base colors to
                                            create useful color scales
                                            for your designs.
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

            <div className="w-full flex flex-col my-6 gap-8">

                <div className="w-full flex flex-col gap-3">

                    <span className="text-xl text-foreground/80">
                        Base Color
                    </span>

                    <div className="flex items-center gap-3">

                        <div
                            className="w-14 h-14 shrink-0 border border-foreground/10"
                            style={{
                                backgroundColor: rgb ? hex : "#ffffff",
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
                            className="w-full h-14 px-4 border border-foreground/10 bg-background outline-none font-mono text-md focus:border-foreground/30 transition"
                            placeholder="#5578C9"
                        />

                    </div>

                    {!rgb && hex.length > 1 && (
                        <span className="font-mono text-xs text-red-500">
                            Enter a valid HEX color.
                        </span>
                    )}

                </div>

                {rgb && (
                    <>
                        <ColorScale
                            title="Shades"
                            description="Base color mixed with black"
                            colors={shades}
                            copied={copied}
                            copyValue={copyValue}
                            prefix="shade"
                            hex={hex}
                        />

                        <ColorScale
                            title="Tints"
                            description="Base color mixed with white"
                            colors={tints}
                            copied={copied}
                            copyValue={copyValue}
                            prefix="tint"
                            hex={hex}
                        />
                    </>
                )}

            </div>
        </div>
    );
}

function ColorScale({
    title,
    description,
    colors,
    copied,
    copyValue,
    prefix,
    hex,
}: {
    title: string;
    description: string;
    colors: string[];
    copied: string;
    copyValue: (value: string, type: string) => void;
    prefix: string;
    hex: string;
}) {

    return (
        
        <div className="w-full flex flex-col gap-6">

            <div className="flex flex-col gap-3">
                <span className="text-xl text-foreground/80">
                    {title}
                </span>

                <span className="text-md text-foreground/60">
                    {description}
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">

                <ColorItem
                    color={hex.toUpperCase()}
                    copied={copied === "base"}
                    onCopy={() =>
                        copyValue(hex.toUpperCase(), "base")
                    }
                />

                {colors.map((color, index) => (
                    <ColorItem
                        key={`${prefix}-${index}`}
                        color={color}
                        copied={copied === `${prefix}-${index}`}
                        onCopy={() =>
                            copyValue(
                                color,
                                `${prefix}-${index}`
                            )
                        }
                    />
                ))}

            </div>
        </div>
    );
}

function ColorItem({
    color,
    copied,
    onCopy,
}: {
    color: string;
    copied: boolean;
    onCopy: () => void;
}) {
    return (
        <div className="group flex flex-col border border-foreground/10 bg-background overflow-hidden">

            <div
                className="w-full h-42"
                style={{
                    backgroundColor: color,
                }}
            />

            <div className="flex items-center justify-between gap-2 p-3">

                <span className="font-mono text-sm text-foreground/70 truncate">
                    {color}
                </span>

                <button
                    onClick={onCopy}
                    className="shrink-0 text-foreground/50 hover:text-foreground transition cursor-pointer"
                    aria-label={`Copy ${color}`}
                >
                    {copied ? (
                        <Check
                            size={18}
                            className="text-green-500"
                        />
                    ) : (
                        <CopyIcon size={18} />
                    )}
                </button>

            </div>
        </div>
    );
}