'use client'

import Header from "@/components/landing/Header"
import CTA from "@/components/landing/Cta"
import Footer from "@/components/landing/Footer"

function page() {
    return (
        <section className="font-sans w-full flex flex-col items-center justify-center gap-3">

            <Header />
                
            <div className="fadeIn max-w-[1080px] w-full flex flex-col items-center justify-between mt-3 mb-6">
                
                <div className="w-full flex flex-col gap-6 px-3">

                    <span className="uppercase tracking-[0.3em] text-sm font-semibold hovered">About</span>

                    <h2 className="sm:text-4xl text-3xl font-bold tracking-tight text-foreground hovered cursor-pointer">
                        Your colorful
                        <span className="bg-gradient-to-r from-[#96B4EB] via-[#F6E06E] to-[#D789B9] bg-clip-text text-transparent">
                        {" "}creative toolbox.
                        </span>
                    </h2>

                    <p className="mx-auto sm:text-lg text-md text-foreground/60 hovered">
                        Huenicorn is a free collection of simple and powerful color tools
                        made for designers, developers, artists, and anyone who works
                        with color.
                        From creating palettes and picking colors from images to converting color formats and checking accessibility, 
                        Huenicorn brings everyday color utilities into one place.
                    </p>

                    <p className="mx-auto sm:text-lg text-md text-foreground/60 hovered">
                        I built Huenicorn with one idea in mind: working with color shouldn't feel complicated.
                        Whether you're a designer exploring a new palette, a developer looking for the right HEX value, a student learning about color, 
                        or simply someone who enjoys experimenting with colors, 
                        Huenicorn gives you practical tools to explore, create, and work with color.
                    </p>

                    <p className="mx-auto sm:text-lg text-md text-foreground/60 hovered">
                    </p>

                    <span className="text-foreground font-bold text-3xl">
                        Built for creators
                    </span>

                    <p className="mx-auto sm:text-lg text-md text-foreground/60 hovered">
                        Huenicorn is designed to be simple, fast, and easy to understand. You don't need to learn a complicated workflow just to find a color or create a palette.   
                    </p>
                    <p className="mx-auto sm:text-lg text-md text-foreground/60 hovered">
                        Use the tools freely, experiment with different combinations, and when you find something worth keeping, create an account to save your palettes, favorites, and color history.
                    </p>

                    <span className="text-foreground font-bold text-3xl">
                        My goal
                    </span>

                    <p className="sm:text-lg text-md text-foreground/60 hovered">
                        I want Huenicorn to become a useful everyday workspace for color — from the first idea to the final color value.
                    </p>

                    <p className="sm:text-lg text-md text-foreground/60 hovered">Create. Explore. Convert. Build with color.</p>
                    <p className="sm:text-lg text-md text-foreground/60 hovered">Huenicorn — your colorful creative toolbox.</p>

                </div>

            </div>

            <CTA />
            <Footer />

        </section>
    )
}

export default page