'use client'
import Image from "next/image";
import React from 'react';
import {useEffect, useRef, useState} from 'react'
import {motion, useScroll, useTransform, useAnimationControls, easeInOut, useMotionValueEvent, AnimatePresence, useMotionValue, useSpring} from 'framer-motion'
import { CircleChevronRight, CircleChevronLeft } from 'lucide-react';
import img from './img/savethedate.jpg';
import landing1 from './img/hero.jpg';
import landing2 from './img/preferred.jpg';
import landing3 from './img/pillars.jpg';
import landing4 from './img/dark.jpg';


interface LandingProps {
  scroll : number;
  windowWidth : number;
}

const Landing: React.FC<LandingProps> = ({ scroll, windowWidth }) => {
    const controls = useAnimationControls();
    const slide = useAnimationControls();
    const textAnimation = useAnimationControls();
    
    // const header = useAnimationControls();
    const ref = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"]
    })

    const parentVariants = {
      hidden: {              
        opacity: 0,
        translateY: '50%'
      },
      show: {
        opacity: 1,
        translateY: '0%',
        transition: { 
          duration: 0.5, ease: easeInOut,
          staggerChildren: 0.3
        }
      },
      exit: { 
        opacity: 0,
        translateY: '50%',
        filter:'blur(10px)', 
        transition: { 
          duration: 0.5, ease: easeInOut,
          staggerChildren: 1,
          staggerDirection: -1
        } 
      }

    }

    const childVariants = {
      hidden: { 
        opacity: 0,
        filter:'blur(10px)',
        translateY: '50%' 
      },
      show: { 
        opacity: 1, 
        translateY: '0%',
        filter:'blur(0px)',
        transition: { duration: 0.5, ease: easeInOut} 
      },
      exit: { 
        opacity: 0,
        translateY: '50%',
        filter:'blur(10px)', 
        transition: { 
          duration: 0.3, ease: easeInOut,
        } 
      }
    }

    const yPos = useTransform(scrollYProgress, [0, 0.9], ["50%", "0%"]);
    const xPos = useTransform(scrollYProgress, [0, 0.9], ["50%", "0%"]);
    const width = useTransform(scrollYProgress, [0, 0.9], ["45%", "100%"]);
    
    const textOpacity = useTransform(scrollYProgress, [0, 0.9], [0, 1]);
    const [showText, setShowText] = useState<boolean>(false);
    const [currentImg, setImg] = useState<number>(0);
    
    const timer = useMotionValue(0);
    const timerEnd:number = 10;
    const progress = useTransform(timer, [0, timerEnd], [0, 1])
    
    

    // useMotionValue()
    const scaleX = useSpring(progress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
    });

    useEffect(() => {
      textAnimation.start("show")
    }, [])

    useEffect(() => {
      //Implementing the setInterval method
      const interval = setInterval(() => {
          const currTime = timer.get();
          if (currTime >= timerEnd) {
            console.log(currentImg)
            next();
            timer.set(0);
            //console.log("resetting timer" + timer.get())
          } else {
            timer.set(currTime + 0.1);
          }
          //console.log(timer.get() + " seconds");
      }, 100);
      //Clearing the interval
      return () => clearInterval(interval);
    }, [timer, currentImg]);



    const gallery = [
      { img: landing1 },
      { img: landing2 },
      { img: landing3 },
      { img: landing4 }
    ];
    
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

    
    useEffect(() => { // header text animation
      if(scroll !== undefined) {
        if(scroll > 5) {
          console.log("activate animation ")

          controls.start({
            
            top: 0,
            fontSize: '4px',
            filter:'blur(10px)',
            opacity: 0,
            transition: { duration: 0.1, ease: [0.43, 0.13, 0.23, 0.96] }
            
            //transform:"translateY(-50%)",
            //opacity: 0
          })
        } else {
          controls.start({
            
            color:"white",
            top: '5rem',
            filter:'blur(0px)',
            fontSize: '72px',
            opacity:  1,
            transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }
            
           // transform:"translateY(0%)",
           // opacity: 1
          })
        }
      }
    })
    
    useEffect(() => { 
        console.log(xPos);
    }, [xPos])

    const next = () => {
      console.log("next image" + currentImg);
      textAnimation.start("exit");
      //textAnimation.start("show");
        if(gallery.length - 1 == currentImg) {
          setImg(0);
        } else {
          setImg(currentImg + 1)
        }
        slide.start({
          opacity: [0.5,1],
          transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }
        }).then(()=> {
          textAnimation.start("show")
          textAnimation.set({ filter: 'blur(0px)' });  
        })
    }

    const prev = () => {
      console.log("prev image");
      textAnimation.start("exit");
      if(currentImg == 0) {
        setImg(gallery.length - 1);
      } else {
        setImg(currentImg - 1)
      }
        slide.start({
          opacity: [0.5,1],
          transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }
        }).then(() => {
          textAnimation.start("show")
          textAnimation.set({ filter: 'blur(0px)' });
        })
    }



  
    // <Image src={hero} alt="Anita & Jesus Sitting Together" className="w-full h-full absolute top-0 left-0 object-cover" />

  return (
    <div className="relative"> 
      <section className="relative bg-neutral-500 h-svh sm:h-screen w-full flex">
        <motion.div 
          className="w-full h-full object-cover z-0 absolute"
          animate={slide}
        >
          <Image src={gallery[currentImg].img} alt="Anita & Jesus sitting together" className="w-full h-full object-cover z-0 absolute" />
        </motion.div>
        <div 
          className="absolute bottom-0 left-0 w-full z-20 bg-amber-400"
          style={{
            backgroundColor: "rgba(128, 128, 128, 0.5)"
          }}
        >
          <motion.div
                className="h-2 bg-white w-full"
                style={{
                  scaleX: scaleX,
                  originX: 0
                }}
              >
          </motion.div>
        </div>
                
        <div 
          className="relative w-full h-full px-12 flex flex-col justify-between pb-12 landing"
        >
          
          <motion.div 
          className="flex flex-col items-center justify-center text-white font-canto w-auto h-auto mt-24 relative z-10"
          variants={parentVariants}
          initial={"hidden"}
          animate={textAnimation}
          exit={"exit"}
          >
            <motion.h1 
              className="text-6xl sm:text-7xl"
              variants={childVariants}
            >
              Anita & Jesus
            </motion.h1>
            <motion.h2 
              className="text-2xl text-white"
              variants={childVariants}
            >
              August 29, 2025
            </motion.h2>
          </motion.div>
          <div className="flex justify-between">
            <div 
              className="w-12 h-12 flex items-center"
              onClick={prev}
            >
              <CircleChevronLeft className="text-white w-full h-full" strokeWidth={1}/>
            </div>
            <div 
              className="w-12 h-12 flex items-center"
              onClick={next} 
            >
              <CircleChevronRight className="text-white w-full h-full" strokeWidth={1}/>
            </div>
          </div>
        </div>
      </section>
      <section ref={ref} className="lg:h-[200vh] h-auto min-h-[200vh] w-full relative">
        <div className="bg-white flex flex-col sm:flex-row sticky top-0 h-screen overflow-y-hidden lg:overflow-x-hidden">
          <div className="lg:w-1/2 w-full bg-white flex flex-col items-center justify-center h-1/2 lg:h-full">
            <div className="font-canto text-6xl text-black">
              Save The Date              
            </div>
            <div className="font-rufina-stencil-ornaments text-9xl font-medium text-black">
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
            <div className="lg:w-1/2 w-11/12 lg:h-full h-1/2 py-5 font-canto text-white">
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
                    <div>
                      <h3 className="text-3xl font-black mb-1 text-white">We&apos;re Getting Married</h3>
                      <p className="text-md text-white font-proxima font-extrathin">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                        sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                    </div>
                    <button className="text-2xl px-3 py-2 bg-white text-black rounded-full w-full font-bold mt-1">RSVP</button>
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