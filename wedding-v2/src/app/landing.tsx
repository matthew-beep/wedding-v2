'use client'
import Image from "next/image";
import React from 'react';
import {useEffect, useRef,} from 'react'
import {motion, useScroll, useTransform} from 'framer-motion'

const Landing: React.FC = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"]
    })

    const xPos = useTransform(scrollYProgress, [0, 0.9], ["50%", "0%"]);
    const width = useTransform(scrollYProgress, [0, 0.9], ["15%", "85%"]);

    useEffect(() => { 
        console.log(xPos);
    }, [xPos])
  
  return (
    <div className="relative"> 
      <section className="bg-neutral-500 h-screen flex justify-center">
        <h1 className="text-7xl text-white font-quinn-display">
          Jesus & Anita
        </h1>
      </section>
      <section ref={ref} className="h-[200vh] w-full relative">
        <div className="bg-white flex flex-col sm:flex-row sticky top-0 h-screen overflow-x-hidden font-quinn-display">
          <div className="w-1/2 bg-yellow-50 flex flex-col items-center justify-center">
            <div className="font-quinn-display text-6xl">
              Save The Date              
            </div>
            <div className="font-rufina-stencil-ornaments text-9xl font-medium">
              f
            </div>
          </div>
          <motion.div 
          className="w-full bg-amber-900 flex items-center justify-center absolute h-screen"
          style={{translateX: xPos}}
          >
            <div className="w-1/2 flex items-center justify-center border-2 h-full">
              <motion.div 
              className="bg-white"
              style={{
                width, 
                height: width
              }}
              >
                Image
              </motion.div>
            </div>
            <div className="w-1/2 border-2 h-full p-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>

          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Landing;