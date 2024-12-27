'use client'
import FAQ from "./faq";
import MobileNav from "../mobileNav";
import Nav from "../nav";
import {useScroll, useMotionValueEvent} from 'framer-motion'
import Login from "../login";
import { useEffect, useState } from "react";
import Footer from "../footer";

export default function Home() {
  const { scrollY } = useScroll();
  const [scrollYProgress, setScrollYProgress] = useState<number>(scrollY.get());
  const [windowHeight, setWindowHeight] = useState<number>(0);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
  const [auth, setAuth] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);  // New state for mounting check
  const [nav, setNav] = useState<boolean>(true);

  useEffect(() => {
    setIsMounted(true);  // Set to true once component mounts

    // Check session storage on initial load
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    setAuth(isLoggedIn);
  }, []);

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(min-width: 1024px)");

      const handleMediaChange = (event: MediaQueryListEvent) => {
        setIsLargeScreen(event.matches);
      };

      setIsLargeScreen(mediaQuery.matches);
      mediaQuery.addEventListener("change", handleMediaChange);

      return () => {
        mediaQuery.removeEventListener("change", handleMediaChange);
      };
    }
  }, [isLargeScreen]);
  
  if (!isMounted) return null;
  
  return (
    <>
      {!auth ? (
        <Login setAuth={setAuth} />
      ) : (
      <div className="relative bg-[#fdfdfd]">
            <header               
              className="fixed top-0 left-0 z-40 w-screen"
              style={{
                pointerEvents: nav ? "auto": "none"
              }}
            >
              {!isLargeScreen && <MobileNav scroll={scrollYProgress} height={windowHeight} threshold={0.1} setNav={setNav}/>}
              {isLargeScreen && <Nav scroll={scrollYProgress} height={windowHeight} setNav={setNav}/>}
            </header>
        <main className="bg-[#fdfdfd]">
          <FAQ />
        </main>
        <Footer />
      </div>
      )}
    </>
  );
}


