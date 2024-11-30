'use client'
import React from 'react';
import Link from 'next/link';
import Timer from './timer'


interface FooterProps {

}

const Footer: React.FC<FooterProps> = ({  }) => {
  return (
    <footer className= "bg-[#E2E5DE] font-canto flex flex-col min-h-54 py-10 text-[#486A51] flex flex-col gap-5 items-center justify-center">
      <Timer />
      <section className='border-2 w-full flex flex-col'>
        <h2 className='border-2 w-5/12'>A&J</h2>
        <hr className='m-auto h-px w-5/12 border-[#333333]'/>
        <h5 className='mt-5 text-center text-sm lg:text-lg text-[#333333]'>Designed and Developed by <span className='underline text-[#486A51]'><Link href="https://www.mherradura.com/" target='_blank'>Matthew Herradura</Link></span></h5>
      </section>
    </footer>
  );
}

export default Footer;