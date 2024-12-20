'use client'
import React from 'react';
import Form from './form'
import { motion, easeOut } from 'framer-motion'

interface RSVPProps {
  windowWidth? : number;
}

const RSVP: React.FC<RSVPProps> = ({ }) => {

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
    <div className="relative bg-[#FAFBF7]"> 
      <section className="h-auto relative flex flex-col items-center ">
        <div className="h-[50svh] md:h-[70vh] border-gray-700 w-full flex">
          <div 
            className="h-full w-full z-0 flex justify-center pt-32 text-white font-canto rsvp lg:items-center"
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <motion.h2 
              className="text-3xl xl:text-6xl font-bold"
              variants={textAnimation}
              initial="hidden"
              animate="show"
            >
              RSVP
            </motion.h2>
          </div>
        </div>
        <div className='py-5 w-full text-black bg-[#FAFBF7]'>
          <div className='text-center flex flex-col gap-5 py-5 items-center'>
            <h1 className='text-4xl lg:text-6xl text-[#486A51] font-canto font-semiBold'>Our Day To Remember</h1>
            <h2 className='text-lg font-canto w-10/12'>Friday, August 29th, 2025, 3:00 PM</h2>
            <h2 className='text-lg font-canto w-10/12'>Rock Creek Gardens</h2>
            <h2 className='text-lg font-canto w-10/12 lg:w-4/12'>Attire: A glamorous garden soirée where the goal is to be extravagantly overdressed. Aim for ruffles, pastels, and florals—outshine everyone with your most show-stopping look!</h2>
            <hr className='h-px mt-2 mb-5 w-9/12'/>
          </div>

          <Form />
        </div>
      </section>
    </div>
  );
}

export default RSVP;