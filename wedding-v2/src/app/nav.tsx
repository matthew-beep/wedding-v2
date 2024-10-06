'use client'
import React from 'react';
// import Link from 'next/link';
import {useEffect, useState} from 'react'
import {motion, useAnimationControls, easeInOut} from 'framer-motion'
import Link from 'next/link';


interface NavProps {
  scroll : number;
  height : number;
}

const Nav: React.FC<NavProps> = ({ scroll, height }) => {
  const [downAnimation, setDownAnimation] = useState<boolean>(false);
  const [iconOpacity, setIconOpacity] = useState<number>(0);
  const [prevScroll, setPrevScroll] = useState<number>(scroll);
  const [scrollDown, setScrollDown] = useState<boolean>(false);
  const controls = useAnimationControls();
  const textColor = useAnimationControls();

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
      } else {
        setDownAnimation(false);
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
      setIconOpacity(1);
      textColor.start({
        color: "black"
      })
      controls.start({
        color: 'black',
        backgroundColor: 'rgba(245, 245, 245, 1)',
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.2)',
        transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }
      })
    } else {
      setIconOpacity(0);
      textColor.start({
        color: "white"
      })
      controls.start({
        color: 'white',
        backgroundColor: 'rgba(245, 245, 245, 0)',
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0)',
        transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }
      })
    }
  }, [downAnimation])

  useEffect(() => {
    if (scroll > (0.75 * height) && scrollDown) { // hide navbar when scrolling down
      controls.start({
        y: '-100%',
        transition: { duration: 0.1, ease: [0.43, 0.13, 0.23, 0.96] }
      })
    } else {
      controls.start({
        y: '0%',
        transition: { duration: 0.1, ease: [0.43, 0.13, 0.23, 0.96] }
      })
    }
  }, [height, scroll])



  return (
    <nav className="font-canto w-full flex flex-col">
      <motion.div 
        className='flex flex-col relative'
      >
        <motion.section 
          className="flex w-full justify-center h-28 items-center relative z-20 px-10"
          initial={{
            color: 'white',
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
          </div>
          <motion.ul 
              className="flex w-full h-full text-xl items-center gap-10  justify-end"
              variants={linkSection}
              initial={"hidden"}
              animate={"show"}
              exit={"exit"}
            >
              <motion.li 
                className="py-4 px-4 text-3xl cursor-pointer"
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
                className="text-black py-4 px-4 text-3xl cursor-pointer"
                initial={{
                  color: 'white'
                }}
                animate={textColor}
              >
                <Link href="/ceremony">
                  Ceremony
                </Link>
              </motion.li>
              <motion.li 
                className="text-black py-4 px-4 text-3xl cursor-pointer"
                initial={{
                  color: 'white'
                }}
                animate={textColor}
              >
                Registry
              </motion.li>
              <motion.li 
                className="text-black py-4 px-4 text-3xl cursor-pointer"
                initial={{
                  color: 'white'
                }}
                animate={textColor}
              >
                <Link href="/faq">
                  FAQ
                </Link>
              </motion.li>
              <motion.li 
                className="text-black px-4 py-2 text-3xl bg-black text-white cursor-pointer"
              >
                RSVP
              </motion.li>
            </motion.ul>
        </motion.section>
      </motion.div>
    </nav>
  );
}

export default Nav;