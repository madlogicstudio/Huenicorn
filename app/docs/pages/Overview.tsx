'use client'

function Overview() {
    return (
        <div className="flex-1 flex flex-col gap-6 px-3 py-6">

            <h2 className="sm:text-4xl text-3xl font-bold tracking-tight text-foreground hovered cursor-pointer">
                Colors made
                <span className="bg-gradient-to-r from-[#96B4EB] via-[#F6E06E] to-[#D789B9] bg-clip-text text-transparent">
                {" "}Simple.
                </span>
            </h2>

            <p className="sm:text-lg text-md text-foreground/60 hovered">
                Welcome to Huenicorn Docs — a simple guide to getting the most out of Huenicorn's color tools. Learn how each tool works, 
                understand common color formats, and discover ways to build better palettes for your projects.
            </p>

        </div>
    )
}

export default Overview