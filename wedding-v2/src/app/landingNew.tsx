'use client'
import Image from "next/image";
import React from 'react';
import {useEffect, useRef, useState} from 'react'
import {motion, easeInOut, useAnimationControls} from 'framer-motion'
import rsvp from './img/rsvp.jpg';
import video from './img/video.mp4';
import photo1 from './img/mainpage-horizontalscroll1.JPG';
import photo2 from './img/mainpage-horizontalscroll2.JPG';
import photo3 from './img/mainpage-horizontalscroll3.JPG';
import Link from 'next/link';
import { ExternalLink, X, CircleArrowLeft, CircleArrowRight } from 'lucide-react';



interface LandingProps {

}

const Landing: React.FC<LandingProps> = ({ }) => {
  const [modal, setModal] = useState<boolean>(false);
  const [modalPic, setModalPic] = useState<string>(photo1);
  const textAnimation = useAnimationControls();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollAmount = 300;

  useEffect(() => { // initial text animation
    textAnimation.start("show");
  }, [])

  useEffect(() => {

    if (modal) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = ''; // Enable scrolling
    }

    return () => {
      document.body.style.overflow = ''; // Ensure scrolling is enabled when component unmounts
    };
  }, [modal]);



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

  const infoContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5
      },
    },
  };
  
  const infoAnimation = {
    hidden: { opacity: 0, translateY: '25%' },
    show: { 
      opacity: 1, 
      translateY: '0%',      
      transition: { 
      duration: 0.5, 
      ease: easeInOut
      }  
    },
  };



  const photoContainer = {
    initial: {
      opacity: 0,
      filter:'blur(5px)',
    },
    show: {
      opacity: 1, 
      filter:'blur(0px)',
      transition: { 
        duration: 0.3, 
        ease: easeInOut,
        staggerChildren: 0.2
      } 
    }
  }

  const photoAnimation = {
    hidden: {
      opacity: 0,
      translateY: '10%'
    },
    show: {
      opacity: 1, 
      translateY: '0%',
      transition: { 
        duration: 0.5, 
        ease: easeInOut
      } 
    }
  }
  
  const handleClick = (photo:string) => {
    console.log("Clicked!");
    setModal(true);
    setModalPic(photo);
  }

  const handleClose =() => {
    setModal(false);
  }
  
  const scrollLeft =() => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }    
  }

  const scrollRight =() => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }    
  }

  /*
                initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ 
                duration: 0.3
              }}
              viewport={{
                once: true,
                amount: 0.1
              }}



              lg:aspect-auto lg:shrink-0

              <hr className="h-px bg-[#333333] border border-[#333333] w-2/12 hidden lg:inline m-auto"/>
  */

  return (
    <div className="relative bg-[#FAFBF7] lg:flex lg:flex-col lg:items-center">

      {modal &&
        <div className="fixed top-0 z-40 w-screen h-dvh h-screen bg-black/90 flex items-center flex-col justify-start gap-5">
          <div className="w-full flex justify-end">
            <X className="text-white cursor-pointer right-0 top-0 m-5 hover:text-[#999999] duration-100 transition-all" onClick={handleClose}/>
          </div>
          <motion.div 
            className="w-full h-5/6 bg-white lg:w-auto lg:h-11/12"
            initial={{
              scale: 0.5,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: {
                duration: 0.2,
                ease: easeInOut,
              }
            }}
          >
            <Image alt="picture "src={modalPic} className="w-full h-full object-cover"/>
          </motion.div>
        </div>
      }
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
      <section className="font-canto bg-[#FAFBF7] flex flex-col gap-12 lg:gap-32 px-5 lg:w-10/12 2xl:w-8/12">
        <section 
          className="h-auto w-full font-canto flex flex-col text-[#333333] gap-12 lg:gap-32 relative z-10 py-12 lg:py-24"
          id="details"
        >
          <div>
            <motion.h4 
              className="text-[#486A51] text-3xl lg:text-6xl"
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
            <h3 className="text-[#919191] lg:text-xl">DETAILS</h3>
          </div>
          <motion.div 
            className="flex flex-col gap-12 lg:flex-row w-full lg:items-center lg:justify-between"
            variants={infoContainer}
          >
            <motion.div   
              className="flex flex-col gap-3 lg:items-center"
              variants={infoAnimation}
            >
              <div className="flex items-center gap-3">
                  <h4 className="text-lg lg:text-2xl">
                    WHEN:
                  </h4>
              </div>
              <motion.div 
                className="flex flex-col gap-8 lg:items-center"
                initial={{ 
                  opacity: 0,
                  translateY: '25%' 
                }}
                whileInView={{ 
                  opacity: 1,
                  translateY: '0%'  
                }}
                transition={{ 
                  duration: 0.5, 
                  delay:0.1
                }}
                viewport={{
                  once: true,
                  amount: 0.3
                }}
              >
                <p className="text-4xl lg:text-5xl lg:text-center text-[#486A51] w-full">Friday, August 29th, 2025</p>
                <div className="flex flex-col">
                  <p className="text-xl lg:text-2xl">CEREMONY: 3pm-3:30pm</p>
                  <p className="text-xl lg:text-2xl">RECEPTION: 5pm-10pm</p>           
                </div>
                <motion.hr 
                  className="bg-[#333333] w-full lg:w-1/4 h-0.5"
                  initial={{
                    scaleX:0
                  }}
                  whileInView={{
                    scaleX:1,
                    originX:0,
                    transition: { 
                      duration: 0.4, 
                      ease: easeInOut
                    }
                  }}
                  viewport={{
                    once: true,
                    amount: 0.3
                  }}
                />
              </motion.div>
            </motion.div>
            <motion.div 
              className="flex flex-col gap-3 lg:items-center"
              variants={infoAnimation}
            >
              <div className="flex items-center gap-3">
                  <h4 className="text-lg lg:text-2xl">
                    WHERE:
                  </h4>
              </div>
              <motion.div 
                className="flex flex-col gap-8 lg:items-center"
                initial={{ 
                  opacity: 0,
                  translateY: '25%' 
                }}
                whileInView={{ 
                  opacity: 1,
                  translateY: '0%'  
                }}
                transition={{ 
                  duration: 0.5, 
                  delay:0.1
                }}
                viewport={{
                  once: true,
                  amount: 0.3
                }}
              >
                <p className="text-4xl lg:text-5xl text-[#486A51] w-full lg:text-center">Rock Creek Gardens</p>
                <div className="flex flex-col">
                  <Link href="https://maps.app.goo.gl/Pigf5jMHBtSDvwVi6" target="_blank" className="lg:text-center">
                    <p className="text-xl lg:text-2xl underline decoration-1">11421 164th St E</p>
                    <p className="text-xl lg:text-2xl underline decoration-1 flex gap-2">Puyallup, WA 98374 <span><ExternalLink/></span></p>
                  </Link>
                </div>
                <motion.hr 
                  className="bg-[#333333] w-full lg:w-1/4 h-0.5"
                  initial={{
                    scaleX:0
                  }}
                  whileInView={{
                    scaleX:1,
                    originX:0,
                    transition: { 
                      duration: 0.4, 
                      ease: easeInOut
                    }
                  }}
                  viewport={{
                    once: true,
                    amount: 0.3
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            className="w-full h-auto"
            initial={{ 
              opacity: 0,
              translateY: '25%' 
            }}
            whileInView={{ 
              opacity: 1,
              translateY: '0%'  
            }}
            transition={{ 
              duration: 0.5, 
              delay:0.1
            }}
            viewport={{
              once: true,
              amount: 0.3
            }}
          >
            <Link href="#rsvp" className="w-full h-auto">
              <button className="w-full lg:w-auto lg:px-10 lg:m-auto h-full flex border py-2 items-center justify-center border-[#486A51] text-[#486A51] text-3xl rounded-full hover:text-[#FAFBF7] hover:bg-[#486A51]  cursor-pointer duration-200 transition-all">
                I&apos;LL BE THERE
              </button>
            </Link>
          </motion.div>
        </section>
        <motion.section 
          className="flex flex-col-reverse gap-8 lg:gap-12 h-auto pb-16 pt-8 lg:flex-row-reverse"
          id="rsvp"
        >          
          <motion.div 
            className="flex flex-col w-full lg:w-5/12 aspect-auto h-96 lg:h-auto lg:max-h-[50vh]"
            initial={{ 
              opacity: 0,
              translateY: '10%'
            }}
            whileInView={{ 
              opacity: 1,
              translateY: '0%'
            }}
            transition={{ 
              duration: 0.3, 
              delay:0.2 
            }}
            viewport={{
              once: true,
              amount: 0.2
            }}
          >
            <Image 
              src={rsvp} 
              alt="Anita & Jesus looking back" 
              className="w-full h-full object-center object-cover"
            />
          </motion.div>
          <div 
            className="flex flex-col gap-8 lg:w-7/12 lg:max-h-[50vh]"
          >
            <motion.div
              initial={{ 
                opacity: 0,
                translateY: '10%'
              }}
              whileInView={{ 
                opacity: 1,
                translateY: '0%'
              }}
              transition={{ 
                duration: 0.3, 
                delay:0.2 
              }}
              viewport={{
                once: true,
                amount: 0.2
              }}
            >
              <h2 className="text-3xl text-[#486A51] md:text-4xl lg:text-6xl">SEE YOU THERE?</h2>
              <h3 className="text-[#919191] md:text-lg lg:text-xl">RSVP</h3>
            </motion.div>
            <motion.p 
              className="text-lg lg:text-xl text-[#333333] w-full"
              initial={{ 
                opacity: 0,
                translateY: '10%'
              }}
              whileInView={{ 
                opacity: 1,
                translateY: '0%'
              }}
              transition={{ 
                duration: 0.3, 
                delay:0.2 
              }}
              viewport={{
                once: true,
                amount: 0.8
              }}
            >
              Please remember to RSVP by February 28th to let us know if you can join us on our special day. 
              Even if you&apos;re unable to attend, your response will help us finalize our arrangements.
              If you have any questions, please feel free to check out our FAQ page.
              We&apos;re so excited to celebrate this unforgettable moment surrounded by our closest family and friends. 
              Your presence means the world to us, and we can&apos;t wait to share this day with you!
            </motion.p>
            <motion.div 
              className="flex flex-col gap-3 lg:flex-row lg:w-2/3 justify-center"
              initial={{ 
                opacity: 0,
                translateY: '10%'
              }}
              whileInView={{ 
                opacity: 1,
                translateY: '0%'
              }}
              transition={{ 
                duration: 0.3, 
                delay:0.2 
              }}
              viewport={{
                once: true,
                amount: 0.8
              }}
            >
              <Link href="/faq" className="w-full h-auto">
                <button className="w-full h-full flex border py-2 lg:py-4 items-center justify-center border-[#486A51] text-[#486A51] text-3xl rounded-full hover:text-[#FAFBF7] hover:bg-[#486A51] cursor-pointer duration-200 transition-all">
                  FAQ
                </button>
              </Link>
              <Link href="/rsvp" className="w-full h-auto">
                <button className="w-full h-full flex border py-2 lg:py-4 items-center justify-center bg-[#486A51] text-[#FAFBF7] text-3xl rounded-full hover:bg-[#3b4d40] duration-200 transition-all">
                  RSVP
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.section>
        <section className="flex flex-col relative">
          <div className="flex items-center justify-between h-auto">
            <div>
              <h1 className="text-3xl lg:text-5xl text-[#486A51]">ANITA & JESUS</h1>
              <h2 className="text-[#919191] lg:text-2xl">Bride & Groom</h2>
            </div>
            <div className="lg:flex hidden">
              <button
                className="flex text-[#486A51] hover:text-[#798c7e] cursor-pointer duration-200 transition-all"
                onClick={scrollLeft}
              >
                <CircleArrowLeft 
                  size={50} 
                  strokeWidth={0.75} 
                />
              </button>
              <button
                className="flex text-[#486A51] hover:text-[#798c7e] cursor-pointer duration-200 transition-all"
                onClick={scrollRight}
              >
                <CircleArrowRight 
                  size={50} 
                  strokeWidth={0.75} 
                />
              </button>
            </div>
          </div>
          <motion.div 
            className="flex gap-2 overflow-x-scroll scrollbar-hide w-full"
            ref={scrollRef}
            variants={photoContainer}
            initial={"hidden"}
            whileInView={"show"}
            viewport={{
              once: true,
              amount: 0.4
            }}
          >
            <motion.div 
              className="min-w-80 md:min-w-96 aspect-square lg:aspect-auto lg:w-[30rem]"
              variants={photoAnimation}
            >
              <Image 
                src={photo1} 
                alt="Jesus taking a photo of Anita" 
                className="w-full h-full object-cover object-center cursor-pointer" 
                onClick={() => handleClick(photo1)}
              />
            </motion.div>
            <motion.div 
              className="min-w-80 md:min-w-96 aspect-square lg:aspect-auto lg:w-[30rem]"
              variants={photoAnimation}
            >
              <Image 
                src={photo2} 
                alt="Anita Holding Flowers" 
                className="w-full h-full object-cover object-center cursor-pointer" 
                onClick={() => handleClick(photo2)}
              />
            </motion.div>
            <motion.div 
              className="min-w-80 md:min-w-96 aspect-square lg:aspect-auto lg:w-[30rem]"
              variants={photoAnimation}
            >
              <Image 
                src={photo3} 
                alt="Jesus and Anita standing together" 
                className="w-full h-full object-cover object-center cursor-pointer"
                onClick={() => handleClick(photo3)}
              />
            </motion.div>
          </motion.div>
        </section>
      </section>
    </div>
  );
}

export default Landing;