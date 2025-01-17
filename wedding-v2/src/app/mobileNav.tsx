'use client'
import React from 'react';
import { usePathname } from 'next/navigation'
import {useEffect, useState} from 'react'
import {AnimatePresence, motion, useAnimationControls, easeInOut} from 'framer-motion'
import { Menu, X } from 'lucide-react';
import Link from 'next/link';


interface MobileNavProps {
  scroll : number;
  height : number;
  threshold : number;
  setNav: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNav: React.FC<MobileNavProps> = ({ scroll, height, threshold, setNav }) => {
  const [downAnimation, setDownAnimation] = useState<boolean>(false);
  const [navDisplay, setNavDisplay] = useState<boolean>(false);
  const [iconOpacity, setIconOpacity] = useState<number>(0);
  const [prevScroll, setPrevScroll] = useState<number>(scroll);
  const [scrollDown, setScrollDown] = useState<boolean>(false);
  const controls = useAnimationControls();  
  const pathname = usePathname();


  const linkSection = {
    hidden: {
      opacity: 0,
    },

    show:{
      opacity: 1,
      transition: { 
        duration: 0.5, 
        ease: easeInOut,
        staggerChildren: 0.1
      }
    },

    
    exit: {
      opacity: 0,
      transition: { 
        duration: 0.5, 
        ease: easeInOut,
        staggerChildren: 0.015,
        staggerDirection: -1
      }
    }

    
  }

  const links = {
    hidden: {
      opacity: 0,
      filter: 'blur(10px)'
    },

    show:{
      opacity: 1,
      filter: 'blur(0px)',
      transition: { 
        duration: 0.1, 
        ease: easeInOut
      }
    },
    exit: {
      opacity: 0,
      filter: 'blur(10px)',
      transition: { 
        duration: 0.1, 
        ease: easeInOut
      }
    }
  }

  useEffect(() => {
    // Disable scrolling when navDisplay is true
    if (navDisplay) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = ''; // Enable scrolling
    }

    return () => {
      document.body.style.overflow = ''; // Ensure scrolling is enabled when component unmounts
    };
  }, [navDisplay]);
  
  useEffect(() => {
    // console.log("mobile " + scroll);
    if (scroll !== undefined) {
      if (scroll > 5) {
        setDownAnimation(true);
        setNav(true);
      } else {
        if (!navDisplay) {
          setDownAnimation(false);
          console.log("turning off");
          if(scroll > 0) {
            setNav(false);
          }
        }
      }
    }
  }, [scroll, navDisplay])

  useEffect(() => {
    //console.log("prev: " + prevScroll);
    setPrevScroll(scroll);
    if (scroll > prevScroll) {
      setScrollDown(true);
    } else {
      setScrollDown(false);
    }
  }, [scroll])

  useEffect(() => {
    if (downAnimation == true) {
      setNav(true);
      setIconOpacity(1);
      controls.start({
        color: '#486A51',
        backgroundColor: 'rgba(250, 251, 247, 1)',
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.2)',
        transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }
      })
    } else {
      setNav(false);
      setIconOpacity(0);
      controls.start({
        color: pathname != '/faq' ? 'white' : '#486A51',
        backgroundColor: 'rgba(250, 251, 247, 0)',
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0)',
        transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }
      })
    }
  }, [downAnimation])

  useEffect(() => {
    if (scroll > (threshold * height) && scrollDown) { // hide navbar when scrolling down
      setNav(false);
      if(!navDisplay) {
        controls.start({
          y: '-100%',
          transition: { duration: 0.1, ease: [0.43, 0.13, 0.23, 0.96] }
        })
      }
    } else {
      setNav(true);
      controls.start({
        y: '0%',
        transition: { duration: 0.1, ease: [0.43, 0.13, 0.23, 0.96] }
      })
    }
  }, [height, scroll])

  const handleClick = () => { 
    if (!navDisplay) { // show navbar links
      setNavDisplay(true);
      controls.start({
        color: '#486A51',
        backgroundColor: 'rgba(250, 251, 247, 1)',
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0)',
        transition: { duration: 0.1, ease: [0.43, 0.13, 0.23, 0.96] }
      })
      setIconOpacity(1);
    } else {
      setNavDisplay(false);
      if (scroll > 0) { // if scroll bar not at the top, set shadow back after closing
        controls.start({
          boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.2)',
        })
      }
    }
  }

  const turnOff = () => {
      if (scroll <= 0) {
        controls.start({
          color: pathname != '/faq' ? 'white' : '#486A51',
          backgroundColor: 'rgba(250, 251, 247, 0)',
          boxShadow: '0px -2px 10px rgba(0, 0, 0, 0)',
          transition: {duration: 0.1, ease: [0.43, 0.13, 0.23, 0.96] }
        })
        setIconOpacity(0);
      }
  }


  return (
    <motion.nav className="font-canto w-full flex flex-col">
      <motion.div 
        className='flex flex-col relative'
      >
        <motion.section 
          className="flex w-full justify-center h-20 items-center relative z-20"
          initial={{
            color: pathname != '/faq' ? 'white' : '#486A51',
            boxShadow: '0px -2px 10px rgba(0, 0, 0, 0)'
          }}
          animate={controls}
        >
          <div className="flex justify-between w-11/12 items-center">
            <motion.h2 
              className="text-4xl text-[#486A51]"
              style={{
                opacity: iconOpacity
              }}
            >
              <Link href="/">
                A&J
              </Link>
            </motion.h2>
            <div className="cursor-pointer" onClick={handleClick}>
              {navDisplay && <div className='text-white bg-[#486A51] rounded-full w-8 h-8 flex items-center justify-center'><X size={24}/></div> || <Menu size={30} />}
            </div>
          </div>
        </motion.section>
        <AnimatePresence 
          onExitComplete={turnOff}
        >
          {navDisplay &&
            <motion.section
              className="flex-grow bg-[#FAFBF7] relative z-0"
              initial={{
                height: 0
              }}
              animate={{
                height: '100vh',
                transition: { 
                  duration: 0.3, 
                  ease: [0.43, 0.13, 0.23, 0.96],
                  delay: 0.1
                }
              }}
              exit={{
                height: 0,
                transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.1 }
              }}
              
            >
              <motion.ul 
                className="flex flex-col w-full h-full text-xl items-center justify-start gap-10 py-20"
                variants={linkSection}
                initial={"hidden"}
                animate={"show"}
                exit={"exit"}
              >
                <motion.li 
                  className="text-[#486A51] py-4 px-4  text-3xl"
                  variants={links}
                >
                  <Link href="/">
                    Save The Date
                  </Link>
                </motion.li>
                <motion.li 
                  className="text-[#486A51] py-4 px-4  text-3xl"
                  variants={links}
                >
                  <Link href="/dresscode">
                    Dress Code
                  </Link>
                </motion.li>
                <motion.li 
                  className="text-[#486A51] py-4 px-4 text-3xl"
                  variants={links}
                >
                  <Link href="registry">
                    Registry
                  </Link>
                </motion.li>
                <motion.li 
                  className="text-[#486A51] py-4 px-4 text-3xl"
                  variants={links}
                >
                  <Link href="/faq">
                    FAQs
                  </Link>
                </motion.li>
                <motion.li 
                  className="text-[#FAFBF7] px-4 py-2 text-3xl bg-[#486A51] text-white"
                  variants={links}
                >
                  <Link href="/rsvp">
                    RSVP
                  </Link>
                </motion.li>
              </motion.ul>
            </motion.section>
          }
        </AnimatePresence>
      </motion.div>
    </motion.nav>
  );
}

export default MobileNav;