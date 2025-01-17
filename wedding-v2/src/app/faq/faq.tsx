'use client'
import React from 'react';
import { motion, easeInOut } from 'framer-motion'
// import banner from '../img/faq.jpg';
import Collapsible from './collapsible';

interface FAQProps {
  windowWidth? : number;
}

const FAQ: React.FC<FAQProps> = ({ }) => {

  const questions =[
    {
      id: 1,
      q: "How do I RSVP?",
      a: "To RSVP, click the RSVP tab and type the name(s) listed on your envelope. Kindly RSVP by February 28th, 2025. If you are unable to attend, we would appreciate you to still let us know at the soonest opportunity. Any RSVPs received after this date will be marked as a 'no' as we will be sending final head counts to vendors after this deadline—you will be missed!"
    },
    {
      id: 2,
      q: "What time should I arrive?",
      a: "To avoid arriving late, please aim to come 30 to 45 minutes before the ceremony starts so you can mingle and grab your seat! Please plan to come preferably from 2:15-2:30 PM."
    },
    {
      id: 3,
      q: "What is the dress code?",
      a: "Imagine you’re attending a garden party but the goal is to be overdressed and outdress everyone. We highly encourage pastels, florals, and/or ruffles! Our male guests can come in a dress shirt with slacks. We also ask that you avoid the color yellow because that is the color of our bridal party. Anticipate the weather to be between 75 degrees during the day, and 68 after sunset."
    },
    {
      id: 4,
      q: "What should I definitely NOT wear?",
      a: "We hope you see this day as an opportunity to have fun and dress up! Please avoid sneakers, boots, and white/cream dresses to keep the footage of the day cohesive. We do hope you understand and respect this request. Much love!"
    },
    {
      id: 5,
      q: "Can I bring a plus one?",
      a: "Short answer is no. We wish we had unlimited funds to support this! Unfortunately, we are unable to accommodate plus ones unless it is specifically indicated on your envelope. When you go to RSVP, you will be able to see the exact number of people you can RSVP for. We want to keep our wedding intimate with our closest family and friends. :)"
    },
    {
      id: 6,
      q: "Where will the ceremony and reception be?",
      a: "The ceremony will be held outdoors at the venue. No need to travel in between! The reception will take place on the same property."
    },
    {
      id: 7,
      q: "How does seating work?",
      a: "The ceremony will be open seating, so sit wherever you please! However, we are requesting you avoid the first _ rows on each side at the ceremony for our immediate family and bridal party. For the reception, we will be carefully arranging tables so our guests are sat with those they know."
    },
    {
      id: 8,
      q: "What if I am late to the ceremony?",
      a: "The ceremony will be starting promptly at 3:00 PM. We recommend guests arrive between 2:15-2:30 PM so there is time to mingle and find your seat. If you do happen to be late, please DO NOT walk down the aisle to find your seat as you may be in the shot of the photographer and videographer. Instead, please wait at the terrace until the ceremony ends; this will be where everyone will reconvene for cocktail hour."
    },
    {
      id: 9,
      q: "Is there parking available?",
      a: "Yes! There is complimentary guest parking. Although we do recommend carpooling to prevent overcrowding."
    },
    {
      id: 10,
      q: "Can I bring my own alcohol?",
      a: "The venue has security and we would appreciate it if you do not bring your own alcohol or other substances onto the property. However, we do have an open bar for our guests, so we hope you enjoy that service! "
    },
    {
      id: 11,
      q: "How should I contact you for more info?",
      a: "If you still have any questions that are not answered here, please feel free to call or text Anita or Jesus! We appreciate you taking the time to read this through and hope this can alleviate any questions/concerns."
    }
  ]

  const variants = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: { 
        duration: 0.5, 
        ease: easeInOut,
        staggerChildren: 0.1 
      },
    }

  }

  const childVariants = {
    hidden: {
      translateY:"25%",
      opacity: 0
    },
    show: {
      translateY:"0%",
      opacity: 1,
      transition: {        
        duration: 0.5, 
        ease: easeInOut,
      }
    }
  }

  return (
    <div className="relative bg-[#FAFBF7]"> 
      <section className="min-h-svh sm:min-h-screen h-auto relative flex flex-col items-center lg:pb-8">
        <div className="h-auto border-gray-700 w-full flex pt-32 pb-4 lg:pt-48">
            <div 
              className="h-full w-full z-0 flex justify-center text-black font-canto"
            >
              <div 
                className="text-3xl xl:text-7xl font-bold flex items-center justify-center w-11/12 md:w-1/2 px-5"
              >
                <motion.hr 
                  className='h-px flex-grow border-[#486A51]'
                  initial={{
                    scaleX:0
                  }}
                  animate={{
                    scaleX:1,
                    transition: { 
                      delay: 0.2,
                      duration: 0.2, ease: easeInOut,
                    } 
                  }}
                  style={{
                    originX:1,
                  }}
                />
                <h2 className='mx-5 text-[#486A51]'>FAQs</h2>
                <motion.hr 
                  className='h-px flex-grow border-[#486A51]'
                  initial={{
                    scaleX:0
                  }}
                  animate={{
                    scaleX:1,
                    transition: { 
                      delay: 0.2,
                      duration: 0.2, ease: easeInOut,
                    } 
                  }}
                  style={{
                    originX:0,
                  }}
                />
              </div>
            </div>
        </div>
        <motion.div 
          className='flex flex-col w-11/12 xl:w-6/12 mt-5'
          variants={variants}
          initial={"hidden"}
          animate={"show"}
        >
          {questions.map(question => // Pass the question as a prop to the Collapsible component
            <motion.div
              variants={childVariants}
              key={question.id}
            >
              <Collapsible question={question} /> 
            </motion.div>
          )}
        </motion.div>
      </section>
    </div>
  );
}

export default FAQ;