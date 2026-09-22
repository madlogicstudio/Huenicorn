'use client'

import Image from "next/image"
import { ArrowRight } from "lucide-react"

function Hero() {

  return (
    <section className="w-full flex flex-row items-center justify-center gap-3 p-3">
            
        <div className="lg:h-[600px] h-auto max-w-[1080px] w-full flex lg:flex-row flex-col items-center justify-between lg:gap-0 gap-6 py-6">

            <div className='flex-1 flex flex-col lg:items-start items-center gap-6 '>
                <div className='flex flex-col gap-3'>
                    <span className="fadeIn font-sans font-bold sm:text-6xl text-5xl lg:text-left text-center cursor-pointer text-foreground hovered">Your Colors</span>
                    <span className="fadeIn font-sans font-bold sm:text-6xl text-5xl lg:text-left text-center cursor-pointer rainbow-text">Simplified</span>
                </div>
                
                <span className="fadeIn lg:flex hidden font-sans font-semibold lg:text-lg text-md lg:text-left text-center cursor-pointer text-foreground/60 hovered">
                    Generate palettes, extract colors, convert formats, check accessibility,  and build CSS-ready color tools.   
                </span>

                <div className="fadeIn lg:flex hidden w-38 items-center justify-between gap-1 text-foreground/80 button-hovered border border-foreground/20 px-4 py-2 rounded-full cursor-pointer
                    hover:text-[#5578C9] hover:border-transparent mb-6">
                    <span className="font-sans font-semibold text-sm ">
                        Explore Tools
                    </span>
                    <ArrowRight size={16} className="" />
                </div>

            </div>

            <div className='relative flex-1 lg:flex hidden flex-col items-center justify-center gap-3 rounded-lg bg-[var(--secondary)]/80'>
                <Image src="/Icon.png" height={320} width={320} alt="Huenicorn-icon" className="cursor-pointer scale-125 idle-float" />
                <div className="sm:absolute hidden -bottom-8 -right-8 -z-10 h-24 w-24 rounded-full bg-[#96B4EB]/30 blur-2xl" />
                <div className="sm:absolute hidden -left-8 -top-8 -z-10 h-24 w-24 rounded-full bg-[#D789B9]/30 blur-2xl" />
            </div>

            <div className='flex-1 w-[80%] lg:hidden flex flex-col items-center justify-center gap-3 rounded-lg bg-[var(--secondary)]/80 my-6'>
                <Image src="/Icon.png" height={180} width={180} alt="Huenicorn-icon" className="cursor-pointer scale-125 idle-float" />
            </div>

            <span className="fadeIn lg:hidden flex font-sans font-semibold lg:text-lg text-md lg:text-left text-center cursor-pointer text-foreground/60 hovered">
                Generate palettes, extract colors, convert formats, check accessibility,  and build CSS-ready color tools.   
            </span>

            <div className="fadeIn lg:hidden flex w-38 items-center justify-between gap-1 text-foreground/80 button-hovered 
                border border-foreground/20 px-4 py-2 rounded-full cursor-pointer hover:text-[#5578C9] hover:border-transparen mt-6">
                <span className="font-sans font-semibold text-sm ">
                    Explore Tools
                </span>
                <ArrowRight size={16} className="" />
            </div>

        </div>

    </section>
  )

}

export default Hero