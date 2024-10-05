'use client'
import Image from "next/image";
import React from 'react';
import {useEffect, useRef, useState} from 'react'
import {motion, useScroll, useTransform, easeInOut, useMotionValueEvent, AnimatePresence} from 'framer-motion'
import Gallery from './gallery'
import img from './img/savethedate.jpg';

interface LandingProps {
  //windowWidth : number;
  large : boolean;
}

const Landing: React.FC<LandingProps> = ({ large }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [showText, setShowText] = useState<boolean>(false);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start start", "end end"]
    })

    const yPos = useTransform(scrollYProgress, [0, 0.9], ["50%", "0%"]);
    const xPos = useTransform(scrollYProgress, [0, 0.9], ["50%", "0%"]);
    const width = useTransform(scrollYProgress, [0, 0.9], ["45%", "100%"]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.9], [0, 1]);

    useEffect(() => {
      console.log(scrollYProgress);
    }, [scrollYProgress])

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
      if(latest > 0.3) {
        console.log("show text");
        setShowText(true);
      } else {
        setShowText(false);
      }
    })

  return (
    <div className="relative"> 
      <section className="relative bg-neutral-500 h-svh lg:h-screen w-full flex">
        <div 
          className="w-full h-full object-cover z-0 absolute"
        >
          <Gallery /> 
        </div>
         </section>
      <section ref={ref} className="lg:h-[200vh] h-auto min-h-[200vh] w-full relative">
        <div className="bg-[#f5f5f5] flex flex-col sm:flex-row sticky top-0 h-screen overflow-y-hidden lg:overflow-x-hidden">
          <div className="xl:w-1/2 w-full h-1/2 xl:h-full p-5">
            <div className="w-full h-full flex flex-col items-center justify-center border-2 sm:gap-10 gap-3 border-black">
              <h3 className="font-canto text-xl text-black sm:text-4xl">
                Save The Date              
              </h3>
              <div className="flex flex-col items-center justify-center gap-2 font-semibold">
                <h3 className="font-canto text-4xl text-black sm:text-7xl">
                  29th August, 2025             
                </h3>
                <hr className='h-1 border-black w-9/12 sm:w-11/12'/>
              </div>
              <h3 className="font-canto text-xl text-black sm:text-4xl">
                Rock Creek Gardens             
              </h3>
              <h3 className="font-canto text-xl text-black sm:text-4xl">
                3:00 PM           
              </h3>
            </div>
          </div>
          <motion.div 
            className="w-full flex lg:flex-row flex-col items-center justify-center h-screen absolute bg-[#B0A395]"
            style={{
              translateX: !large ? 0 : xPos ,
              translateY: !large ? yPos : 0
            }}
          >
            <div className="lg:w-1/2 w-full flex items-center justify-center h-1/2 lg:h-full">
              <motion.div 
                className="bg-white"
                style={{
                  width, 
                  height: width
                }}
              >
                <div className="bg-white w-full h-full">
                  <Image src={img} alt="Anita and Jesus holding a newspaper of the wedding of the century" className="w-full h-full object-cover"/>
                </div>
              </motion.div>
            </div>
            <div className="xl:w-1/2 w-11/12 xl:h-full h-1/2 py-5 font-canto text-white">
              <AnimatePresence>
                {showText && (
                  <motion.div 
                    className="flex flex-col justify-around items-center h-full"
                    style={{
                      opacity: textOpacity,
                    }}
                    initial={{
                      y: 1000,
                      filter: 'blur(10px)'
                    }}
                    animate={{
                      y: 0,
                      filter: 'blur(0px)',
                      transition: { duration: 0.5, ease: easeInOut }
                    }}
                    exit={{
                      y: 1000,
                      filter: 'blur(10px)',
                      transition: { duration: 0.5, ease: easeInOut }
                    }}
                  >
                    <div className="sm:w-11/12">
                      <h3 className="text-3xl font-black mb-1 text-white sm:text-6xl">We&apos;re Getting Married</h3>
                      <p className="text-md text-white font-proxima font-extrathin sm:text-xl">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                        sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                    </div>
                    <button className="text-2xl px-3 py-2 bg-white text-black rounded-full w-full font-bold mt-1 sm:w-11/12">RSVP</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Landing;