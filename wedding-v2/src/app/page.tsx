'use client'
import Landing from "./landing";
import MobileNav from "./mobileNav";
import {useScroll, useMotionValueEvent} from 'framer-motion'
import { useEffect, useState } from "react";
import Footer from "./footer";

export default function Home() {
  const { scrollY } = useScroll();
  const [scrollYProgress, setScrollYProgress] = useState<number>(scrollY.get());
  const [windowHeight, setWindowHeight] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  

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
        const viewportWidth = window.innerWidth;
        setWindowHeight(viewportHeight);
        setWindowWidth(viewportWidth);
      }

      window.addEventListener("resize", handleResize);
      handleResize();
      return () => {
        window.removeEventListener("resize", handleResize);
      }
    }
  });

  return (
    <div className="relative bg-white">
      <header className="fixed top-0 left-0 z-40 w-full">
        <MobileNav scroll={scrollYProgress} height={windowHeight}/>
      </header>
      <main className="bg-white">
        <Landing windowWidth={windowWidth}/>
      </main>
      <Footer />
    </div>
  );
}


