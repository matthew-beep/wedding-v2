'use client'
import Landing from "./landingNew"; // change to landingNew
import MobileNav from "./mobileNav";
import Nav from "./nav";
import Login from "./login";
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { useEffect, useState } from "react";
import Footer from "./footer";

export default function Home() {
  const { scrollY } = useScroll();
  const [scrollYProgress, setScrollYProgress] = useState<number>(scrollY.get());
  const [windowHeight, setWindowHeight] = useState<number>(0);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
  const [auth, setAuth] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);  // New state for mounting check

  useEffect(() => {
    setIsMounted(true);  // Set to true once component mounts

    // Check session storage on initial load
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    setAuth(isLoggedIn);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollYProgress(latest);
  });

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
  }, []);

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

  if (!isMounted) return null;  // Don't render anything until the component is mounted

  return (
    <>
      {!auth ? (
        <Login setAuth={setAuth} />
      ) : (
        <div className="relative bg-white">
          <header className="fixed top-0 left-0 z-40 w-screen">
            {!isLargeScreen && <MobileNav scroll={scrollYProgress} height={windowHeight} threshold={0.75}/>}
            {isLargeScreen && <Nav scroll={scrollYProgress} height={windowHeight} />}
          </header>
          <main className="bg-white">
            <Landing />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}



