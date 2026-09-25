'use client'

import { useState, useEffect } from "react";
import Loading from "../loading";
import Header from "./components/Header"
import { User } from "@supabase/supabase-js"
import { getCurrentUser } from "@/lib/supabase/user";
import { useRouter } from "next/navigation";
import SideNav from "./components/SideNav";
import { FreeColorPicker } from "../free-tools/components/FreeColorPicker";
import { FreeColorPalette } from "../free-tools/components/FreeColorPalette";
import FreeImageColorPicker from "../free-tools/components/FreeImageColorPicker";

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
    const [activeTab, setActiveTab] = useState<ActiveTab>("color-picker");
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000)
    }, []);

    useEffect(() => {

        const loadUser = async () => {
            const currentUser = await getCurrentUser();

            if (!currentUser) {
                router.push("/")
                return;
            }

            console.log("Current user:", currentUser);
            
            setUser(currentUser);
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

                <div className="min-h-full w-full flex flex-row gap-6">
                    <SideNav activeTab={activeTab} setActiveTab={setActiveTab} />

                    <div className="w-full flex flex-col">
                        {activeTab === "color-picker" && <FreeColorPicker />}
                        {activeTab === "palette-generator" && <FreeColorPalette />}
                        {activeTab === "image-color-picker" && <FreeImageColorPicker />}
                    </div>

                </div>

            </div>

        </section>
    )
}

export default page