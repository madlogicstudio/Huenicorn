'use client'

import { UserIcon, EditIcon } from "lucide-react"
import { useState } from "react";
import { signOut } from "@/lib/supabase/user";
import { useRouter } from "next/navigation";

type HeaderProps = {
    image: any;
    username: string;
}

function ProfileCard({image, username}: HeaderProps) {

    const [isActive, setIsActive] = useState(false);
    const router = useRouter();

    const handleSignOut = async () => {
        const success = await signOut();

        if (success) {
            router.push("/");
        }
    };

    return (
        <div className="relative flex flex-col lg:w-auto w-full lg:items-start items-center gap-3">
            
            {image? 
                <div className={`${isActive ? "border-2 border-foreground/20 transition duration-300 ease-in-out" : ""}
                    lg:flex hidden items-center justify-center h-8 w-8 dark:bg-foreground/10 bg-foreground/10 rounded-full overflow-hidden cursor-pointer`}
                    onClick={() => setIsActive((prev) => !prev)}>
                    {image}
                </div>
                    : 
                <div className="h-8 w-8 dark:bg-foreground/10 bg-foreground/10 p-2 rounded-full cursor-pointer"
                    onClick={() => setIsActive((prev) => !prev)}>
                    <UserIcon className={`size-5 text-foreground/60`} />
                </div>
            }

            {isActive && <div className="fadeIn h-[260px] w-[260px] absolute top-10 right-0 rounded-lg bg-[var(--card)] 
                border border-foreground/20 flex flex-col items-center justify-center gap-6">
                
                <div className="flex flex-col gap-3 items-center">

                    {image? 
                        <div className={`relative flex items-center justify-center h-24 w-24 dark:bg-foreground/10 bg-foreground/10 
                            rounded-full inset-0 z-0`}
                            onClick={() => setIsActive((prev) => !prev)}>
                            {image}
                            <div className="absolute bottom-[-6] right-[-6] drop-shadow-md p-2 bg-[var(--primary)] rounded-full cursor-pointer"
                                onClick={() => alert("Edit icon")}>
                                <EditIcon className=" h-4 w-4 text-white" />
                            </div>
                            
                        </div>
                            : 
                        <div className="h-8 w-8 dark:bg-foreground/10 bg-foreground/10 p-2 rounded-full cursor-pointer"
                            onClick={() => setIsActive((prev) => !prev)}>
                            <UserIcon className={`size-5 text-foreground/60`} />
                        </div>
                    }
                    <span className="text-md text-foreground/80">{username}</span> 

                </div>
                
                <span className="text-center rainbow-button font-semibold rounded-full px-6 py-2 text-sm cursor-pointer"
                    onClick={handleSignOut}>Log out</span>

            </div>}


            <div className="lg:hidden w-full flex flex-col gap-3 items-center justify-center">
            
                {image? 
                    <div className="w-full flex flex-row items-center gap-3 border-b border-foreground/20 p-3">
                        <div className={`flex items-center justify-center h-10 w-10 dark:bg-foreground/10 bg-foreground/10 rounded-full`}>
                            {image}
                        </div>
                        <span className="text-md text-foreground/80">{username}</span> 
                        <div className="ml-auto cursor-pointer"
                            onClick={() => alert("Edit icon")}>
                            <EditIcon className=" h-4 w-4 text-[var(--primary)]" />
                        </div>
                    </div>
                        : 
                    <div className="h-8 w-8 dark:bg-foreground/10 bg-foreground/10 p-2 rounded-full cursor-pointer"
                        onClick={() => setIsActive((prev) => !prev)}>
                        <UserIcon className={`size-5 text-foreground/60`} />
                    </div>
                }

            </div>

        </div>
    )
}

export default ProfileCard