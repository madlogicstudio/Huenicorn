'use client'

import Header from "@/components/landing/Header"
import SideNav from "./components/SideNav"
import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { RiMenu3Line } from "react-icons/ri"
import Overview from "./pages/Overview"
import MobileSideNav from "./components/MobileSideNav"
import Footer from "@/components/landing/Footer"

function page() {

    const [isActive, setIsActive] = useState("Overview");
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="font-sans w-full flex flex-col items-center justify-center gap-3">

            <Header />
                
            <div className="relative fadeIn max-w-[1080px] w-full flex flex-col items-start sm:mb-6">

                <div className="flex flex-row items-center gap-1 p-2 text-md text-foreground/60">
                    <RiMenu3Line size={24} className="sm:hidden flex mr-3" 
                        onClick={() => setIsOpen((prev) => !prev)}/>
                    <span>Docs</span>
                    <ChevronRight size={12} />
                    {isActive}
                </div>

                {isOpen && <MobileSideNav setIsActive={setIsActive} isActive={isActive} setIsOpen={setIsOpen} />}

                <div className="w-full sm:flex hidden flex-row gap-3">
                    <SideNav setIsActive={setIsActive} isActive={isActive} />
                    {isActive === "Overview" && <Overview />}
                </div>

            </div>

            <div className="w-full flex sm:hidden flex-row gap-3">
                {isActive === "Overview" && <Overview />}
            </div>

            <Footer />

        </section>
    )
}

export default page