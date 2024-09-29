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
    <footer className= "bg-[#f5f5f5] font-canto text-2xl flex flex-col items-center min-h-54 py-10 text-black flex flex-col items-center justify-around">
      <section className='w-full'>
        <div className='flex flex-col items-center justify-center mb-5'>
          <div className='flex w-full justify-around items-center'>
            <div className='flex flex-col items-center'>
              <div className='font-proxima'>
                {days}
              </div>
              <div className='font-canto font-bold'>
                Days
              </div>
            </div>
            <div className='flex flex-col items-center'>
              <div className='font-proxima'>
                {hours}
              </div>
              <div className='font-canto font-bold'>
                Hours
              </div>
            </div>
            <div className='flex flex-col items-center'>
              <div className='font-proxima'>
                {minutes}
              </div>
              <div className='font-canto font-bold'>
                Minutes
              </div>
            </div>
            <div className='flex flex-col items-center'>
              <div className='font-proxima'>
                {seconds}
              </div>
              <div className='font-canto font-bold'>
                Seconds
              </div>
            </div>
          </div>
          <div className='my-1'>
            Till We Say &quot;I Do&quot;
          </div>
        </div>
      </section>
      <section>
        <h5 className='text-center text-sm font-proxima'>Designed and Developed by <span className='font-semibold'><Link href="https://www.mherradura.com/" target='_blank'>Matthew Herradura</Link></span></h5>
      </section>
    </footer>
  );
}

export default Footer;