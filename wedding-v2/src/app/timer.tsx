'use client'
import React from 'react';
import { useState, useEffect } from 'react';


interface TimerProps {

}

const Timer: React.FC<TimerProps> = ({  }) => {

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const weddingDate = new Date('2025-08-29T15:00:00-07:00');


  const getTime = () => {
    const difference = weddingDate.getTime() - new Date().getTime();

    if (difference < 0) { // set timer to 0 when date has passed
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      return;
    }

    setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((difference / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((difference / 1000 / 60) % 60));
    setSeconds(Math.floor((difference / 1000) % 60));
  }
  


  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className='w-full flex items-center justify-center font-canto text-[#486A51] flex-col gap-10'>
      <div className='flex items-center w-11/12 lg:w-1/2 justify-center font-bold text-4xl'>
        <div className='flex flex-col items-center w-full px-2'>
          <div>
            {String(days).padStart(2, '0')}
          </div>
          <div className='text-base font-normal'>
            Days
          </div>
        </div>
        <div className='flex flex-col items-center border-l w-full border-[#486A51] px-2'>
          <div>
            {String(hours).padStart(2, '0')}
          </div>
          <div className='text-base font-normal'>
            Hours
          </div>
        </div>
        <div className='flex flex-col items-center border-l w-full border-[#486A51] px-2'>
          <div>
            {String(minutes).padStart(2, '0')}
          </div>
          <div className='text-base font-normal'>
            Minutes
          </div>
        </div>
        <div className='flex flex-col items-center border-l w-full border-[#486A51] px-2'>
          <div>
            {String(seconds).padStart(2, '0')}
          </div>
          <div className='text-base font-normal'>
            Seconds
          </div>
        </div>
      </div>
    </section>
  );
}

export default Timer;