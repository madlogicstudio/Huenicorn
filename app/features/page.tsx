'use client'

import Header from "@/components/landing/Header"
import CTA from "@/components/landing/Cta"
import Footer from "@/components/landing/Footer"
import { Sparkles, Palette, Image, Bookmark, UserRound, SwatchBook, Heart, RotateCcwClock, Zap, MousePointer2 } from "lucide-react"

function page() {
    return (
        <section className="font-sans w-full flex flex-col items-center justify-center gap-3">

            <Header />
                
            <div className="fadeIn max-w-[1080px] w-full flex flex-col items-center justify-between px-3 mt-3 mb-6">
                
                <div className="w-full flex flex-col flex-start gap-6">

                    <span className="uppercase tracking-[0.3em] text-sm font-semibold hovered">Features</span>

                    <h2 className="sm:text-4xl text-3xl font-bold tracking-tight text-foreground hovered cursor-pointer">
                        More than just
                        <span className="bg-gradient-to-r from-[#96B4EB] via-[#F6E06E] to-[#D789B9] bg-clip-text text-transparent">
                        {" "}color tools.
                        </span>
                    </h2>

                    <p className="sm:text-lg text-md text-foreground/60 hovered">
                        Huenicorngives you a simple worskpace for discovering colors, creating palettes, and keeping your favorite ideas organized.
                    </p>

                </div>

                <div className="sm:h-[420px] h-[660px] w-full bg-[var(--primary)]/20 dark:bg-[#96B4EB] rounded-lg my-6 border border-transparent
                    hover:shadow-lg hover:-translate-y-1 transition cursor-pointer hover:border-foreground/10 relative flex sm:flex-row flex-col gap-6 p-6 overflow-hidden">
                        
                    <div className="h-16 w-16 p-3 bg-[#FDFDFD] rounded-lg flex flex-col items-center justify-center">
                        <Sparkles size={32} className="text-[var(--primary)]" />
                    </div>

                    <div className="flex flex-col gap-3">

                        <span className="uppercase tracking-[0.3em] text-sm text-[var(--primary)] font-semibold hovered dark:text-foreground">Create</span>
                        <h2 className="sm:text-3xl text-2xl font-bold tracking-tight text-foreground hovered cursor-pointer">Turn ideas into color</h2>
                        <p className="sm:text-lg text-md text-foreground/60 hovered">
                            Start with a color, an image or an idea and explore combinations that fits your creative direction.
                        </p>

                    </div>

                    <div className="bg-white h-[420px] sm:w-[90%] w-[96%] absolute top-1/2 left-1/2 -translate-x-1/2 -mt-6 rounded-lg p-6 
                        flex flex-col items-start gap-3">
                        
                        <div className="flex sm:flex-row flex-col gap-3 text-sm">
                            <div className="flex flex-row items-center gap-3">
                                <span className="group flex flex-row items-center gap-3 text-[var(--primary)] rounded-full px-4 py-2 border-2 border-[var(--primary)]">
                                    <div className="rounded-full p-2 bg-[var(--primary)]"/>
                                    Color Picker
                                </span>
                            </div>
                            <div className="flex flex-row items-center gap-3">
                                <span className="group flex flex-row items-center gap-3 text-[var(--primary)] rounded-full px-4 py-2 border border-[var(--primary)]">
                                    <Palette size={24} />
                                    Color Palette Generator
                                </span>
                            </div>
                            <div className="flex flex-row items-center gap-3">
                                <span className="group flex flex-row items-center gap-3 text-[var(--primary)] rounded-full px-4 py-2 border border-[var(--primary)]">
                                    <Image size={24} />
                                    Image Color Picker
                                </span>
                            </div>
                        </div>

                        <input placeholder="Sunset, Calm, Modern" className="p-3 border border-[var(--primary)] text-sm rounded-lg my-3 w-full outline-none" />
                        

                        <div className="flex flex-col my-3">
                            <div className="flex flex-row items-center gap-3">
                                <span className="group text-sm flex flex-row items-center gap-3 text-[#FDFDFD] bg-[#96B4EB] font-semibold rounded-full px-6 py-3 border border-[var(--primary)]">
                                    <Sparkles size={20} />
                                    Generate Palette
                                </span>
                            </div>
                        </div>

                    </div>

                </div>

                <div className="fadeIn h-auto w-full bg-[var(--primary)]/30 dark:bg-[var(--primary)] rounded-lg my-6 border border-transparent
                    hover:shadow-lg hover:-translate-y-1 transition cursor-pointer hover:border-foreground/10 relative flex sm:flex-row flex-col gap-6 p-6 overflow-hidden">
                        
                    <div className="h-16 w-16 p-3 bg-[#FDFDFD] rounded-lg flex flex-col items-center justify-center">
                        <RotateCcwClock size={32} className="text-[var(--primary)]" />
                    </div>

                    <div className="flex flex-col gap-3">

                        <span className="uppercase tracking-[0.3em] text-sm text-[var(--primary)] font-semibold hovered dark:text-foreground">History</span>
                        <h2 className="sm:text-3xl text-2xl font-bold tracking-tight text-foreground hovered cursor-pointer">Never lose your color trail</h2>
                        <p className="sm:text-lg text-md text-foreground/60 hovered">
                            Your creative process doesn't always  happen in one sitting. Keep track of previous palettes  and colors so you can return to an idea whenever inspiration strikes. 
                        </p>
                        <div className="my-3 flex sm:flex-row flex-col sm:items-center flex-start gap-3">
                            <span className="bg-[#FDFDFD] border border-[var(--primary)] text-[var(--primary)] px-6 py-2 rounded-full text-center">
                                Palette history
                            </span>
                            <span className="bg-[#FDFDFD] border border-[var(--primary)] text-[var(--primary)] px-6 py-2 rounded-full text-center">
                                Saved colors
                            </span>
                            <span className="bg-[#FDFDFD] border border-[var(--primary)] text-[var(--primary)] px-6 py-2 rounded-full text-center">
                                Paersonal workspace
                            </span>
                        </div>

                    </div>

                </div>

                <div className="fadeIn sm:h-[420px] h-[740px] w-full bg-[var(--accent)]/30 dark:bg-[#D789B9] rounded-lg my-6 border border-transparent
                    hover:shadow-lg hover:-translate-y-1 transition cursor-pointer hover:border-foreground/10 relative flex sm:flex-row flex-col gap-6 p-6 overflow-hidden">
                        
                    <div className="h-16 w-16 p-3 bg-[#FDFDFD] rounded-lg flex flex-col items-center justify-center">
                        <Bookmark size={32} className="text-[var(--primary)]" />
                    </div>

                    <div className="flex flex-col gap-3">

                        <span className="uppercase tracking-[0.3em] text-sm text-[var(--accent)] font-semibold hovered dark:text-foreground">Workspace</span>
                        <h2 className="sm:text-3xl text-2xl font-bold tracking-tight text-foreground hovered cursor-pointer">Keep the colors you love</h2>
                        <p className="sm:text-lg text-md text-foreground/60 hovered">
                            Sign in to save palettes and favorite colors so your best combinations are always within reach.
                        </p>

                    </div>

                    <div className="bg-white sm:h-[420px] h-[460px] sm:w-[90%] w-[96%] absolute sm:top-1/2 top-1/2 left-1/2 -translate-x-1/2 -mt-6 rounded-lg p-6 
                        flex sm:flex-row flex-col items-start gap-3 overflow-y-hidden">

                        <div className="sm:border-l border-b sm:h-360 h-auto border-foreground/10 sm:flex-1 w-full sm:p-3 pb-3 flex sm:hidden flex-col">
                            
                            <div className="flex flex-row items-center gap-3">
                                <div className="bg-[var(--primary)] h-8 w-8 rounded-full flex flex-col items-center justify-center">
                                    <UserRound size={24} className="text-white" />
                                </div>
                                
                                <span className="text-md text-foreground/60">@username</span>
                            </div>
                            
                            <div className="p-3 bg-[var(--primary)]/20 rounded-lg mt-6">
                                <span className="group text-sm flex flex-row items-center gap-3 text-[var(--primary)] font-semibold rounded-full">
                                    <SwatchBook size={20} />
                                    My Palettes
                                </span>
                            </div>
                            <div className="p-3 rounded-lg">
                                <span className="group text-sm flex flex-row items-center gap-3 text-[var(--primary)] font-semibold rounded-full">
                                    <Heart size={20} />
                                    Favorites
                                </span>
                            </div>
                            <div className="p-3 rounded-lg">
                                <span className="group text-sm flex flex-row items-center gap-3 text-[var(--primary)] font-semibold rounded-full">
                                    <RotateCcwClock size={20} />
                                    History
                                </span>
                            </div>

                        </div>
                        
                        <div className="h-360 w-full flex-3 flex flex-col gap-3">

                            <p className="sm:text-lg text-md text-foreground/80 font-semibold">My Palettes</p>

                            <div className="border border-foreground/10 sm:flex hidden flex-col gap-3 p-3 overflow-hidden">

                                <div className="flex flex-row gap-3">
                                    <div className="h-24 w-24 bg-[var(--primary)] rounded-lg" />
                                    <div className="h-24 w-24 bg-[var(--secondary)] rounded-lg" />
                                    <div className="h-24 w-24 bg-[var(--accent)] rounded-lg" />
                                    <div className="h-24 w-24 bg-[var(--border)] rounded-lg" />
                                    <div className="h-24 w-24 bg-[var(--foreground)] rounded-lg" />
                                    <div className="h-24 w-24 bg-orange-300 rounded-lg" />
                                </div>

                                <div className="flex flex-row gap-3">

                                    <div className="w-full flex flex-row items-center justify-between">
                                        <p className="sm:text-lg text-md text-foreground/80 font-semibold">New Palette</p>
                                        <Heart size={20} className="text-foreground/80" />
                                    </div>

                                </div>

                            </div>

                            <div className="border border-foreground/10 sm:hidden flex flex-col gap-3 p-3 overflow-hidden w-full">

                                <div className="flex flex-row gap-3">
                                    <div className="h-18 w-full bg-[var(--primary)] rounded-lg" />
                                    <div className="h-18 w-full bg-[var(--secondary)] rounded-lg" />
                                    <div className="h-18 w-full bg-[var(--accent)] rounded-lg" />
                                </div>
                                <div className="flex flex-row gap-3">
                                    <div className="h-18 w-full bg-[var(--border)] rounded-lg" />
                                    <div className="h-18 w-full bg-[var(--foreground)] rounded-lg" />
                                    <div className="h-18 w-full bg-orange-300 rounded-lg" />
                                </div>

                                <div className="flex flex-row gap-3">

                                    <div className="w-full flex flex-row items-center justify-between">
                                        <p className="sm:text-lg text-md text-foreground/80 font-semibold">Hello</p>
                                        <Heart size={18} className="text-foreground/80" />
                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="sm:border-l border-b sm:h-360 h-auto border-foreground/10 sm:flex-1 w-full p-3 sm:flex hidden flex-col ">
                            
                            <div className="flex flex-row items-center gap-3">
                                <div className="bg-[var(--primary)] h-8 w-8 rounded-full flex flex-col items-center justify-center">
                                    <UserRound size={24} className="text-white" />
                                </div>
                                
                                <span className="text-md text-foreground/60">@username</span>
                            </div>
                            
                            <div className="p-3 bg-[var(--primary)]/20 rounded-lg mt-6">
                                <span className="group text-sm flex flex-row items-center gap-3 text-[var(--primary)] font-semibold rounded-full">
                                    <SwatchBook size={20} />
                                    My Palettes
                                </span>
                            </div>
                            <div className="p-3 rounded-lg">
                                <span className="group text-sm flex flex-row items-center gap-3 text-[var(--primary)] font-semibold rounded-full">
                                    <Heart size={20} />
                                    Favorites
                                </span>
                            </div>
                            <div className="p-3 rounded-lg">
                                <span className="group text-sm flex flex-row items-center gap-3 text-[var(--primary)] font-semibold rounded-full">
                                    <RotateCcwClock size={20} />
                                    History
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="fadeIn w-full p-3 my-6 flex sm:flex-row flex-col items-center sm:justify-around justify-center sm:gap-0 gap-6">

                    <div className="sm:w-auto w-full flex flex-row gap-3">
                        <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-[var(--primary)]">
                            <Zap size={24} className="text-[#FDFDFD]" />
                        </div>
                        <div className="flex flex-col text-md gap-1">
                            <span className="text-foreground/80 font-semibold">Fast workflow</span>
                            <span className="text-foreground/60">Less switching more creating</span>
                        </div>
                    </div>

                    <div className="sm:w-auto w-full flex flex-row gap-3">
                        <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-[var(--secondary)]">
                            <Palette size={24} className="text-[#FDFDFD]" />
                        </div>
                        <div className="flex flex-col text-md gap-1">
                            <span className="text-foreground/80 font-semibold">Built around color</span>
                            <span className="text-foreground/60">Tools that works together</span>
                        </div>
                    </div>

                    <div className="sm:w-auto w-full flex flex-row gap-3">
                        <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-[var(--accent)]">
                            <MousePointer2 size={24} className="text-[#FDFDFD]" />
                        </div>
                        <div className="flex flex-col text-md gap-1">
                            <span className="text-foreground/80 font-semibold">Easy to use</span>
                            <span className="text-foreground/60 ">Designed for everyone</span>
                        </div>
                    </div>

                </div>

            </div>
            
            <CTA />
            <Footer />

        </section>
    )
}

export default page