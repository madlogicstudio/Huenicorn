'use client'

import Header from "@/components/landing/Header"
import Footer from "@/components/landing/Footer"
import { FreeColorPicker } from "./components/FreeColorPicker"
import { FreeColorPalette } from "./components/FreeColorPalette"
import FreeImageColorPicker from "./components/FreeImageColorPicker"
import CTA from "@/components/landing/Cta"
import { useState } from "react"

function page() {

    const [activeTab, setActiveTab] = useState("color-picker");

    return (
        <div className="font-sans w-full flex flex-col items-center">
            <Header />  
            <div className="max-w-[1080px] w-full">

                <div className="flex flex-col gap-3 px-3 pt-6 pb-3">
                    <div className='flex lg:flex-row flex-col gap-3'>
                        <span className="fadeIn font-sans font-bold text-4xl text-left cursor-pointer text-foreground hovered">Your Colors</span>
                        <span className="fadeIn font-sans font-bold text-4xl text-left cursor-pointer rainbow-text">Simplified</span>
                    </div>
                    
                    <span className="fadeIn flex font-sans font-semibold text-md text-left cursor-pointer text-foreground/60 hovered">
                        Generate palettes, extract colors, convert formats, check accessibility,  and build CSS-ready color tools.   
                    </span>
                </div>
                
                
                <div className="flex flex-row items-center justify-start gap-3 p-3 flex-wrap sm:mb-0 mb-3">
                    
                    <span className={`${activeTab === "color-picker" ? "dark:bg-foreground/20 bg-foreground/10" : "bg-[var(--card)]"} 
                        font-semibold text-sm text-[var(--primary)] px-6 py-2 rounded-full cursor-pointer`}
                        onClick={() => setActiveTab("color-picker")}>Color Picker</span>
                    <span className={`${activeTab === "image-color-picker" ? "dark:bg-foreground/20 bg-foreground/10" : "bg-[var(--card)]"} 
                        font-semibold text-sm text-[var(--primary)] px-6 py-2 rounded-full cursor-pointer`}
                        onClick={() => setActiveTab("image-color-picker")}>Image Color Picker</span>
                    <span className={`${activeTab === "palette-generator" ? "dark:bg-foreground/20 bg-foreground/10" : "bg-[var(--card)]"} 
                        font-semibold text-sm text-[var(--primary)] px-6 py-2 rounded-full cursor-pointer`}
                        onClick={() => setActiveTab("palette-generator")}>Color Palette Generator</span>
                
                </div>

                {activeTab === "image-color-picker" && <FreeImageColorPicker />}
                {activeTab === "palette-generator" && <FreeColorPalette />}
                {activeTab === "color-picker" && <FreeColorPicker />}
                
            </div>
            <CTA />
            <Footer />  
        </div>
        
    )
}

export default page