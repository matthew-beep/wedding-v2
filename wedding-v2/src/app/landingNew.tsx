'use client'
import Image from "next/image";
import React from 'react';
import {useEffect, useRef} from 'react'
import {motion, useScroll, useTransform, easeInOut, useMotionValueEvent, useAnimationControls} from 'framer-motion'
import saveMobile from './img/saveMobile.jpg';
// import hero from './img/hero.jpg';
import ceremony from './img/ceremony.png';
import video from './img/video.mp4';


interface LandingProps {
  large : boolean;
}

const Landing: React.FC<LandingProps> = ({ large }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const textAnimation = useAnimationControls();
    const { scrollYProgress: end } = useScroll({
      target: ref,
      offset: ["end end", "end start"]
    })

    const { scrollYProgress: start } = useScroll({
      target: ref,
      offset: ["start end", "end end"]
    })

    const scale = useTransform(end, [0, 1], [1, 0.85]);
    const opacity = useTransform(end, [0, 1], [1, 0]);
    const textOpacity = useTransform(start, [0.5, 1], [0, 1]);
    const transformX = useTransform(start, [0, 0.5], ["100%", "0%"])
    

    useMotionValueEvent(end, "change", (latest) => {
      console.log("Page scroll: ", latest)
    })

    useMotionValueEvent(start, "change", (latest) => {
      console.log("Container scroll: ", latest)
    })
    useMotionValueEvent(transformX, "change", (latest) => {
      console.log("translate: ", latest)

    })


    useEffect(() => { // initial text animation
      textAnimation.start("show");
      console.log(large); // for lint error
    }, [])

  

    const parentVariants = { // header text animation 
      hidden: {              
        opacity: 0,
        translateY: '50%'
      },
      show: {
        opacity: 1,
        translateY: '0%',
        filter:'blur(0px)', 
        transition: { 
          duration: 0.5, ease: easeInOut,
          staggerChildren: 0.2
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
  
    const childVariants = { // header text animation
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

    /*
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
    */

  return (
    <div className="relative"> 
      <section className="bg-neutral-500 h-svh lg:h-screen w-full flex sticky top-0">
        <div className="w-full h-full relative">
          {/* Text container with higher z-index */}
          <div className="w-full h-full absolute z-10 top-0 left-0 pt-24 landing">
            <motion.div 
              className="flex flex-col items-center justify-start text-white font-canto w-full h-full relative gap-5"
              variants={parentVariants}
              initial={"hidden"}
              animate={textAnimation}
            >
              <motion.div 
                className="flex text-base sm:text-5xl text-white text-center w-1/4 lg:w-7/12 xl:w-1/4 items-center justify-center px-1"
                variants={childVariants}
              >
                <motion.div 
                  className="flex-grow z-20 border"
                  initial={{
                    scaleX: 0
                  }}
                  animate={{
                    scaleX: 1,
                    transition: { 
                      delay: 0.5,
                      duration: 0.4, ease: easeInOut,
                    }
                  }}
                  style={{
                    originX: 1,
                    height: "0.125rem"
                  }}
                >
                </motion.div>
                <h2 className="w-auto mx-1">
                  08.29.2025
                </h2>
                <motion.div 
                  className="flex-grow z-20 border"
                  initial={{
                    scaleX: 0
                  }}
                  animate={{
                    scaleX: 1,
                    transition: { 
                      delay: 0.5,
                      duration: 0.4, ease: easeInOut,
                    }
                  }}
                  style={{
                    originX: 0,
                    height: "0.125rem"
                  }}
                ></motion.div>
              </motion.div>
              <motion.h1 
                className="text-5xl sm:text-9xl w-auto text-center"
                variants={childVariants}
              >
                Anita & Jesus
              </motion.h1>
              <motion.button 
                className="border border-white p-2 w-1/3 text-2xl rounded-full"
                variants={childVariants}
              >
                Details
              </motion.button>
            </motion.div>
          </div>

          {/* Image with lower z-index */}
          <div className="w-full h-full relative z-0">
            <video 
              className="w-full h-full object-cover" src={video} 
              autoPlay 
              loop 
              muted 
              playsInline
            >
              <source src={video} type="video/mp4"/>
            </video>
          </div>
        </div>
      </section>
      <section className="lg:h-[200vh] h-auto min-h-[200vh] w-full relative bg-[#E0EEE0]">
        <div className="flex flex-col w-screen sm:flex-row sticky top-0 h-screen overflow-y-hidden lg:overflow-x-hidden">
          <motion.div 
            className="w-full h-full relative"
            ref={ref}
            style={{
              scale
            }}
          >
            <Image src={saveMobile} alt="Wedding Invitation Flyer" className="w-full h-full object-cover"/>
          </motion.div>
          <motion.div 
            className="w-full h-full absolute inset-0 bg-neutral-950/30"
            style={{
              opacity,
              scale
            }}
          >
          </motion.div>
          <motion.div 
            className="absolute z-10 font-canto text-white w-full flex items-center justify-center top-0 mt-24"
            style={{
              translateX: transformX,
              opacity: textOpacity,
            }}
          >
            <h4 className="text-5xl">
              YOU&apos;RE INVITED 
            </h4>
          </motion.div>
        </div>
      </section>
      <section className="bg-[#E0EEE0] h-auto py-10 relative flex flex-col sm:flex-row items-center font-canto text-[#2E3105] gap-16">
        <motion.div 
          className="px-5 flex flex-col gap-5 w-full"
          initial={{ 
            opacity: 0,
          }}
          whileInView={{ 
            opacity: 1,
          }}
          transition={{ 
            duration: 1, 
            delay:0.5
          
          }}
          viewport={{
            once: true,
            amount: 1
          }}
        >
          <div className="w-full flex items-center gap-3">
            <h4 className="text-lg text-[#7A7F55]">
              When
            </h4>
            <hr className="w-full bg-[#7A7F55] h-0.5"/>
          </div>
          <p className="text-4xl">Friday, August 29th, 2025</p>
          <p className="text-xl">Ceremony: 3pm</p>
        </motion.div>
        <motion.div 
          className="px-5 flex flex-col gap-5 w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ 
            duration: 0.5, 
            delay:0.5 
          }}
          viewport={{
            once: true,
            amount: 1
          }}
        >
          <div className="w-full flex items-center gap-3">
            <h4 className="text-lg text-[#7A7F55]">
              Where
            </h4>
            <hr className="w-full bg-[#7A7F55] h-0.5"/>
          </div>
          <p className="text-4xl">Rock Creek Gardens</p>
          <p className="text-xl underline decoration-1">11421 164th St E Puyallup, WA 98374</p>
        </motion.div>
        <motion.div 
          className="px-5 flex flex-col gap-5 w-full border-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ 
            duration: 0.5, 
            delay:0.5 
          }}
          viewport={{
            once: true,
            amount: 0.5
          }}
        >
          <Image 
            src={ceremony} 
            alt="Rock Creek Garden" 
            className="w-full h-96 object-cover object-center"
          />
        </motion.div>
      </section>
    </div>
  );
}

export default Landing;