"use client";

import {
  InfoIcon,
  SquareArrowOutUpRight,
  ArrowRight,
  SquareChevronUp,
  SquareChevronDown,
  Copy,
  Check,
} from "lucide-react";
import InfoCard from "./InfoCard";
import { useState } from "react";

function RgbToHex() {
    const [showTutorial, setShowTutorial] = useState("");
    const [red, setRed] = useState(85);
    const [green, setGreen] = useState(120);
    const [blue, setBlue] = useState(201);

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

    const increaseRed = () => {
        setRed((prev) => Math.min(prev + 1, 255));
    };

    const decreaseRed = () => {
        setRed((prev) => Math.max(prev - 1, 0));
    };

    const increaseGreen = () => {
        setGreen((prev) => Math.min(prev + 1, 255));
    };

    const decreaseGreen = () => {
        setGreen((prev) => Math.max(prev - 1, 0));
    };

    const increaseBlue = () => {
        setBlue((prev) => Math.min(prev + 1, 255));
    };

    const decreaseBlue = () => {
        setBlue((prev) => Math.max(prev - 1, 0));
    };

    const rgbToHex = (r: number, g: number, b: number) => {
        return (
        "#" +
        [r, g, b]
            .map((value) => value.toString(16).padStart(2, "0"))
            .join("")
        ).toUpperCase();
    };

    const hex = rgbToHex(red, green, blue);

    const copyHex = async () => {
        await navigator.clipboard.writeText(hex);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1500);
    };

    const handleValueChange = (
        value: string,
        setter: React.Dispatch<React.SetStateAction<number>>
    ) => {
        if (value === "") {
        setter(0);
        return;
        }

        const number = Number(value);

        if (Number.isNaN(number)) return;

        setter(Math.min(255, Math.max(0, number)));
    };

    return (
        <div className="font-sans w-full flex flex-col items-start justify-start cursor-pointer lg:p-6 p-3 gap-3 bg-[var(--card)] rounded-lg lg:my-6">

            <div className="relative w-full flex flex-row items-start justify-between my-3">

                <span className="group flex flex-row items-center gap-2 text-foreground sm:text-3xl text-2xl">
                    Rgb <ArrowRight size={24} /> Hex
                </span>

                <div className="ml-auto flex flex-row items-end gap-3">

                    <div title="How to use">
                        <InfoIcon
                        size={24}
                        className="text-foreground/60 cursor-pointer hover:text-[var(--secondary)] transition duration-300 ease"
                        onMouseEnter={() => setShowTutorial("rgb-hex")}
                        onMouseLeave={() => setShowTutorial("")}
                        />
                    </div>

                    {showTutorial === "rgb-hex" && (
                        <InfoCard
                            content={
                                <>
                                    <span className="group text-sm">
                                        1.{" "}
                                        <span className="font-semibold">
                                        Enter RGB Values
                                        </span>{" "}
                                        - Enter values between 0 and 255 for Red, Green, and
                                        Blue.
                                    </span>

                                    <span className="group text-sm">
                                        2.{" "}
                                        <span className="font-semibold">
                                        Adjust Your Color
                                        </span>{" "}
                                        - Use the arrows beside each value to fine-tune the
                                        color.
                                    </span>

                                    <span className="group text-sm">
                                        3.{" "}
                                        <span className="font-semibold">
                                        Preview Your Color
                                        </span>{" "}
                                        - Your selected RGB color will be displayed below the
                                        inputs.
                                    </span>

                                    <span className="group text-sm">
                                        4.{" "}
                                        <span className="font-semibold">
                                        Get the HEX Value
                                        </span>{" "}
                                        - Huenicorn automatically converts your RGB values into
                                        HEX.
                                    </span>

                                    <span className="group text-sm">
                                        5.{" "}
                                        <span className="font-semibold">
                                        Copy the HEX Code
                                        </span>{" "}
                                        - Click the copy button to copy the HEX value.
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

            <div className="w-full flex sm:flex-row flex-col gap-3 gap-6 my-3">
                
                <div className="flex-1 flex flex-col gap-6">

                    <span className="text-foreground/80 text-xl">
                        Color Input
                    </span>

                    <div className="flex flex-col gap-6">

                        <div className="relative w-full max-w-[320px] flex flex-row items-center border border-foreground/10">

                            <span className="w-[120px] text-foreground/80 text-md px-6 text-center">
                                Red
                            </span>

                            <div className="relative flex flex-1 items-center border-l border-foreground/10 bg-background">

                                <input
                                    type="number"
                                    min={0}
                                    max={255}
                                    value={red}
                                    onChange={(e) =>
                                    handleValueChange(e.target.value, setRed)
                                    }
                                    className="w-full bg-transparent px-6 py-3 pr-10 outline-none"
                                />

                                <div className="absolute right-1 top-1/2 flex -translate-y-1/2 flex-col">

                                    <button
                                        type="button"
                                        onClick={increaseRed}
                                        className="text-foreground/50 transition-colors hover:text-foreground"
                                    >
                                        <SquareChevronUp size={20} />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={decreaseRed}
                                        className="text-foreground/50 transition-colors hover:text-foreground"
                                        >
                                        <SquareChevronDown size={20} />
                                    </button>

                                </div>

                            </div>
                        </div>

                        <div className="relative w-full max-w-[320px] flex flex-row items-center border border-foreground/10">

                            <span className="w-[120px] text-center text-foreground/80 text-md px-6">
                                Green
                            </span>

                            <div className="relative flex flex-1 items-center border-l border-foreground/10 bg-background">

                                <input
                                    type="number"
                                    min={0}
                                    max={255}
                                    value={green}
                                    onChange={(e) =>
                                    handleValueChange(e.target.value, setGreen)
                                    }
                                    className="w-full bg-transparent px-6 py-3 pr-10 outline-none"
                                />

                                <div className="absolute right-1 top-1/2 flex -translate-y-1/2 flex-col">

                                    <button
                                        type="button"
                                        onClick={increaseGreen}
                                        className="text-foreground/50 transition-colors hover:text-foreground"
                                    >
                                        <SquareChevronUp size={20} />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={decreaseGreen}
                                        className="text-foreground/50 transition-colors hover:text-foreground"
                                    >
                                        <SquareChevronDown size={20} />
                                    </button>

                                </div>

                            </div>
                        </div>

                        <div className="relative w-full max-w-[320px] flex flex-row items-center border border-foreground/10">

                            <span className="w-[120px] text-center text-foreground/80 text-md px-6">
                                Blue
                            </span>

                            <div className="relative flex flex-1 items-center border-l border-foreground/10 bg-background">

                                <input
                                    type="number"
                                    min={0}
                                    max={255}
                                    value={blue}
                                    onChange={(e) =>
                                    handleValueChange(e.target.value, setBlue)
                                    }
                                    className="w-full bg-transparent px-6 py-3 pr-10 outline-none"
                                />

                                <div className="absolute right-1 top-1/2 flex -translate-y-1/2 flex-col">

                                    <button
                                        type="button"
                                        onClick={increaseBlue}
                                        className="text-foreground/50 transition-colors hover:text-foreground"
                                    >
                                        <SquareChevronUp size={20} className="cursor-pointer"/>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={decreaseBlue}
                                        className="text-foreground/50 transition-colors hover:text-foreground"
                                    >
                                        <SquareChevronDown size={20} className="cursor-pointer"/>
                                    </button>

                                </div>

                            </div>
                        </div>

                    </div>

                </div>
                
                <div className="flex-1 flex flex-col gap-6">
                    <span className="text-foreground/80 text-xl">
                        Color Slider
                    </span>

                    <div className="flex flex-col gap-6">

                        {/* Red */}
                        <div className="w-full max-w-[400px]">
                            <div className="mb-2 flex items-center justify-between">
                                <span className="font-mono text-md text-foreground/80">
                                    Red
                                </span>

                                <span className="font-mono text-md text-foreground/50">
                                    {red}
                                </span>
                            </div>

                            <input
                                type="range"
                                min="0"
                                max="255"
                                value={red}
                                onChange={(e) => setRed(Number(e.target.value))}
                                className="h-3 w-full cursor-pointer appearance-none
                                bg-[linear-gradient(to_right,#000000,#ff0000)]
                                accent-red-500"
                            />
                        </div>

                        <div className="w-full max-w-[400px]">
                            <div className="mb-2 flex items-center justify-between">
                                <span className="font-mono text-md text-foreground/80">
                                    Green
                                </span>

                                <span className="font-mono text-md text-foreground/50">
                                    {green}
                                </span>
                            </div>

                            <input
                                type="range"
                                min="0"
                                max="255"
                                value={green}
                                onChange={(e) => setGreen(Number(e.target.value))}
                                className="h-3 w-full cursor-pointer appearance-none
                                bg-[linear-gradient(to_right,#000000,#00ff00)]
                                accent-green-500"
                            />
                        </div>

                        <div className="w-full max-w-[400px]">
                            <div className="mb-2 flex items-center justify-between">
                                <span className="font-mono text-md text-foreground/80">
                                    Blue
                                </span>

                                <span className="font-mono text-md text-foreground/50">
                                    {blue}
                                </span>
                            </div>

                            <input
                                type="range"
                                min="0"
                                max="255"
                                value={blue}
                                onChange={(e) => setBlue(Number(e.target.value))}
                                className="h-3 w-full cursor-pointer appearance-none
                                bg-[linear-gradient(to_right,#000000,#0000ff)]
                                accent-blue-500"
                            />
                        </div>

                    </div>
                </div>

            </div>

            <div className="h-full w-full flex flex-row gap-3 mt-6 mb-12">

                <div
                    className="h-30 w-30 border border-foreground/20"
                    style={{
                        backgroundColor: `rgb(${red}, ${green}, ${blue})`,
                    }}
                />

                <div className="flex flex-col justify-center gap-3 border border-foreground/10 px-6 py-3 lg:min-w-[300px] bg-background">

                    <span className="text-sm text-foreground/60">
                        HEX
                    </span>

                    <div className="flex flex-row items-center justify-between gap-4">

                        <span className="font-mono sm:text-lg text-sm">
                            {hex}
                        </span>

                        <button
                            type="button"
                            onClick={copyHex}
                            title="Copy HEX"
                            className="text-foreground/50 hover:text-[var(--secondary)] transition cursor-pointer"
                        >
                            {copied ? (
                                <Check size={20} className="text-green-500" />
                            ) : (
                                <Copy size={20} />
                            )}
                        </button>

                    </div>

                    <span className="font-mono text-sm text-foreground/50">
                        rgb({red}, {green}, {blue})
                    </span>

                </div>

            </div>

        </div>
    );
}

export default RgbToHex;