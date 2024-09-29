'use client'
import { useState, useEffect } from "react";
import { ChevronDown } from 'lucide-react';
import { motion, easeOut, AnimatePresence, useAnimationControls } from 'framer-motion'


interface Question {
  id: number;
  q: string;
  a: string;
}

interface CollapsibleProps {
  question: Question;
}

const Collapsible: React.FC<CollapsibleProps> = ({ question }) => {
  const {q, a} = question;
  const [opened, setOpen] = useState(false);
  const controls = useAnimationControls();
  const header = useAnimationControls();

  useEffect(() => {
    console.log("loaded")
  },[])

  // rgb(229 231 235);

  const handleClick = () => {
    if (!opened) {
      setOpen(true);
      controls.start({
        transform: 'rotate(-180deg)'
      })
      header.start({
        backgroundColor: 'rgba(229,231,235, 1)'
      })
    } else {
      setOpen(false);
      controls.start({
        transform: 'rotate(0deg)'
      })
      header.start({
        backgroundColor: 'rgba(229,231,235, 0)'
      })
    }
  }

  const collapse = {
    hidden : {
      height: 0,
      opacity: 0
    },
    show : {
      height: 'auto',
      opacity: 1
    },
    exit:{
      height: 0,
      opacity: 0
    }
  }

  return (
    <motion.div 
      className="flex flex-col font-canto text-black border-y border-gray-200 w-full cursor-pointer"
      whileHover={{
        backgroundColor: 'rgba(229,231,235)'
      }}
      animate={header}
    >
      <div 
        className='flex items-center justify-between py-5 px-3' onClick={handleClick}
      >
        <h2 className='font-bold text-xl sm:text-3xl'>
          {q}
        </h2>
        <motion.div
          className="flex justify-center items-center"
          animate={controls}
        >
          <ChevronDown size={35} strokeWidth={1} className="w-full h-full text-xl cursor-pointer" />
        </motion.div>
      </div>
      <AnimatePresence>
        {opened && 
            <motion.div
              className='font-proxima text-lg sm:text-2xl overflow-y-hidden px-3'
              variants={collapse}
              initial="hidden"
              animate="show"
              exit="exit"
              transition={{ duration: 0.2, ease: easeOut }}  // transition for the height prop
            >
              <p className="">
                {a}
              </p>
            </motion.div>
        }
      </AnimatePresence>
    </motion.div>
  );
}

export default Collapsible;