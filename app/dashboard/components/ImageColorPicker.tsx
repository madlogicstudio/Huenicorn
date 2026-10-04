"use client";

import { useRef, useState } from "react";
import { SquareArrowOutUpRight, Check, CopyIcon, InfoIcon, ZoomIn, ZoomOut, Fullscreen } from "lucide-react"
import Link from "next/link";
import InfoCard from "./InfoCard";

export default function ImageColorPicker() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const [color, setColor] = useState("#000000");
    const [zoom, setZoom] = useState(1);

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

            // Use the actual image dimensions
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;

            ctx.drawImage(
            image,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight
            );

            // Reset zoom whenever a new image is uploaded
            setZoom(1);

            URL.revokeObjectURL(image.src);
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

    const [showTutorial, setShowTutorial] = useState("");

    const zoomIn = () => {
        setZoom((prev) => Math.min(prev + 0.25, 3));
    };

    const zoomOut = () => {
        setZoom((prev) => Math.max(prev - 0.25, 0.5));
    };

    const hasDragged = useRef(false);

    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    });

        const [isDragging, setIsDragging] = useState(false);

        const dragStart = useRef({
        x: 0,
        y: 0,
    });

        const dragOrigin = useRef({
        x: 0,
        y: 0,
    });

    const removeZoom = () => {
        setZoom(1);
        setPosition({x: 0, y: 0});
    }

    const handlePointerDown = (
        event: React.PointerEvent<HTMLCanvasElement>
        ) => {
        event.currentTarget.setPointerCapture(event.pointerId);

        setIsDragging(true);

        hasDragged.current = false;

        dragStart.current = {
            x: event.clientX,
            y: event.clientY,
        };

        dragOrigin.current = {
            x: position.x,
            y: position.y,
        };
        };

        const handlePointerMove = (
        event: React.PointerEvent<HTMLCanvasElement>
            ) => {
            if (!isDragging) return;

            const deltaX = event.clientX - dragStart.current.x;
            const deltaY = event.clientY - dragStart.current.y;

            // Prevent tiny mouse movements from being considered a drag
            if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
                hasDragged.current = true;
            }

            setPosition({
                x: dragOrigin.current.x + deltaX,
                y: dragOrigin.current.y + deltaY,
            });
        };

        const handlePointerUp = (
            event: React.PointerEvent<HTMLCanvasElement>
            ) => {
        setIsDragging(false);

        event.currentTarget.releasePointerCapture(event.pointerId);
    };

    return (
        <div className="font-sans w-full flex flex-col items-start justify-start cursor-pointer lg:p-6 p-3 gap-3 bg-[var(--card)] rounded-lg lg:my-6">

            <div className="relative w-full flex flex-row items-start justify-between my-3">
                <span className="text-foreground sm:text-3xl text-2xl">
                    Image Color Picker
                </span>
                <div className="ml-auto flex flex-row items-end gap-3">
                    <div title="How to use">
                        <InfoIcon size={24} className="text-foreground/60 cursor-pointer hover:text-[var(--secondary)] 
                            transition duration-300 ease" 
                            onMouseEnter={() => setShowTutorial("image-color-picker")} onMouseLeave={() => setShowTutorial("")}/>
                    </div>
                    {showTutorial === "image-color-picker" && (
                        <InfoCard
                            content={
                                <>
                                    <span className="group text-sm">
                                        1.{" "}
                                        <span className="font-semibold">
                                            Choose an Image
                                        </span>{" "}
                                        -{" "}
                                        <span className="ml-1">
                                            Click the Choose Image button and select an image
                                            from your device.
                                        </span>
                                    </span>

                                    <span className="group text-sm">
                                        2.{" "}
                                        <span className="font-semibold">
                                            Select a Color
                                        </span>{" "}
                                        -{" "}
                                        <span className="ml-1">
                                            Click anywhere on the image to pick the color from
                                            that exact point.
                                        </span>
                                    </span>

                                    <span className="group text-sm">
                                        3.{" "}
                                        <span className="font-semibold">
                                            Zoom and Explore
                                        </span>{" "}
                                        -{" "}
                                        <span className="ml-1">
                                            Use the zoom controls to get a closer look at
                                            specific areas of the image. When zoomed in, you
                                            can drag the image to explore different areas.
                                        </span>
                                    </span>

                                    <span className="group text-sm">
                                        4.{" "}
                                        <span className="font-semibold">
                                            Check the Selected Color
                                        </span>{" "}
                                        -{" "}
                                        <span className="ml-1">
                                            The selected color will automatically appear below
                                            the image along with its HEX value.
                                        </span>
                                    </span>

                                    <span className="group text-sm">
                                        5.{" "}
                                        <span className="font-semibold">
                                            Copy the HEX Code
                                        </span>{" "}
                                        -{" "}
                                        <span className="ml-1">
                                            Click the copy button beside the HEX value to copy
                                            the selected color to your clipboard.
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

            <div className="w-full flex flex-col lg:items-start items-center mt-6">
                <div className="flex flex-row items-center my-6 cursor-pointer border border-foreground/20 px-6 py-2 rounded-full">
                    <label htmlFor="image-upload" className="text-sm cursor-pointer">
                        Choose Image
                    </label>
                    <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden"/>
                </div>

                <span className="font-sans text-md text-center mb-6 text-foreground/80">Click Choose Image and select an image from your device.</span>
                
                <div className="sm:max-h-[720px] max-h-[360px] min-h-[360px] w-full border border-foreground/20 overflow-hidden">       
                    <canvas
                        ref={canvasRef}
                        onClick={(event) => {
                            if (hasDragged.current) {
                            hasDragged.current = false;
                            return;
                            }

                            handleMouseClick(event);
                        }}
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        onPointerCancel={handlePointerUp}
                        className={`block w-full max-w-none select-none ${
                            isDragging ? "cursor-grabbing" : "cursor-crosshair"
                        }`}
                        style={{
                            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                            transformOrigin: "top left",
                            touchAction: "none",
                        }}
                    />
                </div>

                <div className="w-full flex flex-row items-center gap-4 py-6">
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

                    <div className="ml-auto flex flex-row gap-4 p-3">
                        <ZoomIn size={24} onClick={zoomIn}/>
                        <ZoomOut size={24} onClick={zoomOut} />
                        <Fullscreen size={24} onClick={removeZoom}/>
                    </div>

                </div>

            </div>

        </div>
    );
}