'use client'
import Image from "next/image";
import Landing from "./landing";
import MobileNav from "./mobileNav";
import {motion, useScroll, useTransform, useMotionValueEvent} from 'framer-motion'
import { useEffect, useState } from "react";

export default function Home() {
  const { scrollY } = useScroll();
  const [scrollYProgress, setScrollYProgress] = useState<number>(scrollY.get());
  

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


  return (
    <div className="relative">
      <header className="fixed top-0 left-0 z-10 w-full">
        <MobileNav scroll={scrollYProgress} />
      </header>
      <main className="">
        <Landing scroll={scrollYProgress}/>
      </main>
    </div>
  );
}


