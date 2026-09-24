'use client'

import Image from "next/image"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import ProfileCard from "./ProfileCard"
import { User } from "@supabase/supabase-js"
import { getCurrentUser } from "@/lib/supabase/user";

function Header() {

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const loadUser = async () => {
            const currentUser = await getCurrentUser();

            if (!currentUser) {
                return;
            }

            console.log("Current user:", currentUser);
            
            setUser(currentUser);
        };

        loadUser();
    }, []);

    const username = user?.email?.split("@")[0] || "@user";

    return (
        <section className="font-sans w-full flex flex-row items-center justify-center gap-3 p-3 border-b border-[var(--border)] bg-background sticky top-0 z-10">
            
            <div className="flex flex-row lg:items-end items-center justify-between w-full">
                <div className="flex flex-row lg:items-end items-center gap-3">   
                    <Image src="/Icon.png" height={36} width={36} alt="Huenicorn-icon" className="cursor-pointer fadeIn" />
                    <Link href="/" className="font-mono font-semibold lg:text-xl text-lg cursor-pointer text-foreground/80 hovered fadeIn">Huenicorn</Link>
                </div>

                <div className="flex flex-row items-end gap-3">
                    <ThemeToggle />
                    <ProfileCard image={<Image src="/images/profiles/profile-4.png" height={120} width={120} className="" alt=""/>} username={username || "@user"} />
                </div>

                <div className="lg:hidden flex flex-row items-center fadeIn"
                    onClick={() => setIsOpen(true)}>
                    <Menu size={22} className="text-foreground" />
                </div> 

            </div>

            <div ref={menuRef} className={`w-full h-screen lg:hidden flex flex-col items-start justify-start gap-3 
                bg-[var(--background)] fixed top-0 left-0 transition-transform duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                ${!isOpen ? "translate-x-full" : "-translate-x-0"}`}>
                
                <div className="w-full flex flex-row items-center gap-3 py-4 px-3">
                    <Image src="/Icon.png" height={32} width={32} alt="" className="cursor-pointer"/>
                    <Link href="/" className="font-mono font-semibold lg:text-xl text-lg cursor-pointer text-foreground/80 hovered fadeIn">Huenicorn</Link>   
                    <div className="ml-auto flex flex-row items-center gap-3">
                        <ThemeToggle />
                        <X className="h-6 w-6 cursor-pointer hovered" onClick={() => setIsOpen(false)}/>
                    </div> 
                </div>
                
                <div className="w-full flex flex-col items-center py-4 px-3">
                    <span className="font-sans text-md cursor-pointer hovered border-b border-foreground/20 p-3 w-full text-foreground/80">How It Works</span> 
                    <span className="font-sans text-md cursor-pointer hovered border-b border-foreground/20 p-3 w-full text-foreground/80">Docs</span> 
                    <span className="font-sans text-md cursor-pointer hovered border-b border-foreground/20 p-3 w-full text-foreground/80">About</span>
                    <span className="font-sans text-md cursor-pointer hovered border-b border-foreground/20 p-3 w-full text-foreground/80">Contact</span>  
                </div>

                <div className="w-full bg-[var(--dark)] mt-auto flex flex-row items-center gap-3 justify-between py-4 px-3">
                    <Link href="/signup"
                        className="flex-1 text-center rainbow-button font-semibold rounded-lg px-3 py-2 text-sm cursor-pointer">Get Started</Link>
                </div>

            </div>  
             

        </section>
    )

}

export default Header