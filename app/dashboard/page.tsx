'use client'

import { useState, useEffect } from "react";
import Loading from "../loading";
import Header from "./components/Header"
import { User } from "@supabase/supabase-js"
import { getCurrentUser } from "@/lib/supabase/user";
import { useRouter } from "next/navigation";
import SideNav from "./components/SideNav";
import { ColorPicker } from "./components/ColorPicker";
import { ColorPalette } from "./components/ColorPalette";
import ImageColorPicker from "./components/ImageColorPicker";
import RgbToHex from "./components/RgbToHex";
import HexToHsl from "./components/HexToHsl";
import CssColorConverter from "./components/CssColorConverter";
import { request } from "http";
import { NextResponse } from "next/server";

export type ActiveTab =
    | "color-picker"
    | "palette-generator"
    | "image-color-picker"
    | "rgb-hex"
    | "hex-hsl"
    | "css-color-converter"
    | "shades-tints"
    | "gradient-generator"
    | "random-color"
    | "image-palette-extractor"
    | "contrast-checker"
    | "color-blindness-simulator";

function page() {

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [activeTab, setActiveTab] = useState<ActiveTab>("rgb-hex");
    const router = useRouter();

   useEffect(() => {
        const loadUser = async () => {
            const currentUser = await getCurrentUser();

            if (currentUser) {
                console.log("Current user:", currentUser);
                setUser(currentUser);
            }

            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        };

        loadUser();
    }, []);
    
    if (isLoading) return (
        <Loading />
    )

    return (
        <section className="w-full flex flex-col items-center">

            <div className="max-w-[1360px] w-full flex flex-col items-center">
                
                <Header user={user} activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className="lg:h-screen h-full w-full flex flex-row gap-6">
                    <SideNav activeTab={activeTab} setActiveTab={setActiveTab} />

                    <div className="w-full flex flex-col overflow-y-auto hide-scrollbar">
                        {activeTab === "color-picker" && <ColorPicker />}
                        {activeTab === "palette-generator" && <ColorPalette />}
                        {activeTab === "image-color-picker" && <ImageColorPicker />}
                        {activeTab === "rgb-hex" && <RgbToHex />}
                        {activeTab === "hex-hsl" && <HexToHsl />}
                        {activeTab === "css-color-converter" && <CssColorConverter />}
                    </div>

                </div>

            </div>

        </section>
    )
}

export default page