

'use client'
import Image from "next/image";
import React from 'react';
import landing1 from './img/hero.jpg';
import landing2 from './img/preferred.jpg';
import landing3 from './img/pillars.jpg';
import landing4 from './img/dark.jpg';
import {useEffect, useState} from 'react'
import {motion, useTransform, useAnimationControls, easeInOut, useMotionValue, useSpring} from 'framer-motion'
import { CircleChevronRight, CircleChevronLeft } from 'lucide-react';



interface GalleryProps {

}


const Gallery: React.FC<GalleryProps> = ({}) => {
  const [currentImg, setImg] = useState<number>(0);
  const controls = useAnimationControls();
  const textAnimation = useAnimationControls();
  const slide = useAnimationControls();
  const [timerEnable, setTimerEnable] = useState<boolean>(true);
  const timer = useMotionValue(0);
  const [direction, setDirection] = useState<string>("next");
  const [transition, setTransition] = useState<string>("animate");
  const gallery = [
    { img: landing1 },
    { img: landing2 },
    { img: landing3 },
    { img: landing4 }
  ];
  const timerEnd:number = 10;

  
  const variants =  {
    current: {
      transform:'translateX(0%)'
    },

    next: {
      transform: 'translateX(100%)',
    },

    prev: {
      transform:'translateX(0%)',
    },
    animate: {
      transform: 'translateX(0%)',
      transition: { duration: 0.5, ease: easeInOut }
    },
    animatePrev: {
      transform: 'translateX(100%)',
      transition: { duration: 0.5, ease: easeInOut }
    }
  }

  const parentVariants = {
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

  const progress = useTransform(timer, [0, timerEnd], [0, 1])
  const [prev, setPrev] = useState(gallery.length - 1);
  const [curr, setCurr] = useState(0);
  const [next, setNext] = useState(curr + 1); 

  const [prevDisplay, setPrevDisplay] = useState<boolean>(false);
  const [nextDisplay, setNextDisplay] = useState<boolean>(false);


  const scaleX = useSpring(progress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });


  /*
  useEffect(() => {
    
    if (curr == gallery.length - 1) {
      setNext(0);
    } else {
      setNext(curr + 1);
    }

    if (curr == 0) {
      setPrev(gallery.length - 1);
    } else {
      setPrev(curr - 1);
    }
    console.log(next);
  }, [curr])
  */
  useEffect(() => { // initial text animation
    textAnimation.start("show");
  }, [])
  

  useEffect(() => {
    //Implementing the setInterval method
    let interval: NodeJS.Timeout | undefined;
    if (timerEnable) {
      interval = setInterval(() => {
        const currTime = timer.get();
        if (currTime >= timerEnd) {
          console.log(currentImg)
          nextClick();
          timer.set(0);
          //console.log("resetting timer" + timer.get())
        } else {
          timer.set(currTime + 0.1);
        }
        //console.log(timer.get() + " seconds");
      }, 100);
    }
    //Clearing the interval
    return () => clearInterval(interval);
  }, [timer, currentImg, timerEnable]);

  useEffect(() => {

    console.log("previous index: " + prev)
  }, [prev])



  const nextClick = () => {

    if (curr == gallery.length - 1) {
      setNext(0);
    } else {
      setNext(curr + 1);
    }

    setDirection("next");
    setTransition("animate");

    textAnimation.start("exit")// trigger text animation first 
    setNextDisplay(true); // trigger next animation
    timer.set(0);
    setTimerEnable(false);
  }

  const prevClick = () => {
    setNext(curr);
    
    if (curr == 0) {
      setCurr(gallery.length - 1);
    } else {
      setCurr(curr - 1);
    }
    
    setDirection("prev");
    setTransition("animatePrev");
    setNextDisplay(true);
    textAnimation.start("exit");
    timer.set(0);
    setTimerEnable(false);
  }



  // turn next on, it animates
  // set current to next, update all others


  
  return (
    <div className="relative h-full w-full"> 
      <div className="w-full h-full border-amber-400">
        <motion.div
          className="w-full h-full absolute"
          variants={variants}

        >
          <Image src={gallery[curr].img} alt="Anita & Jesus sitting together" className="w-full h-full object-cover z-0 absolute" />
          
        </motion.div>

        {nextDisplay &&
          <motion.div
            className="w-full h-full absolute"
            variants={variants}
            initial={direction}
            animate={transition}
            onAnimationComplete={() => {
              console.log("Animation done");
              if (direction == "next") {
                setCurr(next);
              }
              
              setNextDisplay(false);
              textAnimation.start("show").then(() => {
                setTimerEnable(true);
              })
            }}
          >
            <Image src={gallery[next].img} alt="Anita & Jesus sitting together" className="w-full h-full object-cover z-0 absolute" />
          </motion.div>
        }
      </div>
      <div className="flex flex-col justify-between absolute bottom-0 left-0 w-full z-100 items-center landing  h-full">
        <div className="flex flex-col justify-between w-11/12 mb-4 h-full h-full sm:h-[50vh]">
          <motion.div 
            className="flex flex-col items-center justify-center text-white font-canto w-auto h-auto mt-24 relative z-10"
            variants={parentVariants}
            initial={"hidden"}
            animate={textAnimation}
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
              onClick={prevClick}
            >
              <CircleChevronLeft className="text-white w-full h-full" strokeWidth={1}/>
            </div>
            <div 
              className="w-12 h-12 flex items-center"
              onClick={nextClick} 
            >
              <CircleChevronRight className="text-white w-full h-full" strokeWidth={1}/>
            </div>
          </div>
        </div>
          <div 
            className="w-full z-20 bg-amber-400"
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
        </div>


    </div>
  );
}

export default Gallery;
