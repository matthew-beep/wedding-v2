'use client'
import Image from "next/image";
import React from 'react';
import {useEffect, useRef, useState} from 'react'
import {motion, useAnimation, useAnimationControls} from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

interface MobileNavProps {
  scroll : number;
  height : number;
}

const MobileNav: React.FC<MobileNavProps> = ({ scroll, height }) => {
  const [downAnimation, setDownAnimation] = useState<boolean>(false);
  const controls = useAnimationControls();
  const [iconOpacity, setIconOpacity] = useState<number>(0);
  
  useEffect(() => {
    // console.log("mobile " + scroll);
    if (scroll !== undefined) {
      if (scroll > 5) {
        setDownAnimation(true);
        setIconOpacity(1);
      } else {
        setDownAnimation(false);
        setIconOpacity(0);
      }
    }
  }, [scroll])

  useEffect(() => {
    if (downAnimation == true) {
      controls.start({
        color: 'black',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }
      })
    } else {
      controls.start({
        color: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }
      })
    }
  }, [downAnimation])

  useEffect(() => {
    if (scroll >= (0.75 * height)) { // going to need to detect scrolling down and when 
      console.log("disappear");
    }
  }, [height, scroll])
  
  return (
    <nav className="font-canto w-full h-20">
      <motion.section 
        className="flex w-full justify-center h-full items-center"
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
          <FontAwesomeIcon icon={faBars} className="text-3xl cursor-pointer" />
        </div>
      </motion.section>
      <motion.section
        className="flex-grow bg-white"
      >

      </motion.section>
    </nav>
  );
}

export default MobileNav;