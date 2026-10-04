"use client";

import {
    Check,
    CopyIcon,
    InfoIcon,
    Plus,
    RotateCcw,
    SquareArrowOutUpRight,
    Trash2,
} from "lucide-react";
import { useState } from "react";
import InfoCard from "./InfoCard";

type GradientType = "linear" | "radial";

type ColorStop = {
    color: string;
    position: number;
};

const defaultColors: ColorStop[] = [
    { color: "#5578C9", position: 0 },
    { color: "#D789B9", position: 100 },
];

export default function GradientGenerator() {
    const [gradientType, setGradientType] =
        useState<GradientType>("linear");

    const [angle, setAngle] = useState(90);

    const [colors, setColors] = useState<ColorStop[]>(defaultColors);

    const [copied, setCopied] = useState(false);
    const [showTutorial, setShowTutorial] = useState("");

    const updateColor = (index: number, value: string) => {
        const updated = [...colors];
        updated[index] = {
            ...updated[index],
            color: value,
        };

        setColors(updated);
    };

    const updatePosition = (index: number, value: number) => {
        const updated = [...colors];

        updated[index] = {
            ...updated[index],
            position: value,
        };

        setColors(updated);
    };

    const addColor = () => {
        if (colors.length >= 5) return;

        const newPosition = Math.round(
            100 / colors.length
        );

        setColors([
            ...colors,
            {
                color: "#F6E06E",
                position: Math.min(newPosition, 100),
            },
        ]);
    };

    const removeColor = (index: number) => {
        if (colors.length <= 2) return;

        setColors(colors.filter((_, i) => i !== index));
    };

    const resetGradient = () => {
        setGradientType("linear");
        setAngle(90);
        setColors(defaultColors);
        setCopied(false);
    };

    const gradientStops = [...colors]
        .sort((a, b) => a.position - b.position)
        .map(
            (stop) => `${stop.color} ${stop.position}%`
        )
        .join(", ");

    const gradientCSS =
        gradientType === "linear"
            ? `linear-gradient(${angle}deg, ${gradientStops})`
            : `radial-gradient(circle, ${gradientStops})`;

    const copyCSS = async () => {
        await navigator.clipboard.writeText(
            `background: ${gradientCSS};`
        );

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1500);
    };

    const handleShare = async () => {
        const shareData = {
            title: "Huenicorn Gradient Generator",
            text: `Check out this gradient: ${gradientCSS}`,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(
                    window.location.href
                );
            }
        } catch {
            // User cancelled sharing
        }
    };

    return (
        <div className="font-sans w-full flex flex-col items-start justify-start cursor-pointer lg:p-6 p-3 gap-3 bg-[var(--card)] rounded-lg lg:my-6">

            <div className="relative w-full flex items-center justify-between my-2">

                <h2 className="text-foreground sm:text-3xl text-2xl">
                    Gradient Generator
                </h2>

                <div className="ml-auto flex flex-row items-end gap-3">

                    <div title="How to use">

                        <InfoIcon
                            size={24}
                            className="text-foreground/60 cursor-pointer hover:text-[var(--secondary)] transition duration-300 ease"
                            onMouseEnter={() =>
                                setShowTutorial("gradient-generator")
                            }
                            onMouseLeave={() =>
                                setShowTutorial("")
                            }
                        />

                    </div>

                    {showTutorial === "gradient-generator" && (
                        <InfoCard
                            content={
                                <>
                                    <span className="group text-sm">
                                        1.{" "}
                                        <span className="font-semibold">
                                            Choose a Gradient Type
                                        </span>{" "}
                                        -
                                        <span className="ml-2">
                                            Select Linear or Radial
                                            to change how your
                                            gradient is created.
                                        </span>
                                    </span>

                                    <span className="group text-sm">
                                        2.{" "}
                                        <span className="font-semibold">
                                            Add Your Colors
                                        </span>{" "}
                                        -
                                        <span className="ml-2">
                                            Enter HEX colors to
                                            create the color stops
                                            for your gradient.
                                        </span>
                                    </span>

                                    <span className="group text-sm">
                                        3.{" "}
                                        <span className="font-semibold">
                                            Adjust the Positions
                                        </span>{" "}
                                        -
                                        <span className="ml-2">
                                            Change each color's
                                            position to control
                                            where it appears in
                                            the gradient.
                                        </span>
                                    </span>

                                    <span className="group text-sm">
                                        4.{" "}
                                        <span className="font-semibold">
                                            Set the Angle
                                        </span>{" "}
                                        -
                                        <span className="ml-2">
                                            For linear gradients,
                                            adjust the angle to
                                            change the direction
                                            of the gradient.
                                        </span>
                                    </span>

                                    <span className="group text-sm">
                                        5.{" "}
                                        <span className="font-semibold">
                                            Copy the CSS
                                        </span>{" "}
                                        -
                                        <span className="ml-2">
                                            Copy the generated CSS
                                            code and use it in your
                                            website or project.
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

            <div className="w-full h-[240px] sm:h-[360px] transition-all duration-300"
                style={{
                    background: gradientCSS,
                }}
            />

            <div className="w-full flex flex-col gap-3 my-3">

                <div className="flex flex-row items-center justify-between">

                    <span className="font-sans text-xl">
                        Gradient Type
                    </span>

                    <button
                        type="button"
                        onClick={resetGradient}
                        title="Reset"
                        className="text-foreground/50 hover:text-foreground transition-colors cursor-pointer"
                    >
                        <RotateCcw size={24} />
                    </button>

                </div>

                <div className="grid grid-cols-2 gap-3">

                    <button
                        type="button"
                        onClick={() =>
                            setGradientType("linear")
                        }
                        className={`h-10 rounded-full border font-sans text-md transition-all cursor-pointer ${
                            gradientType === "linear"
                                ? "border-[var(--primary)] bg-[var(--primary)]/10 text-foreground"
                                : "border-foreground/10 text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                        }`}
                    >
                        Linear
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            setGradientType("radial")
                        }
                        className={`h-10 rounded-full border font-sans text-md transition-all cursor-pointer ${
                            gradientType === "radial"
                                ? "border-[var(--primary)] bg-[var(--primary)]/10 text-foreground"
                                : "border-foreground/10 text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                        }`}
                    >
                        Radial
                    </button>

                </div>
            </div>

            <div className="w-full bg-[var(--card)] p-3">

                {gradientType === "linear" && (
                    <div className="mt-6 flex flex-col gap-3">

                        <div className="flex flex-row items-center justify-between">

                            <span className="font-sans text-md text-foreground/60">
                                Angle
                            </span>

                            <span className="font-sans text-md text-foreground/60">
                                {angle}°
                            </span>

                        </div>

                        <input
                            type="range"
                            min="0"
                            max="360"
                            value={angle}
                            onChange={(e) =>
                                setAngle(Number(e.target.value))
                            }
                            className="w-full accent-[var(--primary)] cursor-pointer"
                        />

                        <div className="flex flex-row justify-between text-sm font-mono text-foreground/40">
                            <span>0°</span>
                            <span>180°</span>
                            <span>360°</span>
                        </div>

                    </div>
                )}

                <div className="mt-6 flex flex-col gap-4">

                    <div className="flex flex-row items-center justify-between">

                        <span className="font-sans text-md font-semibold">
                            Colors
                        </span>

                        <button
                            type="button"
                            onClick={addColor}
                            disabled={colors.length >= 5}
                            className="flex flex-row items-center gap-1.5 text-md font-sans text-foreground/60 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                            <Plus size={24} />
                            Add Color
                        </button>

                    </div>

                    <div className="flex flex-col gap-3">

                        {colors.map((stop, index) => (
                            <div
                                key={index}
                                className="flex flex-col sm:flex-row gap-3"
                            >

                                <div className="flex flex-1 flex-row items-center gap-2">

                                    <input
                                        type="color"
                                        value={stop.color}
                                        onChange={(e) =>
                                            updateColor(
                                                index,
                                                e.target.value.toUpperCase()
                                            )
                                        }
                                        className="w-12 h-12 cursor-pointer"
                                    />

                                    <input
                                        type="text"
                                        value={stop.color}
                                        maxLength={7}
                                        onChange={(e) =>
                                            updateColor(
                                                index,
                                                e.target.value.toUpperCase()
                                            )
                                        }
                                        className="flex-1 h-10 px-3 border border-foreground/10 bg-background font-mono text-sm outline-none focus:border-foreground/30 transition-colors"
                                    />

                                </div>

                                <div className="flex flex-row items-center gap-2 sm:w-[180px]">

                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={stop.position}
                                        onChange={(e) =>
                                            updatePosition(
                                                index,
                                                Number(e.target.value)
                                            )
                                        }
                                        className="flex-1 accent-[var(--primary)] cursor-pointer"
                                    />

                                    <span className="w-12 text-right font-mono text-sm text-foreground/60">
                                        {stop.position}%
                                    </span>

                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        removeColor(index)
                                    }
                                    disabled={colors.length <= 2}
                                    title="Remove color"
                                    className="flex items-center justify-center sm:w-12 h-12 text-foreground/40 hover:text-red-500 disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                >
                                    <Trash2 size={24} />
                                </button>

                            </div>
                        ))}

                    </div>
                </div>

            </div>

            <div className="w-full bg-[var(--card)] border border-foreground/10 p-4 sm:p-5">

                <div className="flex flex-row items-center justify-between mb-3">

                    <span className="font-sans text-sm font-semibold">
                        CSS
                    </span>

                    <button
                        type="button"
                        onClick={copyCSS}
                        className="flex flex-row items-center gap-2 text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
                    >
                        {copied ? (
                            <>
                                <Check size={24} className="text-green-500" />
                                <span className="font-sans text-sm">
                                    Copied
                                </span>
                            </>
                        ) : (
                            <>
                                <CopyIcon size={24} />
                                <span className="font-sans text-sm">
                                    Copy
                                </span>
                            </>
                        )}
                    </button>

                </div>

                <div className="w-full overflow-x-auto rounded-lg bg-background border border-foreground/10 p-4">

                    <code className="font-mono text-xs sm:text-sm whitespace-nowrap text-foreground/80">
                        background: {gradientCSS};
                    </code>

                </div>

            </div>

            <div className="w-full bg-[var(--card)] border border-foreground/10 p-4 sm:p-5">

                <div className="flex flex-row items-center justify-between mb-4">

                    <span className="font-sans text-md font-semibold">
                        Gradient Stops
                    </span>

                    <span className="font-sans text-md text-foreground/60">
                        {colors.length} colors
                    </span>

                </div>

                <div className="flex flex-col gap-3">

                    {colors
                        .slice()
                        .sort(
                            (a, b) =>
                                a.position - b.position
                        )
                        .map((stop, index) => (
                            <div
                                key={index}
                                className="flex flex-row items-center gap-3"
                            >

                                <div
                                    className="w-12 h-12 shrink-0"
                                    style={{
                                        backgroundColor:
                                            stop.color,
                                    }}
                                />

                                <div className="flex flex-1 flex-col min-w-0 gap-2">

                                    <span className="font-sans text-sm">
                                        {stop.color}
                                    </span>

                                    <span className="font-sans text-sm text-foreground/40">
                                        {stop.position}%
                                    </span>

                                </div>

                            </div>
                        ))}

                </div>

            </div>

        </div>
    );
}