'use client'

import Header from "@/components/landing/Header"
import Footer from "@/components/landing/Footer"
import { FreeColorPicker } from "./components/FreeColorPicker"
import { FreeColorPalette } from "./components/FreeColorPalette"
import FreeImageColorPicker from "./components/FreeImageColorPicker"
import CTA from "@/components/landing/Cta"

function page() {

    return (
        <div className="w-full flex flex-col items-center"> 
            <Header />  
            <div className="max-w-[1080px] w-full">

                <div className="flex flex-col gap-3 px-3 py-6">
                    <div className='flex lg:flex-row flex-col gap-3'>
                        <span className="fadeIn font-sans font-bold text-4xl text-left cursor-pointer text-foreground hovered">Your Colors</span>
                        <span className="fadeIn font-sans font-bold text-4xl text-left cursor-pointer rainbow-text">Simplified</span>
                    </div>
                    
                    <span className="fadeIn flex font-sans font-semibold text-md text-left cursor-pointer text-foreground/60 hovered">
                        Generate palettes, extract colors, convert formats, check accessibility,  and build CSS-ready color tools.   
                    </span>
                </div>
                

                <FreeImageColorPicker />
                <FreeColorPalette />
                <FreeColorPicker />
                
            </div>
            <CTA />
            <Footer />  
        </div>
        
    )
}

export default page