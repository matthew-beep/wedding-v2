'use client'
import React, { useEffect, useState } from 'react';
import Search from './search'
import Form from './form'
import { motion, easeOut } from 'framer-motion'
import banner from '../img/rsvp.jpg';

interface RSVPProps {
  windowWidth? : number;
}


const RSVP: React.FC<RSVPProps> = ({ }) => {
  const [search, setSearch] = useState<boolean>(true);
  const [form, setForm] = useState<boolean>(false);
  // const [submitted, setSubmitted] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [id, setId] = useState<string>("");

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
  useEffect(() => {
    console.log("search stage: " + search)
    console.log("form stage: " + form)
  }, [search, form])

  useEffect(() => {
    console.log(firstName + " " + lastName + ", " + id)
  }, [firstName, lastName])

  return (
    <div className="relative bg-[#f5f5f5]"> 
      <section className="h-auto relative flex flex-col items-center">
      <div className="h-[50svh] border-gray-700 w-full flex">
        <div 
          className="h-full w-full z-0 flex justify-center pt-32 text-white font-canto"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, .75) 0%, rgba(0, 0, 0, 0.15) 30%), url(${banner.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <motion.h2 
            className="text-3xl xl:text-8xl font-bold"
            variants={textAnimation}
            initial="hidden"
            animate="show"
          >
            RSVP
          </motion.h2>
        </div>
      </div>
      <div className='py-5 border-2 w-full'>
        <div className='border-2 text-center flex flex-col gap-2'>
          <h1 className='text-3xl font-canto font-bold'>Will you be at our celebration?</h1>
          <h2 className='text-xl font-canto'>To RSVP, please search for and select your name.</h2>
        </div>
        {search && <Search setSearch={setSearch} setForm={setForm} setFirstName={setFirstName} setLastName={setLastName} setId={setId}/>}
        {form && <Form firstName={firstName} lastName={lastName} id={id} />}
      </div>
      </section>
    </div>
  );
}

export default RSVP;