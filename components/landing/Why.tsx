'use client'

import { Sparkles, Zap, Heart, Code2, ShieldCheck, MousePointer2 } from "lucide-react";

export default function Why() {

    const reasons = [
        {
            icon: Sparkles,
            title: "Simple by design",
            description: "No complicated controls or overwhelming interfaces. Huenicorn keeps color tools simple so you can focus on creating.",
            color: "#96B4EB",
        },
        {
            icon: Zap,
            title: "Fast & practical",
            description: "Generate palettes, convert colors, and explore different color values without jumping between multiple websites.",
            color: "#F6E06E",
        },
        {
            icon: Heart,
            title: "Free to use",
            description: "Huenicorn is built to make useful color tools accessible without requiring a subscription or paid plan.",
            color: "#D789B9",
        },
        {
            icon: MousePointer2,
            title: "Create your workspace",
            description: "Use Huenicorn freely, then sign in when you want to save palettes, favorites, and your color history.",
            color: "#5578C9",
        },
        {
            icon: Code2,
            title: "Built for creators",
            description: "Whether you're designing a website, creating an app, or writing CSS, Huenicorn gives you developer-friendly color utilities.",
            color: "#B35D91",
        },
        {
            icon: ShieldCheck,
            title: "Work with confidence",
            description: "Explore contrast, color relationships, and different formats to make more informed color choices.",
            color: "#96B4EB",
        },
    ];

    return (
        <section className="w-full flex flex-row items-center justify-center gap-3 p-3">
                
            <div className="max-w-[1080px] w-full flex flex-col items-center justify-between my-3">

                <div className="relative mx-auto max-w-7xl px-3 lg:px-8">
                    
                    <div className="mx-auto text-center">

                        <h2 className="group flex flex-col gap-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl hovered cursor-pointer">
                            Color tools without
                            <span className="block rainbow-text">
                            the unnecessary complexity.
                            </span>
                        </h2>

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-foreground/60 sm:text-lg">
                            Huenicorn brings everyday color utilities into one simple
                            workspace so you can spend less time searching for tools and more
                            time creating.
                        </p>

                    </div>

                    
                    <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {reasons.map((reason) => {
                            const Icon = reason.icon;

                            return (
                                <div key={reason.title} className="group relative bg-[var(--card)] overflow-hidden rounded-lg border border-foreground/20 bg-card p-6 
                                    transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                                    
                                    <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-10 blur-3xl transition-opacity duration-300 group-hover:opacity-25"
                                        style={{ backgroundColor: reason.color }}/>

                                    <div className="relative flex flex-col lg:items-start items-center">
                                        
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-foreground/20" 
                                            style={{ backgroundColor: `${reason.color}25`, }}>
                                            <Icon size={24} style={{ color: reason.color }} />
                                        </div>

                                        <h3 className="mt-6 text-lg font-bold text-foreground">
                                            {reason.title}
                                        </h3>

                                        <p className="mt-2 text-md leading-6 text-foreground/55 lg:text-left text-center">
                                            {reason.description}
                                        </p>
                                    </div>

                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );

}