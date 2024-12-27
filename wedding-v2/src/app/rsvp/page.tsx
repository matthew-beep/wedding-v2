'use client'
import RSVP from "./rsvp";
import MobileNav from "../mobileNav";
import {useScroll, useMotionValueEvent} from 'framer-motion'
import { useEffect, useState } from "react";
import Footer from "../footer";
import Nav from "../nav";
import Login from "../login";

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
      
      const handleResize = () => {
        const viewportHeight = window.innerHeight;
        setWindowHeight(viewportHeight);
        //setWindowWidth(viewportWidth);
        //console.log("resize: " + viewportWidth);
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
      // Create a media query for min-width: 1024px
      const mediaQuery = window.matchMedia("(min-width: 1024px)");

      // Function to update the state based on media query match and actual window width
      const handleMediaChange = (event: MediaQueryListEvent) => {
        console.log("Media Query: " + event.media);  // Logs the media query string
        console.log("Matches: " + event.matches);    // true if the media query matches
        setIsLargeScreen(event.matches);

      };

      // Initial check without triggering event listener
      setIsLargeScreen(mediaQuery.matches);

      // Add listener for media query changes
      mediaQuery.addEventListener("change", handleMediaChange);

      // Cleanup function to remove the listener when component unmounts
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
              {!isLargeScreen && <MobileNav scroll={scrollYProgress} height={windowHeight} threshold={0.75} setNav={setNav}/>}
              {isLargeScreen && <Nav scroll={scrollYProgress} height={windowHeight} setNav={setNav}/>}
            </header>
          <main className="bg-[#fdfdfd]">
            <RSVP />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}


