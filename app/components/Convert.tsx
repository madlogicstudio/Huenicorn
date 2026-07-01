'use client'

import { useState } from 'react'
import { useIsMobile } from '../hooks/useIsMobile';

export const Convert = () => {

    const isMobile = useIsMobile();
    const [hexColor, setHexColor] = useState("#000000");
    const [rgbColor, setRgbColor] = useState("rgb(0,0,0)");

    function hexToRgb(hex: string) {
        hex = hex.replace("#", "");

        if (hex.length !== 6) return "";

        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);

        return `rgb(${r}, ${g}, ${b})`;
    }

    function rgbToHex(rgb: string) {
        const values = rgb.match(/\d+/g);

        if (!values || values.length !== 3) return "";

        const [r, g, b] = values.map(Number);

        return (
            "#" +
            [r, g, b]
            .map((value) => value.toString(16).padStart(2, "0"))
            .join("")   
            .toUpperCase()
        );
    }

    return (
        <div className={`w-full flex flex-col justify-between gap-3`}>
            
            <div className={`${isMobile? "flex-col items-start" : "flex-row items-center gap-3"}
                w-full flex items-center justify-center`}>
                <span className='text-lg py-3 text-[color:var(--primary)] flex-1'>Convert Color Code</span>

                <div className='flex flex-row items-center justify-center gap-3 my-3 border border-gray-400'>
                    <span className='px-3 text-sm'>Hex</span>
                    <input type="text" placeholder={hexColor} className='text-center px-3 py-3 outline-none text-sm border-l border-gray-400'
                        value={hexColor}
                        onChange={(e) => {
                            const value = e.target.value;
                            setHexColor(value);
                            setRgbColor(hexToRgb(value));
                        }}/>
                </div>

                <div className='flex flex-row items-center justify-center gap-3 my-3 border border-gray-400'>
                    <span className='px-3 text-sm'>Rgb</span>
                    <input type="text" placeholder={rgbColor} className='text-center px-3 py-3 outline-none text-sm border-l border-gray-400'
                        value={rgbColor}
                        onChange={(e) => {
                            const value = e.target.value;
                            setRgbColor(value);
                            setHexColor(rgbToHex(value));
                        }}/>
                </div>
            </div>

            <span className='w-full text-md'>
                Enter a valid hexadecimal color code (e.g. #3498DB) in the Hex input, the corresponding RGB value will be generated automatically.
                Enter a valid RGB color value in the format rgb(52, 152, 219), the matching Hex color code will appear instantly.
            </span>
        
        </div>
    )
}
