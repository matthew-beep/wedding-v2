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
      <section className="min-h-svh sm:min-h-screen h-auto relative flex flex-col">
        <div className="h-1/2">
          <div 
          className="h-auto w-full z-0 flex pt-24 justify-center text-white font-canto"
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
        <div className="font-canto pt-10 pb-5 px-5 text-black flex flex-col justify-start items-center gap-2">
          <h3 className="text-5xl">Venue Address</h3>
          <h4 className='text-2xl'>Rock Creek Gardens</h4>
          <hr className='h-px w-6/12'/>
          <h4 className='text-2xl'>11421 164th St E</h4>
          <h4 className='text-2xl'>Puyallup, WA 98374</h4>
          <button className="text-2xl px-3 py-2 bg-black text-white rounded-full w-full font-bold mt-1 flex justify-center items-center">
            <Link href="https://maps.app.goo.gl/Pigf5jMHBtSDvwVi6" target="_blank" className="flex items-center justify-center w-full h-full">
              <h4 className='text-xl'>Get Directions</h4>
              <Map className="ml-2 w-4 h-4" />
            </Link>
          </button>
        </div>
        <div className="font-canto pt-10 pb-5 px-5 text-black flex flex-col justify-start items-center gap-2">
          <h3 className="text-5xl">Event Details</h3>
          <h4 className='text-2xl w-2/3 text-center'>Event Start: 3:00 PM</h4>
          <hr className='h-px w-6/12'/>
          <h4 className='text-2xl w-2/3 text-center'>Note: We advise arriving 30 - 45 minutes early. Please read the FAQ for more info and don&apos;t forget to RSVP!</h4>
          <button className="text-2xl px-3 py-2 bg-black text-white rounded-full w-full font-bold mt-1 flex justify-center items-center">
            <Link href="../faq" className="flex items-center justify-center w-full h-full">
              <h4 className='text-xl'>FAQ</h4>
            </Link>
          </button>
        </div>
      </section>
    </div>
  );
}

export default Ceremony;