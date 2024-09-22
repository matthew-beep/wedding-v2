'use client'
import React from 'react';
// import Link from 'next/link';
import {useEffect, useState} from 'react'
import {AnimatePresence, motion, useAnimationControls, easeInOut} from 'framer-motion'
import { Menu, X } from 'lucide-react';


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
      console.log("down");
      setScrollDown(true);
    } else {
      console.log("up");
      setScrollDown(false);
    }
  }, [scroll])

  useEffect(() => {
    if (downAnimation == true) {
      setIconOpacity(1);
      controls.start({
        color: 'black',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }
      })
    } else {
      setIconOpacity(0);
      controls.start({
        color: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }
      })
    }
  }, [downAnimation])

  useEffect(() => {
    if (scroll > (0.75 * height) && scrollDown) { // going to need to detect scrolling down and when 
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

  const handleClick = () => { // show navbar 
    console.log("handleClick");
    if (!navDisplay) {
      setNavDisplay(true);
      controls.start({
        color: 'black',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        transition: { duration: 0.1, ease: [0.43, 0.13, 0.23, 0.96] }
      })
      setIconOpacity(1);
    } else {
      setNavDisplay(false);
      if (scroll <= 0) {
        controls.start({
          color: 'white',
          backgroundColor: 'rgba(255, 255, 255, 0)',
          transition: {
            delay: 0.3,
            duration: 0.1,
            ease: [0.43, 0.13, 0.23, 0.96]
          }
          
        });
        setIconOpacity(0);
        
      }
      
      
    }
  }
  
  return (
    <nav className="font-canto w-full flex flex-col">
      <motion.div 
        className='flex flex-col relative'
      >
        <motion.section 
          className="flex w-full justify-center h-20 items-center relative z-20"
          initial={{color: 'white'}}
          animate={controls}
        >
          <div className="flex justify-between w-11/12 items-center">
            <motion.h2 
              className="text-4xl"
              style={{
                opacity: iconOpacity
              }}
            >
              A&J
            </motion.h2>
            <div className="cursor-pointer" onClick={handleClick}>
              {navDisplay && <div className='text-white bg-black rounded-full w-8 h-8 flex items-center justify-center border-2'><X size={24}/></div> || <Menu size={30} />}
            </div>
          </div>
        </motion.section>
        <AnimatePresence>
        {navDisplay &&
          <motion.section
            className="flex-grow bg-white relative z-0"
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
                className="text-gray-700 py-4 px-4  text-3xl"
                variants={links}
              >
                Venue
              </motion.li>
              <motion.li 
                className="text-gray-700 py-4 px-4 text-3xl"
                variants={links}
              >
                Registry
              </motion.li>
              <motion.li 
                className="text-gray-700 py-4 px-4 text-3xl"
                variants={links}
              >
                Guestbook
              </motion.li>
              <motion.li 
                className="text-gray-700 py-4 px-4 text-3xl"
                variants={links}
              >
                FAQ
              </motion.li>
              <motion.li 
                className="text-gray-700 py-4 px-4 text-3xl"
                variants={links}
              >
                RSVP
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