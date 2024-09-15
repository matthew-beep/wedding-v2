'use client'
import { get } from 'http';
import React from 'react';
import { useState, useEffect } from 'react';


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
  */
  return (
    <footer className="h-auto bg-white font-canto text-2xl flex flex-col items-center py-20">
      <section>
        <div>
          {days + " Days " + hours + " Hours " + minutes + " Minutes " + seconds + " Seconds"}
        </div>
      </section>
      <section>
        <h5>Designed and Developed by <span>Matthew Herradura</span></h5>
      </section>
    </footer>
  );
}

export default Footer;