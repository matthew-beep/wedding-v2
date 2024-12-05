'use client'
import React from 'react';
import { motion, easeOut } from 'framer-motion';
import men from '../img/men.jpeg'
import women from '../img/women.jpeg'
import Image from "next/image";
import Link from 'next/link';

interface DresscodeProps {
  windowWidth? : number;
}

const Dresscode: React.FC<DresscodeProps> = ({ }) => {

  const textAnimation = {
    hidden: {              
      opacity: 0,
      translateY: '25%',
      filter:'blur(5px)', 
    },
    show: {
      opacity: 1,
      translateY: '0%',
      filter:'blur(0px)', 
      transition: { 
        duration: 0.5, 
        ease: easeOut,
      }
    }
  }

  return (
    <div className="relative bg-[#FAFBF7]"> 
      <section className="min-h-svh sm:min-h-screen h-auto relative flex flex-col">
        <div className="h-[50svh] lg:h-[60vh]">
          <div 
          className="h-auto w-full z-0 flex pt-24 justify-center text-white font-canto dress"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
            width: "100%",
          }}
          >
            <motion.h2 
              className="text-6xl font-bold"
              variants={textAnimation}
              initial="hidden"
              animate="show"
            >
              Dress Code
            </motion.h2>
          </div>
        </div>
        <section className='h-auto font-canto px-5 py-12 flex flex-col gap-5'>
          <div className='flex flex-col gap-5 lg:gap-12 w-full lg:items-center'>
            <div className='flex flex-col lg:items-center'>
              <h2 className='text-[#486A51] text-3xl lg:text-6xl flex flex-col'>
                WEDDING DAY DRESS CODE
              </h2>
              <h3 className='text-[#919191] lg:text-xl'>
                Information & Inspiration
              </h3>
            </div>
            <p className='text-[#333333] text-lg lg:text-xl lg:w-7/12 lg:text-center'>
              We&apos;d love to see our friends and family dress up on our big day! Please come in an elegant garden party where the goal is to dress to impress. 
              Embrace ruffles, pastels, and florals—bring your most stunning and standout style! We kindly ask that you avoid wearing silk pastel yellow, 
              as it&apos;s reserved for our bridal party. We can&apos;t wait to capture everlasting moments with you in your fantastic outfits!
            </p>
            <p className='text-[#333333] text-lg lg:text-xl'>
              If you need more help and inspiration on what to wear, check out this <Link href="https://pin.it/56ZtGr2Jr" target='_blank' className='underline text-[#486A51] pointer'>Pinterest Board!</Link> 
            </p>
          </div>
          <div className='flex w-full lg:w-1/2 lg:m-auto lg:p-12 gap-5 lg:gap-24 items-center justify-center'>
            <Image 
              src={men} 
              alt="A collection of men wearing wedding attire in pastel colors " 
              className="w-1/2 h-full object-cover object-center" 
            />
            <Image 
              src={women} 
              alt="A collection of men wearing wedding attire in pastel colors " 
              className="w-1/2 h-full object-cover object-center" 
            />
          </div>
        </section>
      </section>
    </div>
  );
}

export default Dresscode;