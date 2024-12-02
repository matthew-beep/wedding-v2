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
      <section className='flex flex-col items-start w-11/12 px-2 border-2'>
        <h2 className='w-full text-2xl'>A&J</h2>
        <div className='flex gap-5 text-[#333333] text-xl border-2 w-full'>
          <div className='flex flex-col gap-2'>
            <Link href="/dresscode" className='underline'>Dress Code</Link>
            <Link href="https://www.amazon.com/wedding/share/anitajesusregistry" target='_blank' className='underline'>Registry</Link>
          </div>
          <div className='flex flex-col gap-2'>
            <Link href="/faq" className='underline'>FAQ</Link>
            <Link href="/rsvp" className='underline'>RSVP</Link>
          </div>
        </div>
      </section>
      <section className='w-full flex flex-col'>
        <hr className='m-auto h-px w-5/12 border-[#333333]'/>
        <h5 className='mt-5 text-center text-sm lg:text-lg text-[#333333]'>Designed and Developed by <span className='underline text-[#486A51]'><Link href="https://www.mherradura.com/" target='_blank'>Matthew Herradura</Link></span></h5>
      </section>
    </footer>
  );
}

export default Footer;