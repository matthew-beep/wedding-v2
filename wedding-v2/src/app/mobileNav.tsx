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
}

const MobileNav: React.FC<MobileNavProps> = ({ scroll, height }) => {
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
      } else {
        if (!navDisplay) {
          setDownAnimation(false);
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
      setIconOpacity(1);
      controls.start({
        color: 'black',
        backgroundColor: 'rgba(245, 245, 245, 1)',
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.2)',
        transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }
      })
    } else {
      setIconOpacity(0);
      controls.start({
        color: pathname != '/faq' ? 'white' : 'black',
        backgroundColor: 'rgba(245, 245, 245, 0)',
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0)',
        transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }
      })
    }
  }, [downAnimation])

  useEffect(() => {
    if (scroll > (0.75 * height) && scrollDown) { // hide navbar when scrolling down
      if(!navDisplay) {
        controls.start({
          y: '-100%',
          transition: { duration: 0.1, ease: [0.43, 0.13, 0.23, 0.96] }
        })
      }
    } else {
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
        color: 'black',
        backgroundColor: 'rgba(245, 245, 245, 1)',
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
          color: 'white',
          backgroundColor: 'rgba(245, 245, 245, 0)',
          boxShadow: '0px -2px 10px rgba(0, 0, 0, 0)',
          transition: {duration: 0.1, ease: [0.43, 0.13, 0.23, 0.96] }
        })
        setIconOpacity(0);
      }
  }


  return (
    <nav className="font-canto w-full flex flex-col">
      <motion.div 
        className='flex flex-col relative'
      >
        <motion.section 
          className="flex w-full justify-center h-20 items-center relative z-20"
          initial={{
            color: pathname != '/faq' ? 'white' : 'black',
            boxShadow: '0px -2px 10px rgba(0, 0, 0, 0)'
          }}
          animate={controls}
        >
          <div className="flex justify-between w-11/12 items-center">
            <motion.h2 
              className="text-4xl"
              style={{
                opacity: iconOpacity
              }}
            >
              <Link href="/">
                A&J
              </Link>
            </motion.h2>
            <div className="cursor-pointer" onClick={handleClick}>
              {navDisplay && <div className='text-white bg-black rounded-full w-8 h-8 flex items-center justify-center border-2'><X size={24}/></div> || <Menu size={30} />}
            </div>
          </div>
        </motion.section>
        <AnimatePresence 
          onExitComplete={turnOff}
        >
          {navDisplay &&
            <motion.section
              className="flex-grow bg-[#f5f5f5] relative z-0"
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
                  className="text-black py-4 px-4  text-3xl"
                  variants={links}
                >
                  <Link href="/">
                    Save The Date
                  </Link>
                </motion.li>
                <motion.li 
                  className="text-black py-4 px-4  text-3xl"
                  variants={links}
                >
                  <Link href="/ceremony">
                    Ceremony
                  </Link>
                </motion.li>
                <motion.li 
                  className="text-black py-4 px-4 text-3xl"
                  variants={links}
                >
                  Registry
                </motion.li>
                <motion.li 
                  className="text-black py-4 px-4 text-3xl"
                  variants={links}
                >
                  <Link href="/faq">
                    FAQs
                  </Link>
                </motion.li>
                <motion.li 
                  className="text-black px-4 py-2 text-3xl bg-black text-white"
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
    </nav>
  );
}

export default MobileNav;