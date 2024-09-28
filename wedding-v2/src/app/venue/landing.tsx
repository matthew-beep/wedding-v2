'use client'
import React from 'react';
import banner from '../img/rockCreek.jpg'
import Link from 'next/link';
import { Map } from 'lucide-react';
import { motion, easeOut } from 'framer-motion'

interface LandingProps {
  windowWidth? : number;
}

const Landing: React.FC<LandingProps> = ({ }) => {

  const textAnimation = {
    hidden: {              
      opacity: 0,
      translateY: '50%',
      filter:'blur(10px)', 
    },
    show: {
      opacity: 1,
      translateY: '0%',
      filter:'blur(0px)', 
      transition: { 
        duration: 0.2, 
        ease: easeOut,
      }
    }
  }


  return (
    <div className="relative bg-[#f5f5f5]"> 
      <section className="h-svh relative flex flex-col">
        <div className="h-1/2">
          <div 
          className="h-auto w-full z-0 flex items-center justify-center text-white font-canto"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, .75) 0%, rgba(0, 0, 0, 0.15) 30%), url(${banner.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
            width: "100%",
          }}
          >
            <motion.h2 
              className="text-3xl"
              variants={textAnimation}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              Venue
            </motion.h2>
          </div>
        </div>
        <div className="font-canto py-10 px-5 text-black flex flex-col justify-start items-center border-2">
          <h3 className="text-5xl">Address</h3>
          <h4>11421 164th St E, Puyallup, WA 98374</h4>
          <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <Link href="https://maps.app.goo.gl/Pigf5jMHBtSDvwVi6" target="_blank" className="cursor-pointer underline flex items-center">
            <h4 className='text-xl'>Directions</h4>
            <Map className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Landing;