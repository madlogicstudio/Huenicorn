'use client'

import { useState, useEffect } from "react";
import Loading from "../loading";
import Header from "./components/Header"

function page() {

    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000)
    }, [])

    if (isLoading) return (
        <Loading />
    )

    return (
        <div className="w-full flex flex-col items-center">

            <Header />
            
        </div>
    )
}

export default page