'use client'

import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

export const Picker = () => {

    const isMobile = useIsMobile();
    const [color, setColor] = useState("#aabbcc");
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    //swatches

    const swatches1 = ["#FFFFFF", "#F5F5F5", "#EEEEEE", "#E0E0E0", "#BDBDBD", "#9E9E9E", "#757575", "#616161", "#424242", "#000000"];
    const swatches2 = ["#FFEBEE", "#FFCDD2", "#EF9A9A", "#E57373", "#EF5350", "#F44336", "#E53935", "#D32F2F", "#C62828", "#B71C1C"];
    const swatches3 = ["#FCE4EC", "#F8BBD0", "#F48FB1", "#F06292", "#EC407A", "#E91E63", "#D81B60", "#C2185B", "#AD1457", "#880E4F"];
    const swatches4 = ["#F3E5F5", "#E1BEE7", "#CE93D8", "#BA68C8", "#AB47BC", "#9C27B0", "#8E24AA", "#7B1FA2", "#6A1B9A", "#4A148C"];
    const swatches5 = ["#EDE7F6", "#D1C4E9", "#B39DDB", "#9575CD", "#7E57C2", "#673AB7", "#5E35B1", "#512DA8", "#4527A0", "#311B92"];
    const swatches6 = ["#E8EAF6", "#C5CAE9", "#9FA8DA", "#7986CB", "#5C6BC0", "#3F51B5", "#3949AB", "#303F9F", "#283593", "#1A237E"];
    const swatches7 = ["#E3F2FD", "#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2", "#1565C0", "#0D47A1"];
    const swatches8 = ["#E1F5FE", "#B3E5FC", "#81D4FA", "#4FC3F7", "#29B6F6", "#03A9F4", "#039BE5", "#0288D1", "#0277BD", "#01579B"];
    const swatches9 = ["#E0F7FA", "#B2EBF2", "#80DEEA", "#4DD0E1", "#26C6DA", "#00BCD4", "#00ACC1", "#0097A7", "#00838F", "#006064"];
    const swatches10 = ["#E0F2F1", "#B2DFDB", "#80CBC4", "#4DB6AC", "#26A69A", "#009688", "#00897B", "#00796B", "#00695C", "#004D40"];

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

    function hexToRgb(hex: string) {
        const clean = hex.replace("#", "");

        if (clean.length !== 6) return "";

        const r = parseInt(clean.substring(0, 2), 16);
        const g = parseInt(clean.substring(2, 4), 16);
        const b = parseInt(clean.substring(4, 6), 16);

        return `rgb(${r}, ${g}, ${b})`;
    }

    return (
        <div className="w-full flex flex-col items-start justift-start gap-3">

            <span className="text-[color:var(--primary)] text-lg">Color Picker</span>

            <div className={`w-full flex flex-col items-start justify-start gap-3`}>
                
                <div className={`${isMobile? "flex-col gap-3 w-full" : "flex-row gap-6"}
                    flex items-start justify-center`}>
                    <HexColorPicker color={color} onChange={setColor}
                        style={{
                            width: isMobile ? "100%" : "600px",
                            height: isMobile ? "332px" : "600px",
                            borderRadius: 0,
                            cursor: "crosshair",
                        }}
                    />
                    <div className={`${isMobile? "w-full" : ""}
                        flex flex-col items-start justify-start gap-3`}>
                        <span className="text-[color:var(--primary)] text-lg">Sampler</span>
                        <div className={`${isMobile? "w-full items-center" : ""}
                            flex flex-row gap-2 justify-center`}>
                            {swatches1.map((swatch) => (
                                <button
                                    key={swatch}
                                    onClick={() => setColor(swatch)}
                                    className="w-6 h-6 border cursor-pointer"
                                    style={{ backgroundColor: swatch }}
                                />
                            ))}
                        </div>
                        <div className={`${isMobile? "w-full" : ""}
                            flex flex-row gap-2 justify-center`}>
                            {swatches2.map((swatch) => (
                                <button
                                    key={swatch}
                                    onClick={() => setColor(swatch)}
                                    className="w-6 h-6 border cursor-pointer"
                                    style={{ backgroundColor: swatch }}
                                />
                            ))}
                        </div>
                        <div className={`${isMobile? "w-full" : ""}
                            flex flex-row gap-2 justify-center`}>
                            {swatches3.map((swatch) => (
                                <button
                                    key={swatch}
                                    onClick={() => setColor(swatch)}
                                    className="w-6 h-6 border cursor-pointer"
                                    style={{ backgroundColor: swatch }}
                                />
                            ))}
                        </div>
                        <div className={`${isMobile? "w-full" : ""}
                            flex flex-row gap-2 justify-center`}>
                            {swatches4.map((swatch) => (
                                <button
                                    key={swatch}
                                    onClick={() => setColor(swatch)}
                                    className="w-6 h-6 border cursor-pointer"
                                    style={{ backgroundColor: swatch }}
                                />
                            ))}
                        </div>
                        <div className={`${isMobile? "w-full" : ""}
                            flex flex-row gap-2 justify-center`}>
                            {swatches5.map((swatch) => (
                                <button
                                    key={swatch}
                                    onClick={() => setColor(swatch)}
                                    className="w-6 h-6 border cursor-pointer"
                                    style={{ backgroundColor: swatch }}
                                />
                            ))}
                        </div>
                        <div className={`${isMobile? "w-full" : ""}
                            flex flex-row gap-2 justify-center`}>
                            {swatches6.map((swatch) => (
                                <button
                                    key={swatch}
                                    onClick={() => setColor(swatch)}
                                    className="w-6 h-6 border cursor-pointer"
                                    style={{ backgroundColor: swatch }}
                                />
                            ))}
                        </div>
                        <div className={`${isMobile? "w-full" : ""}
                            flex flex-row gap-2 justify-center`}>
                            {swatches7.map((swatch) => (
                                <button
                                    key={swatch}
                                    onClick={() => setColor(swatch)}
                                    className="w-6 h-6 border cursor-pointer"
                                    style={{ backgroundColor: swatch }}
                                />
                            ))}
                        </div>
                        <div className={`${isMobile? "w-full" : ""}
                            flex flex-row gap-2 justify-center`}>
                            {swatches8.map((swatch) => (
                                <button
                                    key={swatch}
                                    onClick={() => setColor(swatch)}
                                    className="w-6 h-6 border cursor-pointer"
                                    style={{ backgroundColor: swatch }}
                                />
                            ))}
                        </div>
                        <div className={`${isMobile? "w-full" : ""}
                            flex flex-row gap-2 justify-center`}>
                            {swatches9.map((swatch) => (
                                <button
                                    key={swatch}
                                    onClick={() => setColor(swatch)}
                                    className="w-6 h-6 border cursor-pointer"
                                    style={{ backgroundColor: swatch }}
                                />
                            ))}
                        </div>
                        <div className={`${isMobile? "w-full" : ""}
                            flex flex-row gap-2 justify-center`}>
                            {swatches10.map((swatch) => (
                                <button
                                    key={swatch}
                                    onClick={() => setColor(swatch)}
                                    className="w-6 h-6 border cursor-pointer"
                                    style={{ backgroundColor: swatch }}
                                />
                            ))}
                        </div>

                        <div className="w-full flex flex-col items-start justify-start gap-3">

                            <span className="text-[color:var(--primary)] text-lg">Pixel Color</span>

                            <div className="flex flex-row items-start justify-start gap-3">

                                <div className={`${isMobile? "h-32 w-32" : "h-16 w-16"}`} style={{ backgroundColor: color }}></div>

                                <div className="h-full flex flex-col items-start justify-start gap-3">

                                    <div className={`${isMobile? "flex-col" : "flex-row"}
                                        flex items-start justify-between gap-3`}>
                                        <span className="text-sm">Hex Value: 
                                            <span className="uppercase"> {color}</span>
                                        </span>
                                        <button title="Copy"
                                            onClick={() => copyToClipboard(color.toUpperCase(), 0)}
                                            >
                                            {copiedIndex === 0 ? (
                                                <i className="bx bx-check text-green-500 text-lg" />
                                            ) : (
                                                <i className="bx bx-copy text-lg cursor-pointer" />
                                            )}
                                        </button>
                                    </div>
                                    <div className={`${isMobile? "flex-col" : "flex-row"}
                                        flex items-start justify-between gap-3`}>
                                        <span className="text-sm">Rgb Value:  
                                            <span className="uppercase"> {hexToRgb(color)}</span>
                                        </span>
                                        <button title="Copy"
                                            onClick={() => copyToClipboard(hexToRgb(color), 1)}
                                            >
                                            {copiedIndex === 1 ? (
                                                <i className="bx bx-check text-green-500 text-lg" />
                                            ) : (
                                                <i className="bx bx-copy text-lg cursor-pointer" />
                                            )}
                                        </button>
                                    </div>       

                                </div>
                            </div>
                            
                        </div>

                    </div>  

                </div>
                        
            </div>
            
        </div>
    );
}
