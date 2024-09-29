'use client'
import React from 'react';
import { ChevronDown } from 'lucide-react';
// import { motion } from 'framer-motion'


interface Question {
  id: number;
  q: string;
  a: string;
}

interface CollapsibleProps {
  question: Question;
}

const Collapsible: React.FC<CollapsibleProps> = ({ question }) => {
  const {q, a} = question;

  return (
    <div className="flex flex-col font-canto my-2 text-black">
      <div className=' flex items-center'>
        <h2 className='font-bold text-lg'>
          {q}
        </h2>
        <ChevronDown className="ml-auto text-3xl cursor-pointer" />
      </div>
      <p className='h-auto'>{a}</p>
    </div>
  );
}

export default Collapsible;