'use client'
import React from 'react';
import { usePathname } from 'next/navigation'
import {useEffect, useState} from 'react'
import {motion, useAnimationControls, easeInOut} from 'framer-motion'
import Link from 'next/link';


interface NavProps {
  scroll : number;
  height : number;
  setNav: React.Dispatch<React.SetStateAction<boolean>>;
}

const Nav: React.FC<NavProps> = ({ scroll, height, setNav }) => {
  const [downAnimation, setDownAnimation] = useState<boolean>(false);
  const [iconOpacity, setIconOpacity] = useState<number>(0);
  const [prevScroll, setPrevScroll] = useState<number>(scroll);
  const [scrollDown, setScrollDown] = useState<boolean>(false);
  const controls = useAnimationControls();
  const textColor = useAnimationControls();
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
  
  useEffect(() => {
    // console.log("mobile " + scroll);
    if (scroll !== undefined) {
      if (scroll > 5) {
        setDownAnimation(true);
        setNav(true);
      } else {
        setDownAnimation(false);
        if(scroll == 0) {
          setNav(true);
        } else {
          setNav(false);
        }
      }
    }
  }, [scroll])

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
      textColor.start({
        color: '#486A51'
      })
      controls.start({
        color: 'black',
        backgroundColor: 'rgba(250, 251, 247, 1)',
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.2)',
        transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }
      })
    } else {
      setNav(false);
      setIconOpacity(0);
      textColor.start({
        color: pathname != '/faq' ? 'white' : '#486A51'
      })
      controls.start({
        color: 'white',
        backgroundColor: 'rgba(250, 251, 247, 0)',
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0)',
        transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }
      })
    }
  }, [downAnimation])

  useEffect(() => {
    if (scroll > (0.75 * height) && scrollDown) { // hide navbar when scrolling down
      setNav(false);
      controls.start({
        y: '-100%',
        transition: { duration: 0.1, ease: [0.43, 0.13, 0.23, 0.96] }
      })
    } else {
      setNav(true);
      controls.start({
        y: '0%',
        transition: { duration: 0.1, ease: [0.43, 0.13, 0.23, 0.96] }
      })
    }
  }, [height, scroll])



  return (
    <motion.nav 
      className="font-canto w-full flex flex-col"
      initial={{
        color: 'white',
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0)'
      }}
      animate={controls}
    >
      <motion.div 
        className='flex flex-col relative'
      >
        <motion.section 
          className="flex w-full justify-center h-28 items-center relative z-20 px-10"
        >
          <div className="flex justify-between w-auto items-center">
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
          </div>
          <motion.ul 
              className="flex w-full h-full text-xl items-center gap-10 justify-end"
              variants={linkSection}
              initial={"hidden"}
              animate={"show"}
              exit={"exit"}
            >
              <motion.li 
                className="py-4 px-4 text-2xl cursor-pointer"
                initial={{
                  color: 'white'
                }}
                animate={textColor}
              >
                <Link href="/">
                  Save The Date
                </Link>
              </motion.li>
              <motion.li 
                className="py-4 px-4 text-2xl cursor-pointer"
                initial={{
                  color: 'white'
                }}
                animate={textColor}
              >
                <Link href="/dresscode">
                  Dress Code
                </Link>
              </motion.li>
              <motion.li 
                className="py-4 px-4 text-2xl cursor-pointer"
                initial={{
                  color: 'white'
                }}
                animate={textColor}
              >
                <Link href="https://www.amazon.com/wedding/share/anitajesusregistry" target='_blank'>
                  Registry
                </Link>
              </motion.li>
              <motion.li 
                className="py-4 px-4 text-2xl cursor-pointer"
                initial={{
                  color: 'white'
                }}
                animate={textColor}
              >
                <Link href="/faq">
                  FAQs
                </Link>
              </motion.li>
              <motion.li 
                className="px-4 py-2 text-2xl text-white cursor-pointer bg-[#486A51] hover:bg-[#3b4d40] duration-200 transition-all"
              >
                  <Link href="/rsvp">
                    RSVP
                  </Link>
              </motion.li>
            </motion.ul>
        </motion.section>
      </motion.div>
    </motion.nav>
  );
}

export default Nav;