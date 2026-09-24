'use client'

import Header from "@/components/landing/Header"
import Hero from "@/components/landing/Hero"
import What from "@/components/landing/What"
import Why from "@/components/landing/Why"
import CTA from "@/components/landing/Cta"
import Footer from "@/components/landing/Footer"
import { useEffect, useState } from "react"
import Loading from "./loading"

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
      <Hero />
      <What />
      <Why />
      <CTA />
      <Footer />

    </div>
  )
}

export default page