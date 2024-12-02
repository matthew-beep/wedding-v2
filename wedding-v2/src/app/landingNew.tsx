'use client'
import Image from "next/image";
import React from 'react';
import {useEffect, useRef, useState} from 'react'
import {motion, useScroll, easeInOut, useMotionValueEvent, useAnimationControls} from 'framer-motion'
import rsvp from './img/rsvp.jpg';
import video from './img/video.mp4';
import photo1 from './img/mainpage-horizontalscroll1.JPG';
import photo2 from './img/mainpage-horizontalscroll2.JPG';
import photo3 from './img/mainpage-horizontalscroll3.JPG';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';



interface LandingProps {
  large : boolean;
}

const Landing: React.FC<LandingProps> = ({ large }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [modal, setModal] = useState<boolean>(false);
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
  const onClick = () => {
    console.log("Clicked!");
  }
  */

  return (
    <div className="relative">
      <section className="bg-[#FAFBF7] h-svh lg:h-screen w-full flex">
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
      <section className="font-canto bg-[#FAFBF7] flex flex-col gap-12 px-5">
        <section 
          className="h-auto w-full font-canto flex flex-col text-[#333333] gap-12 relative z-10 py-12"
          id="details"
        >
          <div>
            <motion.h4 
              className="text-[#486A51] text-4xl"
              initial={{ 
                opacity:0,
                filter: "blur(5px)"
              }}
              whileInView={{

                opacity:1,
                filter: "blur(0px)"
              }}
              transition={{
                duration: 0.5
              }}
              viewport={{
                once: true
              }}
            
            >
                WE&apos;RE GETTING MARRIED
            </motion.h4>
            <h3 className="text-[#919191]">DETAILS</h3>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 w-full ">
                <h4 className="text-lg">
                  WHEN:
                </h4>
            </div>
            <motion.div 
              className="flex flex-col gap-8 w-full"
              initial={{ 
                opacity: 0,
                filter: "blur(5px)" 
              }}
              whileInView={{ 
                opacity: 1,
                filter: "blur(0px)" 
              }}
              transition={{ 
                duration: 0.5, 
                delay:0.2
              
              }}
              viewport={{
                once: true,
                amount: 0.3
              }}
            >
              <p className="text-4xl text-[#486A51] w-full">Friday, August 29th, 2025</p>
              <div className="flex flex-col w-full">
                <p className="text-xl">CEREMONY: 3pm-3:30pm</p>
                <p className="text-xl">RECEPTION: 5pm-10pm</p>           
              </div>
              <hr className="bg-[#333333] w-full h-0.5"/>
            </motion.div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 w-full ">
                <h4 className="text-lg">
                  WHERE:
                </h4>
            </div>
            <motion.div 
              className="flex flex-col gap-8 w-full"
              initial={{ 
                opacity: 0,
                filter: "blur(5px)" 
              }}
              whileInView={{ 
                opacity: 1,
                filter: "blur(0px)" 
              }}
              transition={{ 
                duration: 0.5, 
                delay:0.2
              }}
              viewport={{
                once: true,
                amount: 0.3
              }}
            >
              <p className="text-4xl text-[#486A51] w-full">Rock Creek Gardens</p>
              <div className="flex flex-col">
                <Link href="https://maps.app.goo.gl/Pigf5jMHBtSDvwVi6" target="_blank">
                  <p className="text-xl underline decoration-1">11421 164th St E</p>
                  <p className="text-xl underline decoration-1 flex gap-2">Puyallup, WA 98374 <span><ExternalLink/></span></p>
                </Link>
              </div>
              <hr className="bg-[#333333] w-full h-0.5"/>
            </motion.div>
          </div>
          <Link href="#rsvp" className="w-full h-auto">
            <button className="w-full h-full flex border py-2 items-center justify-center border-[#486A51] text-[#486A51] text-3xl rounded-full">
              I&apos;LL BE THERE
            </button>
          </Link>
        </section>
        <section className="flex flex-col relative">
          <h1 className="text-3xl lg:text-5xl text-[#486A51]">ANITA & JESUS</h1>
          <h2 className="text-[#919191] lg:text-2xl">Bride & Groom</h2>
          <div className="flex gap-5 overflow-x-scroll scrollbar-hide w-full">
            <motion.div 
              className="min-w-80 md:min-w-96 aspect-square lg:shrink-0 lg:w-[30rem]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ 
                duration: 0.3
              }}
              viewport={{
                once: true,
                amount: 0.1
              }}
            >
              <Image 
                src={photo1} 
                alt="Jesus taking a photo of Anita" 
                className="w-full h-full object-cover object-center" 
              />
            </motion.div>
            <motion.div 
              className="min-w-80 md:min-w-96 aspect-square lg:aspect-auto lg:shrink-0 lg:w-[30rem]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ 
                duration: 0.3
              }}
              viewport={{
                once: true,
                amount: 0.1
              }}
            >
              <Image 
                src={photo2} 
                alt="Anita Holding Flowers" 
                className="w-full h-full object-cover object-center" 
              />
            </motion.div>
            <motion.div 
              className="min-w-80 md:min-w-96 aspect-square lg:aspect-auto lg:shrink-0 lg:w-[30rem]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ 
                duration: 0.3
              }}
              viewport={{
                once: true,
                amount: 0.1
              }}
            >
              <Image 
                src={photo3} 
                alt="Jesus and Anita standing together" 
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </div>
        </section>
        <section 
          className="flex flex-col gap-8 py-12"
          id="rsvp"
        >
            <motion.div 
              className="flex flex-col w-full h-[50vh]"
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
                src={rsvp} 
                alt="Rock Creek Garden" 
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
            <div>
              <h2 className="text-3xl text-[#486A51]">SEE YOU THERE?</h2>
              <h3 className="text-[#919191]">RSVP</h3>
            </div>
            <p className="text-lg text-[#333333]">Please remember to RSVP by February 28th. Even if you are unable to attend, 
              your response will help us in our planning. For more information please refer to our FAQs. 
              Can&apos;t wait to celebrate this day with you there!
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/faq" className="w-full h-auto">
                <button className="w-full h-full flex border py-2 items-center justify-center border-[#486A51] text-[#486A51] text-3xl rounded-full">
                  FAQ
                </button>
              </Link>
              <Link href="/rsvp" className="w-full h-auto">
                <button className="w-full h-full flex border py-2 items-center justify-center bg-[#486A51] text-[#FAFBF7] text-3xl rounded-full">
                  RSVP
                </button>
              </Link>

            </div>
          </section>
      </section>
    </div>
  );
}

export default Landing;