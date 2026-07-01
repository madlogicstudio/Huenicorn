'use client'

import { useState } from "react";

type ThemeProps = {
    systemIcon: string;
    lightIcon: string;
    darkIcon: string;
    isDark: boolean;
    setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Theme = ({systemIcon, darkIcon, lightIcon, isDark, setIsDark}: ThemeProps) => {

    const [isActive, setIsActive] = useState("system");
    
    return (
        <div className={`${isDark ? "text-[var(--light)] bg-[var(--dark)]" : "bg-[var(--light)] text-[var(--dark)]"}
            flex flex-row items-center justify-center p-[0.3em]  gap-[0.3em] rounded-full border border-gray-400`}>

            <i className={`${systemIcon} text-md p-[0.3em] rounded-full cursor-pointer hovered
                ${isActive === "system" ? "bg-gray-400" : "bg-transparent"}`}
                onClick={() => setIsActive("system")}/>
            <i className={`${lightIcon} text-md p-[0.3em] rounded-full cursor-pointer hovered
                ${isActive === "light" ? "bg-gray-400" : "bg-transparent"}`}
                onClick={() => {
                    setIsDark(false) 
                    setIsActive("light")}}/>
            <i className={`${darkIcon} text-md p-[0.3em] rounded-full cursor-pointer hovered
                ${isActive === "dark" ? "bg-gray-400" : "bg-transparent"}`}
                onClick={() => {
                    setIsDark(true) 
                    setIsActive("dark")}}/>

        </div>
    )
}
