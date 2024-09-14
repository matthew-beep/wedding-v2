'use client'
import Image from "next/image";
import React from 'react';
import {useEffect, useRef,} from 'react'
import {motion, useScroll, useTransform, useAnimationControls, easeInOut} from 'framer-motion'
import img from './img/savethedate.jpg';

interface LandingProps {
  scroll : number;
  windowWidth : number;
}

const Landing: React.FC<LandingProps> = ({ scroll, windowWidth }) => {
    const controls = useAnimationControls();
    const ref = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"]
    })

    const yPos = useTransform(scrollYProgress, [0, 0.9], ["50%", "0%"]);
    const xPos = useTransform(scrollYProgress, [0, 0.9], ["50%", "0%"]);
    const width = useTransform(scrollYProgress, [0, 0.9], ["45%", "100%"]);

    useEffect(() => {
      console.log(scrollYProgress);
    }, [scrollYProgress])

    
    useEffect(() => {
      if(scroll !== undefined) {
        if(scroll > 5) {
          console.log("activate animation ")

          controls.start({
            /*
            top: 0,
            fontSize: '4px',
            filter:'blur(10px)',
            opacity: 0,
            transition: { duration: 0.1, ease: [0.43, 0.13, 0.23, 0.96] }
            */
            transform:"translateY(-50%)",
            opacity: 0
          })
        } else {
          controls.start({
            /*
            color:"white",
            top: '5rem',
            filter:'blur(0px)',
            fontSize: '72px',
            opacity:  1,
            transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }
            */
            transform:"translateY(0%)",
            opacity: 1
          })
        }
      }
    })
    
    useEffect(() => { 
        console.log(xPos);
    }, [xPos])

  
  return (
    <div className="relative"> 
      <section className="bg-neutral-500 h-screen w-full bg-white flex">
        <div className="relative landing w-full h-full px-12">
          <div className="flex flex-col items-start text-white font-canto w-auto h-auto mt-24">
            <motion.h1 
              className="text-5xl w-11/12"
              initial={{
                opacity: 0,
                translateY: '50%'
              }}
              animate={{
                opacity:1,
                translateY: '0%',
                transition: { duration: 0.5, ease: easeInOut }
              }}
            >
              Anita & Jesus
            </motion.h1>
            <h2 className="text-2xl text-white">August 29, 2025</h2>
          </div>
        </div>
      </section>
      <section ref={ref} className="lg:h-[200vh] h-[150vh] w-full relative">
        <div className="bg-white flex flex-col sm:flex-row sticky top-0 h-screen overflow-y-hidden lg:overflow-x-hidden">
          <div className="lg:w-1/2 w-full bg-white flex flex-col items-center justify-center h-1/2 lg:h-full">
            <div className="font-canto text-6xl text-black">
              Save The Date              
            </div>
            <div className="font-rufina-stencil-ornaments text-9xl font-medium">
              f
            </div>
          </div>
          <motion.div 
          className="w-full flex flex-col items-center justify-center h-screen absolute bg-[#B0A395]"
          style={{
            translateX: windowWidth <= 1024 ? 0 : xPos ,
            translateY: windowWidth <= 1024 ? yPos : 0
          }}
          >
            <div className="lg:w-1/2 w-full flex items-center justify-center h-1/2">
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
            <div className="lg:w-1/2 w-11/12 lg:h-full h-1/2 p-5 font-canto">
              <h3 className="text-3xl">We&apos;re Getting Married</h3>
              <p className="text-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Landing;