'use client'
import React from 'react';
import banner from '../img/rockCreek.jpg'
import Link from 'next/link';
import { Map } from 'lucide-react';
import { motion, easeOut } from 'framer-motion'

interface CeremonyProps {
  windowWidth? : number;
}

const Ceremony: React.FC<CeremonyProps> = ({ }) => {

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
        duration: 0.5, 
        ease: easeOut,
      }
    }
  }


  return (
    <div className="relative bg-[#f5f5f5]"> 
      <section className="h-svh relative flex flex-col">
        <div className="h-1/2">
          <div 
          className="h-auto w-full z-0 flex pt-32 justify-center text-white font-canto"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, .75) 0%, rgba(0, 0, 0, 0.15) 30%), url(${banner.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
            width: "100%",
          }}
          >
            <motion.h2 
              className="text-5xl font-bold"
              variants={textAnimation}
              initial="hidden"
              animate="show"
            >
              Ceremony
            </motion.h2>
          </div>
        </div>
        <div className="font-canto py-10 px-5 text-black flex flex-col justify-start items-center border-2">
          <h3 className="text-5xl">Venue</h3>
          <h4>Rock Creek Gardens</h4>
          <hr className='h-px w-full'/>
          <h4>11421 164th St E, Puyallup, WA 98374</h4>
          <Link href="https://maps.app.goo.gl/Pigf5jMHBtSDvwVi6" target="_blank" className="cursor-pointer underline flex items-center">
            <h4 className='text-xl'>Get Directions</h4>
            <Map className="ml-2 w-4 h-4" />
          </Link>
          <button>FAQ</button>
        </div>
      </section>
    </div>
  );
}

export default Ceremony;