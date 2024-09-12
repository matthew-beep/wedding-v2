'use client'
import Image from "next/image";
import React from 'react';
import {useEffect, useRef, useState} from 'react'
import {motion, useAnimation, useAnimationControls} from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

interface MobileNavProps {
  scroll? : number;
}

const MobileNav: React.FC<MobileNavProps> = ({ scroll }) => {
  const [downAnimation, setDownAnimation] = useState<boolean>(false);
  const controls = useAnimationControls();
  
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
  
  return (
    <nav className="font-canto w-full h-20">
      <motion.section 
        className="flex w-full justify-center h-full items-center"
        initial={{color: 'white'}}
        animate={controls}
      >
        <div className="flex w-full justify-between w-11/12 items-center">
          <h2 className="text-4xl">A+J</h2>
          <FontAwesomeIcon icon={faBars} className="text-3xl" />
        </div>
      </motion.section>
    </nav>
  );
}

export default MobileNav;