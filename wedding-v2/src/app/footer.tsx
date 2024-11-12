'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';


interface FooterProps {

}

const Footer: React.FC<FooterProps> = ({  }) => {

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const weddingDate = new Date("2025-08-29");

  const getTime = () => {
    const difference = weddingDate.getTime() - new Date().getTime();
    setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((difference / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((difference / 1000 / 60) % 60));
    setSeconds(Math.floor((difference / 1000) % 60));
  }
  
  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, []);

  /*
  setInterval(() => {
    setCurrentDate(new Date());
    //console.log(Math.abs(weddingDate.getTime() - currentDate.getTime()));
  }, 60000);

            <p>{`${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`}</p>
          <p>Till We say &quot;I do!&quot;</p>
  */
  return (
    <footer className= "bg-[#E0EEE0] font-canto flex flex-col items-center min-h-54 py-10 text-[#2E3105] flex flex-col gap-2 items-center justify-around">
      <section className='w-full'>
        <div className='flex flex-col items-center justify-center text-4xl gap-5'>
          <div className='flex items-center w-11/12 justify-center font-bold'>
            <div className='flex flex-col items-center w-full px-2'>
              <div>
                {days}
              </div>
              <div className='text-base font-normal'>
                Days
              </div>
            </div>
            <div className='flex flex-col items-center border-l w-full border-[#2E3105] px-2'>
              <div>
                {hours}
              </div>
              <div className='text-base font-normal'>
                Hours
              </div>
            </div>
            <div className='flex flex-col items-center border-l w-full border-[#2E3105] px-2'>
              <div>
                {minutes}
              </div>
              <div className='text-base font-normal'>
                Minutes
              </div>
            </div>
            <div className='flex flex-col items-center border-l w-full border-[#2E3105] px-2'>
              <div>
                {seconds}
              </div>
              <div className='text-base font-normal'>
                Seconds
              </div>
            </div>
          </div>
          <div className='text-2xl'>
            Till We Say I Do
          </div>
        </div>
      </section>
      <section>
        <hr className='m-auto h-px w-10/12 border-[#2E3105]'/>
        <h5 className='mt-5 text-center text-sm lg:text-lg'>Designed and Developed by <span className='underline'><Link href="https://www.mherradura.com/" target='_blank'>Matthew Herradura</Link></span></h5>
      </section>
    </footer>
  );
}

export default Footer;