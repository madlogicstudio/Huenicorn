'use client'

import { useIsMobile } from "../hooks/useIsMobile"

type FooterProps = {
    isDark: boolean;
}

export const Footer = ({isDark}: FooterProps) => {
    
    const isMobile = useIsMobile();

    return (
        <div className={`${isDark ? "text-[var(--light)] bg-[var(--foreground)]" : "bg-[var(--secondary)] text-[var(--dark)]"}
            w-full flex flex-row items-center justify-center py-6`}>

            <div className={`${isMobile? "flex-col items-start justify-start gap-3" : "flex-row items-end justify-between"}
                max-w-[1080px] w-full flex p-3`}>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row items-center gap-3 hover-text cursor-pointer">
                        <i className="bx bx-copyright text-xl" />
                        <span className="text-md">2026, Huenicorn, Madlogicstudio</span>
                    </div>
                    
                    <div className="flex flex-row items-center gap-3 hover-text cursor-pointer">
                        <i className="bx bx-cup-hot text-xl" />
                        <span className="text-md">Buy me a coffee</span>
                    </div>
                </div> 

                <div className={`flex flex-row gap-3 justify-end`}>
                    <i className="bxl bx-facebook text-3xl hover-text cursor-pointer" />
                    <i className="bxl bx-messenger text-3xl hover-text cursor-pointer" />
                    <i className="bxl bx-github text-3xl hover-text cursor-pointer" />
                </div>
            </div>

        </div>
    )
}
