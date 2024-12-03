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
      translateY: '50%',
      filter:'blur(10px)', 
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

  /*
  <div className="font-canto pt-10 pb-5 px-5 text-black flex flex-col justify-start items-center gap-2">
    <h3 className="text-5xl font-semibold">Event Details</h3>
    <h4 className='text-2xl w-2/3 text-center'>Event Start: 3:00 PM</h4>
    <hr className='h-px w-6/12'/>
    <h4 className='text-2xl w-2/3 text-center'>Note: We advise arriving 30 - 45 minutes early. Please read the FAQ for more info and don&apos;t forget to RSVP!</h4>
    <button className="text-2xl px-3 py-2 bg-black text-white rounded-full w-full font-bold mt-1 flex justify-center items-center">
      <Link href="../faq" className="flex items-center justify-center w-full h-full">
        <h4 className='text-xl'>FAQ</h4>
      </Link>
    </button>
  </div>
  
*/
  return (
    <div className="relative bg-[#FAFBF7]"> 
      <section className="min-h-svh sm:min-h-screen h-auto relative flex flex-col">
        <div className="h-[50svh]">
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
              Dresscode
            </motion.h2>
          </div>
        </div>
        <section className='h-auto font-canto p-5 flex flex-col gap-5'>
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col'>
              <h2 className='text-[#486A51] text-2xl flex flex-col'>
                WEDDING DAY DRESS CODE
              </h2>
              <h3 className='text-[#919191]'>
                Information & Inspiration
              </h3>
            </div>
            <p className='text-[#333333] text-lg'>
              We&apos;d love to see our friends and family dress up on our big day! Please come in an elegant garden party where the goal is to dress to impress. 
              Embrace ruffles, pastels, and florals—bring your most stunning and standout style! We kindly ask that you avoid wearing silk pastel yellow, 
              as it&apos;s reserved for our bridal party. We can&apos;t wait to capture everlasting moments with you in your fantastic outfits!
            </p>
            <p className='text-[#333333] text-lg'>
              If you need more help and inspiration on what to wear, check out this <Link href="https://pin.it/56ZtGr2Jr" target='_blank' className='underline text-[#486A51] pointer'>Pinterest Board!</Link> 
            </p>
          </div>
          <div className='flex'>
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