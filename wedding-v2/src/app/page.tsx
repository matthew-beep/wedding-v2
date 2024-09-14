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
        console.log(windowHeight);
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
      <header className="fixed top-0 left-0 z-10 w-full border-2">
        <MobileNav scroll={scrollYProgress} height={windowHeight}/>
      </header>
      <main className="">
        <Landing scroll={scrollYProgress} windowWidth={windowWidth}/>
      </main>
      <Footer />
    </div>
  );
}


