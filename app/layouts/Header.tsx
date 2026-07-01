'use client'

import { Theme } from "../components/Theme"
import Icon from "../../public/Icon.png"
import { useIsMobile } from "../hooks/useIsMobile"

type HeaderProps = {
    isDark: boolean;
    setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({isDark, setIsDark}: HeaderProps) => {

    const isMobile = useIsMobile();

    return (
        <div className={`${isDark ? "text-[var(--light)] bg-[var(--foreground)]" : "bg-[var(--secondary)] text-[var(--dark)]"}
            w-full flex flex-row items-center justify-center`}>
            
            <div className="max-w-[1080px] w-full flex flex-row items-center justify-between p-3">

                <div className="flex flex-row items-center justify-center gap-3">
                    <img src={Icon.src} className={`${isMobile? "h-9 w-9" : "h-12 w-12"}
                        cursor-pointer`} alt="Icon" />
                    <span className={`${isMobile? "text-lg" : "text-2xl"}
                        cursor-pointer hover-text`}>Huenicorn</span>
                </div>

                <div className="">
                    <Theme 
                        isDark={isDark}
                        setIsDark={setIsDark}
                        systemIcon="bx bx-desktop"
                        lightIcon="bx bx-sun"
                        darkIcon="bx bx-moon"
                    />
                </div>

            </div>

        </div>
    )
}
