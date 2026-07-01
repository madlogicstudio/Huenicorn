'use client'

import { useEffect, useState } from "react"
import { Header } from "./layouts/Header";
import { Content } from "./layouts/Content";
import { Footer } from "./layouts/Footer";
import { WanderingEyes } from "./components/Spinner";

function page() {

  const [isDark, setIsDark] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const loadingArr = ["Analyzing colors ...", "Building your palette ...", "Almost ready ..."];
  const [loadingText, setLoadingText] = useState(loadingArr[0]);

  useEffect(() => {

    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % loadingArr.length;
      setLoadingText(loadingArr[index]);
    }, 2000);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setIsLoading(false);
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };

  }, []);

  if(isLoading) return (
    <div className={`${isDark ? "text-[var(--light)] bg-[var(--dark)]" : "bg-[var(--light)] text-[var(--dark)]"}
      h-screen w-full flex flex-col items-center justify-center gap-6`}>

      <WanderingEyes className="size-16 text-[var(--primary)]" />

      <span className="text-lg text-[color:var(--primary)]">{loadingText}</span>
      
    </div>
  )

  return (
    <div className={`${isDark ? "text-[var(--light)] bg-[var(--dark)]" : "bg-[var(--background)] text-[var(--dark)]"}
      h-auto w-full flex flex-col items-center justify-start`}>

      <Header isDark={isDark} setIsDark={setIsDark}/>
      <Content isDark={isDark} />
      <Footer isDark={isDark} />
      
    </div>
  )
}

export default page