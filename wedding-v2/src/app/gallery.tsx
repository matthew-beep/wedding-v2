

'use client'
import Image from "next/image";
import React from 'react';
import landing1 from './img/hero.jpg';
import landing2 from './img/elevator.jpg';
import landing3 from './img/pillars.jpg';
import landing4 from './img/dark.jpg';
import {useEffect, useState} from 'react'
import {motion, useTransform, useAnimationControls, easeInOut, useMotionValue, useSpring} from 'framer-motion'
import { CircleChevronRight, CircleChevronLeft } from 'lucide-react';



interface GalleryProps {

}


const Gallery: React.FC<GalleryProps> = ({}) => {
  const textAnimation = useAnimationControls();
  const [timerEnable, setTimerEnable] = useState<boolean>(true);
  const timer = useMotionValue(0);
  const timerEnd:number = 10;
  const [direction, setDirection] = useState<string>("next");
  const [transition, setTransition] = useState<string>("animate");

  const gallery = [
    { img: landing1 },
    { img: landing2 },
    { img: landing3 },
    { img: landing4 }
  ];

  const progress = useTransform(timer, [0, timerEnd], [0, 1])
  const [curr, setCurr] = useState(0);
  const [next, setNext] = useState(curr + 1); 
  const [prev, setPrev] = useState(gallery.length - 1);
  const [nextDisplay, setNextDisplay] = useState<boolean>(false);

  
  const variants =  {  // gallery transition animations
    next: {
      transform: 'translateX(100%)',
      opacity: 0,
      filter: 'blur(10px)'
    },

    prev: {
      transform:'translateX(-100%)',
      opacity: 0,
      filter: 'blur(10px)'
    },
    animate: {
      transform: 'translateX(0%)',
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: easeInOut }
    }
  }

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

  const scaleX = useSpring(progress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });


  
  useEffect(() => { // update index as gallery changes
    
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
  }, [curr])

  
  useEffect(() => { // initial text animation
    textAnimation.start("show");
  }, [])
  

  useEffect(() => {
    //Implementing the setInterval method
    let interval: NodeJS.Timeout | undefined;
    if (timerEnable) {
      //console.log("going from " + curr + " to " + next)
      //console.log(next)
      interval = setInterval(() => {
        const currTime = timer.get();
        if (currTime >= timerEnd) {
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
  }, [timer, timerEnable]);

  const nextClick = () => { 
    if (timerEnable) {
      const updatedNext = curr === gallery.length - 1 ? 0 : curr + 1; // Update next index
      console.log("going from " + curr + " to " + updatedNext + ", previous is " + prev)
      setNext(updatedNext); 
      setDirection("next"); 
      setTransition("animate");
      textAnimation.start("exit");
      setNextDisplay(true);
      timer.set(0);
      setTimerEnable(false);
    }
    setTimeout(() => {
      setTimerEnable(true);
      console.log("setting timer on")
    }, 1000);
  };

const prevClick = () => { 
  if (timerEnable) {
    console.log("going from " + curr + " to " + prev + ", next is " + next);
    
    // Set the next index to the previous one (prev)
    setNext(prev);
    
    // Set the direction for the animation to previous
    setDirection("prev");
    
    // Trigger the text exit animation first
    textAnimation.start("exit");
    
    // Set the transition to "animate" for the next image
    setTransition("animate");
    
    // Display the next image (which is the previous one)
    setNextDisplay(true);
    
    // Reset the timer
    timer.set(0);
    
    // Disable the timer to prevent multiple transitions at once
    setTimerEnable(false);
  }
  
  // After the animation, set the current index to previous and re-enable the timer
  setTimeout(() => {
    setTimerEnable(true);
    console.log("setting timer on");
  }, 1000);
}

  return (
    <div className="relative h-svh lg:h-screen w-full overflow-x-hidden"> 
      <div className="w-full h-full">
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
              } else {
                setCurr(prev);
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
        <div className="flex flex-col justify-between w-11/12 mb-4 h-full sm:h-[50vh]">
          <motion.div 
            className="flex flex-col items-center justify-center text-white font-canto w-auto h-auto mt-24 relative z-10 xl:mt-48"
            variants={parentVariants}
            initial={"hidden"}
            animate={textAnimation}
          >
            <motion.h1 
              className="text-6xl sm:text-9xl w-auto text-center font-semibold"
              variants={childVariants}
            >
              Anita & Jesus
            </motion.h1>
            <motion.div 
              className="flex text-2xl sm:text-5xl text-white text-center w-3/4 lg:w-7/12 xl:w-1/4 items-center justify-center px-1"
              variants={childVariants}
            >
              <motion.div 
                className="flex-grow z-20"
                initial={{
                  scaleX:0
                }}
                animate={{
                  scaleX:1,
                  transition: { 
                    delay: 0.5,
                    duration: 0.4, ease: easeInOut,
                  }
                }}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  originX: 1
                }}
              >
                <motion.div 
                  className="w-full h-0.5 sm:h-1 bg-white"
                  style={{
                    scaleX: scaleX,
                    originX: 1
                  }}
                >
                </motion.div>
              </motion.div>
              <h2 className="w-auto mx-1 mt-1">
                August 29, 2025
              </h2>
              <motion.div 
                className="flex-grow z-20"
                initial={{
                  scaleX:0
                }}
                animate={{
                  scaleX:1,
                  transition: { 
                    delay: 0.5,
                    duration: 0.4, ease: easeInOut,
                  }
                }}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  originX: 0
                }}
              >
                <motion.div 
                  className="w-full h-0.5 sm:h-1 bg-white"
                  style={{
                    scaleX: scaleX,
                    originX: 0
                  }}
                >
                </motion.div>
              </motion.div>
            </motion.div> 
          </motion.div>
          <div className="flex justify-between">
            <div 
              className="w-20 h-auto flex items-center cursor-pointer flex flex-col"
              onClick={prevClick}
            >
              <CircleChevronLeft className="text-white" strokeWidth={1.5} size={48}/>
              <h4 className="text-white font-canto font-bold">{"0" + (prev + 1)}</h4>
            </div>
            <div 
              className="w-20 h-20 flex items-center cursor-pointer flex flex-col"
              onClick={nextClick} 
            >
              <CircleChevronRight className="text-white" strokeWidth={1.5} size={48}/>
              <h4 className="text-white font-canto font-bold">{"0" + (next + 1)}</h4>
            </div>
          </div>
        </div>
        {false &&
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
        }
        </div>


    </div>
  );
}

export default Gallery;
