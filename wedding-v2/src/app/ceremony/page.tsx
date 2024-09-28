'use client'
import Ceremony from "./ceremony";
import MobileNav from "../mobileNav";
import {useScroll, useMotionValueEvent} from 'framer-motion'
import { useEffect, useState } from "react";
import Footer from "../footer";

export default function Home() {
  const { scrollY } = useScroll();
  const [scrollYProgress, setScrollYProgress] = useState<number>(scrollY.get());
  const [windowHeight, setWindowHeight] = useState<number>(0);
  

  useMotionValueEvent(scrollY, "change", (latest) => {
    // console.log("Page scroll: ", latest)
    /*
    if (latest > 5) {
      console.log("activate animation " + latest)
    } else {
      console.log("deactivate animation")
    }
      */
    setScrollYProgress(latest);
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        const viewportHeight = window.innerHeight;
        setWindowHeight(viewportHeight);

      }

      window.addEventListener("resize", handleResize);
      handleResize();
      return () => {
        window.removeEventListener("resize", handleResize);
      }
    }
  });

  return (
    <div className="relative bg-[#fdfdfd]">
      <header className="fixed top-0 left-0 z-40 w-screen">
        <MobileNav scroll={scrollYProgress} height={windowHeight}/>
      </header>
      <main className="bg-[#fdfdfd]">
        <Ceremony />
      </main>
      <Footer />
    </div>
  );
}


