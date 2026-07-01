'use client'

import { useState, useEffect } from "react"
import { useIsMobile } from "../hooks/useIsMobile";

type PaletteProps = {
    refresh: number;
    onLoaded?: () => void;
};

export const Palette = ({ refresh, onLoaded }: PaletteProps) => {

    const isMobile = useIsMobile();
    const [colors, setColors] = useState<number[][]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    useEffect(() => {
        async function fetchColors() {
            try {
            const res = await fetch("/api/palette");
            const data = await res.json();

            setColors(data.result);
            onLoaded?.();
            } catch (err) {
            console.error(err);
            onLoaded?.();
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

    return (
        <div className={`${isMobile? "flex-col" : "flex-row"}
            w-full flex items-center justify-center pt-3 pb-3`}>

            {colors.map((color, index) => (
                <div  key={index} className={`${isMobile? "h-32" : "h-64 gap-3"}
                    w-full flex flex-col items-start justify-start object-contain`}>
                    <div className="w-full h-full cursor-pointer filter brightness-90 hover:brightness-100
                        transition duration-300 ease-in-out"
                        style={{
                            backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                        }}>
                    </div>
                    <div className="w-full flex flex-row items-center justify-between p-3 flex-wrap">
                        <span className="text-sm">{rgbToHex(color)}</span>
                        <button title="Copy" className="cursor-pointer"
                            onClick={() => copyToClipboard(rgbToHex(color), index)}>
                            {copiedIndex === index ? (
                                <i className="bx bx-check text-green-500 text-lg" />
                                ) : (
                                <i className="bx bx-copy text-lg" />
                            )}
                        </button>
                    </div>
                </div>
            ))}

        </div>
    )
}
