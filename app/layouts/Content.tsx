'use client'

import { useState } from "react";
import { Palette } from "../components/Palette"
import { Convert } from "../components/Convert";
import { Picker } from "../components/Picker";

type ContentProps = {
    isDark: boolean;
}

export const Content = ({isDark}: ContentProps) => {

    const [spin, setSpin] = useState(false);
    const [refresh, setRefresh] = useState(0);

    return (
        <div className={`${isDark ? "text-[var(--light)] bg-[var(--dark)]" : "bg-[var(--background)] text-[var(--dark)]"}
            h-auto max-w-[1080px] w-full flex flex-col items-start justify-start p-3 gap-3`}>
            
            <span className="text-md py-6 border-b border-gray-400">
                <span className="text-[color:var(--primary)]">Huenicorn</span> is a free color palette generator, image color picker, and Hex to Rgb converter made by madlogicstudio. 
                It uses colormind Rest Api to generate the color palettes.
            </span>

            <div className="w-full flex flex-col items-start justify-center pb-6 border-b border-gray-400">

                <div className="w-full flex flex-row items-end justify-between">
                    <span className="text-[color:var(--primary)] text-lg">Color Palette</span>
                    <span className="flex flex-row items-center justify-center py-3 px-6 text-sm cursor-pointer gap-3 border border-gray-400 mt-6"
                        onClick={() => {
                            setSpin((prev) => !prev);
                            setRefresh((prev) => prev + 1);
                        }}>
                        {spin? 
                            <i className="bx bx-refresh-cw bx-spin" />
                            :
                            <i className="bx bx-refresh-cw" />
                        }
                        Generate
                    </span>

                </div>
                    
                <Palette refresh={refresh} onLoaded={() => setSpin(false)} />

                <span className='w-full text-md'>
                    Click the Generate button to create a new palette containing five colors, each color swatch displays its corresponding Hex color code beneath it.
                    Click the Copy icon next to any color to copy its Hex code to your clipboard instantly.
                </span>

            </div>

            <div className="w-full flex flex-col items-center justify-center py-6 border-b border-gray-400">

                <Picker />

            </div>

            <div className="w-full flex flex-col items-start justify-center py-6 ">

                <Convert />

            </div>

        </div>
    )
}
