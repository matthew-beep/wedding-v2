'use client'
import React from 'react';
//import Link from 'next/link';
import {useEffect, useState} from 'react'
import {motion, useAnimationControls} from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

interface MobileNavProps {
  scroll : number;
  height : number;
}

const MobileNav: React.FC<MobileNavProps> = ({ scroll, height }) => {
  const [downAnimation, setDownAnimation] = useState<boolean>(false);
  const [navDisplay, setNavDisplay] = useState<boolean>(false);
  // const [hideNave, setHideNav] = useState<boolean>(false);
  const [iconOpacity, setIconOpacity] = useState<number>(0);

  const controls = useAnimationControls();
  const navAnimation = useAnimationControls();
  
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
    if (scroll > (0.75 * height)) { // going to need to detect scrolling down and when 
      console.log("disappear " + scroll);
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

  const handleClick = () => { // show navbar 
    console.log("handleClick");
    if (downAnimation == false && navDisplay != true) {
      setNavDisplay(true);
      controls.start({
        color: 'black',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }
      })
      setIconOpacity(1);
      navAnimation.start({
        height: '100vh'
      })

    } else {
      setNavDisplay(false);
      controls.start({
        color: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }
      })
      setIconOpacity(0);
      navAnimation.start({
        height: '5rem'
      })
    }
    
  }
  
  return (
    <nav className="font-canto w-full flex flex-col">
      <motion.div 
        className='flex flex-col'
      >
        <motion.section 
          className="flex w-full justify-center h-20 items-center"
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
            <FontAwesomeIcon icon={faBars} className="text-3xl cursor-pointer" onClick={handleClick}/>
          </div>
        </motion.section>
        {navDisplay &&
        <motion.section
          className="bg-white flex-grow"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }
          }}
        >
          <ul className="flex flex-col w-full h-full text-xl">
            <li className="text-gray-700 py-4 px-4">Venue</li>
            <li className="text-gray-700 py-4 px-4">Registry</li>
            <li className="text-gray-700 py-4 px-4">Guestbook</li>
            <li className="text-gray-700 py-4 px-4">FAQ</li>
            <li className="text-gray-700 py-4 px-4">RSVP</li>
          </ul>
        </motion.section>
        }
      </motion.div>
    </nav>
  );
}

export default MobileNav;