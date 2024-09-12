'use client'
import Image from "next/image";
import React from 'react';
import {useEffect, useRef,} from 'react'
import {motion, useScroll, useTransform, useAnimationControls} from 'framer-motion'

interface LandingProps {
  scroll? : number;
}

const Landing: React.FC<LandingProps> = ({ scroll }) => {
    const controls = useAnimationControls();
    const ref = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"]
    })
    const pageScroll = scroll 
    const xPos = useTransform(scrollYProgress, [0, 0.9], ["50%", "0%"]);
    const width = useTransform(scrollYProgress, [0, 0.9], ["15%", "85%"]);
    
    useEffect(() => {
      if(scroll !== undefined) {
        if(scroll > 5) {
          console.log("activate animation ")
          controls.start({
            color: "green",
            transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }
          })
        } else {
          controls.start({
            color:"white",
            transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }
          })
        }
      }
    })

    useEffect(() => { 
        console.log(xPos);
    }, [xPos])

  
  return (
    <div className="relative"> 
      <section className="bg-neutral-500 h-screen w-full flex justify-center">
        <div className="relative landing w-full h-full pt-24 items-center start flex flex-col border-2">
          <motion.h1 
            className="text-7xl text-white font-canto border-2"
            style={{
              top:0,
              left:0,
              position: "absolute"
            }}
            animate={controls}
          >
            Anita & Jesus
          </motion.h1>
        </div>
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