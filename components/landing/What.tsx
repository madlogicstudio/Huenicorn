import { Palette, ImageIcon, RefreshCw, Accessibility, Code2 } from "lucide-react";

export default function What() {

    return (
        <section className="font-sans w-full flex flex-row items-center justify-center gap-3 p-3">
                
            <div className="max-w-[1080px] w-full flex flex-col items-center justify-between my-3">

                <div className="mx-auto max-w-3xl text-center">

                    <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground hovered cursor-pointer">
                        Your colorful
                        <span className="bg-gradient-to-r from-[#96B4EB] via-[#F6E06E] to-[#D789B9] bg-clip-text text-transparent">
                        {" "}creative toolbox.
                        </span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-foreground/60 sm:text-lg hovered">
                        Huenicorn is a free collection of simple and powerful color tools
                        made for designers, developers, artists, and anyone who works
                        with color.
                    </p>

                </div>

                <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">

                    <div className="relative">

                        <div className="relative bg-[var(--card)] overflow-hidden rounded-lg border border-foreground/20 p-5 shadow-xl py-12">

                            <div className="flex items-center justify-between border-b border-foreground/20 pb-4">

                                <div className="flex flex-col gap-1">
                                    <p className="font-sans text-sm text-foreground/60">
                                        HUENICORN
                                    </p>

                                    <p className="mt-1 text-md font-semibold text-foreground">
                                        Color Workspace
                                    </p>
                                </div>

                                <div className="flex gap-1.5">
                                    <div className="h-3 w-3 rounded-full bg-[#96B4EB]" />
                                    <div className="h-3 w-3 rounded-full bg-[#F6E06E]" />
                                    <div className="h-3 w-3 rounded-full bg-[#D789B9]" />
                                </div>
                            </div>

                            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">

                                <div className="group rounded-lg bg-[#96B4EB]/60 p-4 transition-transform duration-300 hover:-translate-y-1 
                                    text-foreground/80 cursor-pointer">
                                    <Palette size={24} />
                                    <p className="font-sans mt-12 text-sm font-semibold">
                                        Generate
                                    </p>
                                </div>

                                <div className="group rounded-lg bg-[#F6E06E]/60 p-4 transition-transform duration-300 hover:-translate-y-1 
                                    text-foreground/80 cursor-pointer">
                                    <ImageIcon size={24} />
                                    <p className="font-sans mt-12 text-sm font-semibold">
                                        Extract
                                    </p>
                                </div>

                                <div className="group rounded-lg bg-[#D789B9]/60 p-4 transition-transform duration-300 hover:-translate-y-1 
                                    text-foreground/80 cursor-pointer">
                                    <RefreshCw size={24} />
                                    <p className="font-sans mt-12 text-sm font-semibold">
                                        Convert
                                    </p>
                                </div>

                                <div className="group rounded-lg bg-[#C2B2EB]/60 p-4 transition-transform duration-300 hover:-translate-y-1 
                                    text-foreground/80 cursor-pointer">
                                    <Code2 size={24} />
                                    <p className="font-sans mt-12 text-sm font-semibold">
                                        Build
                                    </p>
                                </div>

                            </div>

                            <div className="mt-5 flex items-center justify-between rounded-lg bg-background p-4">
                                <div className="flex flex-col gap-1">
                                    <p className="font-sans text-sm text-foreground/40">
                                        Your color workflow
                                    </p>

                                    <p className="font-sans mt-1 text-sm font-semibold text-foreground">
                                        Explore. Create. Refine.
                                    </p>
                                </div>

                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#96B4EB] via-[#F6E06E] to-[#D789B9]" />
                                
                            </div>

                            <div className="sm:absolute hidden -bottom-8 -left-8 -z-10 h-24 w-24 rounded-full bg-[#96B4EB]/30 blur-2xl" />
                            <div className="sm:absolute hidden -right-8 -top-8 -z-10 h-24 w-24 rounded-full bg-[#D789B9]/30 blur-2xl" />

                        </div>

                    </div>

                    <div className="lg:pl-8">

                        <h3 className="group sm:text-4xl flex flex-col gap-3 text-3xl font-bold tracking-tight text-foreground
                            lg:text-left text-center hovered cursor-pointer">
                            Everything you need to
                            <br />
                            <span className="rainbow-text">
                                work with color.
                            </span>
                        </h3>

                        <p className="mt-5 text-base leading-7 text-foreground/60 lg:text-left text-center">
                            From finding the perfect palette to preparing colors for your
                            next website, Huenicorn brings useful color utilities together
                            in one place.
                        </p>

                        <div className="mt-8 space-y-6">

                            <div className="flex sm:flex-row flex-col lg:items-start items-center gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#96B4EB]/20">
                                    <Palette size={24} className="text-[#5578C9]"/>
                                </div>

                                <div className="lg:text-left text-center ">
                                    <h4 className="font-sans text-lg font-semibold text-foreground">
                                        Create color palettes
                                    </h4>
                                    <p className="font-sans mt-1 text-md leading-6 text-foreground/55 sm:w-auto w-60">
                                        Generate fresh color combinations and discover palettes that work together.
                                    </p>
                                </div>
                            </div>

                            <div className="flex sm:flex-row flex-col lg:items-start items-center gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#96B4EB]/20">
                                    <ImageIcon size={24} className="text-[#5578C9]"/>
                                </div>

                                <div className="lg:text-left text-center ">
                                    <h4 className="font-sans tetx-lg font-semibold text-foreground">
                                        Pick colors from images
                                    </h4>
                                    <p className="font-sans mt-1 text-md leading-6 text-foreground/55 sm:w-auto w-60">
                                        Upload an image and find colors that inspire your next design.
                                    </p>
                                </div>
                            </div>

                            <div className="flex sm:flex-row flex-col lg:items-start items-center gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#96B4EB]/20">
                                    <RefreshCw size={24} className="text-[#5578C9]"/>
                                </div>

                                <div className="lg:text-left text-center ">
                                    <h4 className="font-sans text-lg font-semibold text-foreground">
                                        Convert with ease
                                    </h4>
                                    <p className="font-sans mt-1 text-md leading-6 text-foreground/55 sm:w-auto w-60">
                                        Quickly switch between HEX, RGB, HSL, and other useful color formats.
                                    </p>
                                </div>
                            </div>

                            <div className="flex sm:flex-row flex-col lg:items-start items-center gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#96B4EB]/20">
                                    <Accessibility size={24} className="text-[#5578C9]"/>
                                </div>

                                <div className="lg:text-left text-center ">
                                    <h4 className="font-sans text-lg font-semibold text-foreground">
                                        Design with confidence
                                    </h4>
                                    <p className="font-sans mt-1 text-md leading-6 text-foreground/55 sm:w-auto w-60">
                                        Check contrast and explore accessibility-focused color tools for more usable designs.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

}