'use client'

import Image from "next/image"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react"
import ProfileCard from "./ProfileCard"
import { User } from "@supabase/supabase-js"
import { signOut } from "@/lib/supabase/user"
import { useRouter } from "next/navigation"
import { ActiveTab } from "../page"
import { Pipette, Palette, ImageIcon, ArrowRight, Repeat2, SwatchBook, Eclipse, Blend, Paintbrush, ImageDown  } from "lucide-react";

type HeaderProps = {
    user: User | null;
    activeTab: string;
    setActiveTab: Dispatch<SetStateAction<ActiveTab>>;
}

function Header({user, activeTab, setActiveTab}: HeaderProps) {

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    
    const handleSignOut = async () => {
        const success = await signOut();

        if (success) {
            router.push("/");
        }
    };

    const username = user?.email?.split("@")[0] || "@user";
    
    return (
        <section className="font-sans w-full flex flex-row items-center justify-center gap-3 p-3 border-b border-[var(--border)] bg-background sticky top-0 z-10">
            
            <div className="flex flex-row lg:items-end items-center justify-between w-full">
                <div className="flex flex-row lg:items-end items-center gap-3">   
                    <Image src="/Icon.png" height={36} width={36} alt="Huenicorn-icon" className="cursor-pointer fadeIn" />
                    <Link href="/" className="font-mono font-semibold lg:text-xl text-lg cursor-pointer text-foreground/80 hovered fadeIn">Huenicorn</Link>
                </div>

                <div className="lg:flex hidden flex-row items-end gap-3">
                    <ThemeToggle />
                    <ProfileCard image={<Image src="/images/profiles/profile-4.png" height={120} width={120} className="" alt=""/>} username={username || "@user"} />
                </div>

                <div className="lg:hidden flex flex-row items-center fadeIn"
                    onClick={() => setIsOpen(true)}>
                    <Menu size={22} className="text-foreground" />
                </div> 

            </div>

            <div ref={menuRef} className={`w-full h-screen lg:hidden flex flex-col items-start justify-start
                bg-[var(--background)] fixed top-0 left-0 transition-transform duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                ${!isOpen ? "translate-x-full" : "-translate-x-0"}`}>
                
                <div className="w-full flex flex-row items-center gap-3 py-4 px-3 border-b border-foreground/20">
                    <ThemeToggle />
                    <X className="ml-auto h-6 w-6 cursor-pointer hovered" onClick={() => setIsOpen(false)}/>
                </div>

                <div className="w-full flex flex-row items-end gap-3">
                    <ProfileCard image={<Image src="/images/profiles/profile-4.png" height={120} width={120} className="" alt=""/>} username={username || "@user"} />
                </div>

                <div className="h-full w-full overflow-y-scroll flex flex-col px-2">

                    <div className="font-sans w-full flex flex-col gap-2 py-3">
                        <p className="uppercase text-xs font-semibold pb-2">Main Tools</p>
                        <span className={`${activeTab === "color-picker" ? "bg-[var(--secondary)]/60 dark:bg-[var(--primary)]/80" : ""}
                            group flex items-center gap-2 px-3 py-2 rounded-md text-foreground/80 text-sm cursor-pointer`}
                            onClick={() => {
                                setActiveTab("color-picker"); 
                                setIsOpen(false);
                            }}><Pipette size={18} />Color Picker</span>
                        <span className={`${activeTab === "palette-generator" ? "bg-[var(--secondary)]/60 dark:bg-[var(--primary)]/80" : ""}
                            group flex items-center gap-2 px-3 py-2 rounded-md text-foreground/80 text-sm cursor-pointer`}
                            onClick={() => {
                                setActiveTab("palette-generator");
                                setIsOpen(false);
                            }}><Palette size={18} />Palette Generator</span>
                        <span className={`${activeTab === "image-color-picker" ? "bg-[var(--secondary)]/60 dark:bg-[var(--primary)]/80" : ""}
                            group flex items-center gap-2 px-3 py-2 rounded-md text-foreground/80 text-sm cursor-pointer`}
                            onClick={() => {
                                setActiveTab("image-color-picker");
                                setIsOpen(false);
                            }}><ImageIcon size={18} />Image Color Picker</span>    
                    </div>

                    <div className="font-sans w-full flex flex-col gap-2 py-3">
                        <p className="uppercase text-xs font-semibold pb-2">Convert</p>
                        <span className={`${activeTab === "rgb-hex" ? "bg-[var(--secondary)]/60 dark:bg-[var(--primary)]/80" : ""}
                            group flex items-center gap-2 px-3 py-2 rounded-md text-foreground/80 text-sm cursor-pointer`}
                            onClick={() => {
                                setActiveTab("rgb-hex");
                                setIsOpen(false);
                            }}><Repeat2 size={18} />RGB <ArrowRight size={12} /> HEX</span>
                        <span className={`${activeTab === "hex-hsl" ? "bg-[var(--secondary)]/60 dark:bg-[var(--primary)]/80" : ""}
                            group flex items-center gap-2 px-3 py-2 rounded-md text-foreground/80 text-sm cursor-pointer`}
                            onClick={() => {
                                setActiveTab("hex-hsl");
                                setIsOpen(false);
                            }}><Repeat2 size={18} />HEX <ArrowRight size={12} /> HSL</span>
                        <span className={`${activeTab === "css-color-converter" ? "bg-[var(--secondary)]/60 dark:bg-[var(--primary)]/80" : ""}
                            group flex items-center gap-2 px-3 py-2 rounded-md text-foreground/80 text-sm cursor-pointer`}
                            onClick={() => {
                                setActiveTab("css-color-converter");
                                setIsOpen(false);
                            }}><SwatchBook size={18} />CSS Color Converter</span>    
                    </div>

                    <div className="font-sans w-full flex flex-col gap-2 py-3">
                        <p className="uppercase text-xs font-semibold pb-2">Generate</p>
                        <span className={`${activeTab === "shades-tints" ? "bg-[var(--secondary)]/60 dark:bg-[var(--primary)]/80" : ""}
                            group flex items-center gap-2 px-3 py-2 rounded-md text-foreground/80 text-sm cursor-pointer`}
                            onClick={() => {
                                setActiveTab("shades-tints");
                                setIsOpen(false);
                            }}><Eclipse size={18} />Shades & Tints</span>
                        <span className={`${activeTab === "gradient-generator" ? "bg-[var(--secondary)]/60 dark:bg-[var(--primary)]/80" : ""}
                            group flex items-center gap-2 px-3 py-2 rounded-md text-foreground/80 text-sm cursor-pointer`}
                            onClick={() => {
                                setActiveTab("gradient-generator");
                                setIsOpen(false);
                            }}><Blend size={18} />Gradient Generator</span>
                        <span className={`${activeTab === "random-color" ? "bg-[var(--secondary)]/60 dark:bg-[var(--primary)]/80" : ""}
                            group flex items-center gap-2 px-3 py-2 rounded-md text-foreground/80 text-sm cursor-pointer`}
                            onClick={() => {
                                setActiveTab("random-color");
                                setIsOpen(false);
                            }}><Paintbrush size={18} />Random Color</span>    
                    </div>

                    <div className="font-sans w-full flex flex-col gap-2 py-3">
                        <p className="uppercase text-xs font-semibold pb-2">Extract</p>
                        <span className={`${activeTab === "image-palette-extractor" ? "bg-[var(--secondary)]/60 dark:bg-[var(--primary)]/80" : ""}
                            group flex items-center gap-2 px-3 py-2 rounded-md text-foreground/80 text-sm cursor-pointer`}
                            onClick={() => {
                                setActiveTab("image-palette-extractor");
                                setIsOpen(false);
                            }}><ImageDown size={18} />Image Palette Extractor</span>   
                    </div>

                    <div className="font-sans w-full flex flex-col gap-2 py-3">
                        <p className="uppercase text-xs font-semibold pb-2">Accessibility</p>
                        <span className={`${activeTab === "contrast-checker" ? "bg-[var(--secondary)]/60 dark:bg-[var(--primary)]/80" : ""}
                            group flex items-center gap-2 px-3 py-2 rounded-md text-foreground/80 text-sm cursor-pointer`}
                            onClick={() => {
                                setActiveTab("contrast-checker");
                                setIsOpen(false);
                            }}><Eclipse size={18} />Contrast Checker</span>
                        <span className={`${activeTab === "color-blindness-simulator" ? "bg-[var(--secondary)]/60 dark:bg-[var(--primary)]/80" : ""}
                            group flex items-center gap-2 px-3 py-2 rounded-md text-foreground/80 text-sm cursor-pointer`}
                            onClick={() => {
                                setActiveTab("color-blindness-simulator");
                                setIsOpen(false);
                            }}><Blend size={18} />Color Blindness Simulator</span>
                    </div>

                </div>

                <div className="w-full bg-[var(--dark)] mt-auto flex flex-row items-center gap-3 justify-between py-4 px-3">
                    <span className="w-full text-center rainbow-button font-semibold rounded-full px-6 py-2 text-sm cursor-pointer"
                        onClick={handleSignOut}>Log out</span>
                </div>
                
            </div>  
             

        </section>
    )

}

export default Header