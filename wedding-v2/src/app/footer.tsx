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
      <section className='flex flex-col items-start w-11/12 px-2 mt-10'>
        <div className='flex gap-5 text-[#333333] text-xl w-full'>
          <div className='flex flex-col gap-5 items-center w-full text-[#486A51]'>
            <Link href="/" >Save The Date</Link>
            <Link href="/dresscode" >Dress Code</Link>
            <Link href="https://www.amazon.com/wedding/share/anitajesusregistry" target='_blank' >Registry</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/rsvp">RSVP</Link>
          </div>
        </div>
      </section>
      <section className='w-full flex flex-col mt-5'>
        <h5 className='text-center text-sm lg:text-lg text-[#333333]'>Designed and Developed by <span className='underline text-[#486A51]'><Link href="https://www.mherradura.com/" target='_blank'>Matthew Herradura</Link></span></h5>
      </section>
    </footer>
  );
}

export default Footer;