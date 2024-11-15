'use client'
import React from 'react';
import Link from 'next/link';
import Timer from './timer'


interface FooterProps {

}

const Footer: React.FC<FooterProps> = ({  }) => {
  return (
    <footer className= "bg-[#FFFDC1] font-canto flex flex-col min-h-54 py-10 text-[#333333] flex flex-col gap-5 items-center justify-center">
      <Timer />
      <section>
        <hr className='m-auto h-px w-10/12 border-[#333333]'/>
        <h5 className='mt-5 text-center text-sm lg:text-lg'>Designed and Developed by <span className='underline'><Link href="https://www.mherradura.com/" target='_blank'>Matthew Herradura</Link></span></h5>
      </section>
    </footer>
  );
}

export default Footer;