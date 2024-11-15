'use client'
import Image from "next/image";
import React from 'react';
import {useEffect, useRef} from 'react'
import {motion, useScroll, easeInOut, useMotionValueEvent, useAnimationControls} from 'framer-motion'
// import saveMobile from './img/saveMobile.jpg';
// import hero from './img/hero.jpg';
import ceremony from './img/ceremony.png';
import video from './img/video.mp4';
import Link from 'next/link';
//import Timer from './timer';
import { ExternalLink } from 'lucide-react';



interface LandingProps {
  large : boolean;
}

const Landing: React.FC<LandingProps> = ({ large }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const textAnimation = useAnimationControls();
    const { scrollYProgress: end } = useScroll({
      target: ref,
      offset: ["end end", "end start"]
    })

    const { scrollYProgress: start } = useScroll({
      target: ref,
      offset: ["start end", "end end"]
    })

    const { scrollYProgress : section} = useScroll({
      target: sectionRef,
      offset: ["start end", "end start"]
    })

    //const scale = useTransform(section, [0.3, 1], [1, 1.5]);
    //const opacity = useTransform(end, [0, 1], [1, 0]);

    //const sectionOpacity = useTransform(section, [0.6, 1], [0, 0]);
    //const textOpacity = useTransform(start, [0.5, 1], [0, 1]);
    
    //const firstOpacity = useTransform(section, [0.3, 0.5], [0, 1]);
    //const secondOpacity = useTransform(section, [0.5, 0.8], [0, 1]);

    useMotionValueEvent(end, "change", (latest) => {
      console.log("Page scroll: ", latest)
    })

    useMotionValueEvent(start, "change", (latest) => {
      console.log("Container scroll: ", latest)
    })

    useMotionValueEvent(section, "change", (latest) => {
      console.log("Section scroll: ", latest)
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
            <motion.section 
          className="lg:h-[150vh] h-auto min-h-[150vh] w-full relative bg-[#FDF6ED] z-10"
          ref={sectionRef}
          style={{
            opacity: sectionOpacity,
          }}
        >
          <div className="flex flex-col w-full sm:flex-row h-screen overflow-y-hidden lg:overflow-x-hidden">
            <motion.div 
              className="w-full h-full relative"
              ref={ref}
              style={{
                scale,
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
            >
              <h4 className="text-5xl flex gap-3">
                <motion.span
                  style={{
                    opacity:firstOpacity,
                  }}
                >
                  YOU&apos;RE 
                </motion.span>
                <motion.span
                  style={{
                    opacity:secondOpacity,
                  }}
                >
                  INVITED
                </motion.span>
              </h4>
            </motion.div>
          </div>
        </motion.section>
    */
  return (
    <div className="relative"> 
      <section className="bg-neutral-500 h-svh lg:h-screen w-full flex">
        <div className="w-full h-full relative">
          {/* Text container with higher z-index */}
          <div className="w-full h-full absolute z-10 top-0 left-0 pt-24 lg:pt-40 landing">
            <motion.div 
              className="flex flex-col items-center justify-start text-white font-canto w-full h-full relative gap-5"
              variants={parentVariants}
              initial={"hidden"}
              animate={textAnimation}
            >
              <motion.div 
                className="flex text-base sm:text-2xl text-white text-center w-1/4 md:w-1/6 lg:w-1/12 items-center justify-center px-1"
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
                className="text-5xl sm:text-7xl lg:text-8xl w-auto text-center"
                variants={childVariants}
              >
                Anita & Jesus
              </motion.h1>
              <motion.button 
                className="border border-white p-2 w-1/3 text-2xl rounded-full sm:w-1/6 xl:w-1/12"
                variants={childVariants}
              >
                <Link href="#details" className="w-full h-full" scroll={true}>
                  Details
                </Link>
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
      <section 
        className="bg-[#FDF6ED] h-auto flex flex-col sm:flex-row font-canto text-[#333333] gap-16 relative z-10 py-12 px-5"
        id="details"
      >
        <div>
          <h4 className="text-[#919191] text-base">We&apos;re Getting Married</h4>
          <h3 className="text-[#333333] text-5xl">DETAILS</h3>
        </div>
        <motion.div 
          className="flex flex-col gap-8 w-full"
          initial={{ 
            opacity: 0,
          }}
          whileInView={{ 
            opacity: 1,
          }}
          transition={{ 
            duration: 0.5, 
            delay:0.2
          
          }}
          viewport={{
            once: true,
            amount: 1
          }}
        >
          <div className="flex items-center gap-3 w-full ">
            <h4 className="text-lg">
              WHEN:
            </h4>
          </div>
          <p className="text-4xl text-[#D69B43] w-full">Friday, August 29th, 2025</p>
          <div className="flex flex-col w-full">
            <p className="text-xl">CEREMONY: 3pm-3:30pm</p>
            <p className="text-xl">RECEPTION: 5pm-10pm</p>           
          </div>
          <hr className="bg-[#333333] w-full h-0.5"/>
        </motion.div>
        <motion.div 
          className="flex flex-col gap-8 w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ 
            duration: 0.3, 
            delay:0.2
          }}
          viewport={{
            once: true,
            amount: 0.5
          }}
        >
          <div className="flex items-center gap-3 w-full ">
            <h4 className="text-lg">
              WHERE:
            </h4>
          </div>
          <p className="text-4xl text-[#D69B43] w-full">Rock Creek Gardens</p>
          <div className="flex flex-col">
            <Link href="https://maps.app.goo.gl/Pigf5jMHBtSDvwVi6" target="_blank">
              <p className="text-xl underline decoration-1">11421 164th St E</p>
              <p className="text-xl underline decoration-1 flex gap-2">Puyallup, WA 98374 <span><ExternalLink/></span></p>
            </Link>
          </div>
          <hr className="bg-[#333333] w-full h-0.5"/>
        </motion.div>
        <motion.div 
          className="flex flex-col gap-3 w-full items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ 
            duration: 0.3, 
            delay:0.2
          }}
          viewport={{
            once: true,
            amount: 0.5
          }}
        >
          <div className="flex items-center gap-3 w-full ">
            <h4 className="text-lg">
              FROM THE BRIDE AND GROOM:
            </h4>
          </div>
          <p className="text-xl text-[#333333] w-full">
            Hi everyone, welcome to our wedding website! Some things to know about our special day: 
            The <span className="font-bold text-[#D69B43]">ceremony</span> and <span className="font-bold text-[#D69B43]">reception</span> will be at the <span className="font-bold text-[#D69B43]">same venue</span> so no need to travel in between locations. 
            Our dress code for the event is <span className="font-bold text-[#D69B43]">garden party</span> so we encourage wearing <span className="font-bold text-[#D69B43]">florals</span>, <span className="font-bold text-[#D69B43]">pastels</span>, and <span className="font-bold text-[#D69B43]">ruffles</span>. 
            However, please avoid wearing the color <span className="font-bold text-[#D69B43]">yellow</span>. If you have any other questions, check out our <span className="underline cursor-pointer"><Link href="/faq">FAQ page</Link></span> and don&apos;t forget 
            to <span className="font-bold text-[#D69B43]">RSVP</span> by <span className="font-bold text-[#D69B43]">February 28th</span>!
          </p>

          <hr className="bg-[#333333] w-1/4  mt-10 h-0.5"/>
        </motion.div>
        <motion.div 
          className="flex flex-col gap-5 w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ 
            duration: 0.3, 
            delay:0.2 
          }}
          viewport={{
            once: true,
            amount: 0.5
          }}
        >
          <Image 
            src={ceremony} 
            alt="Rock Creek Garden" 
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </section>
    </div>
  );
}

export default Landing;