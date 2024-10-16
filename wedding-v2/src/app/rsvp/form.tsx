'use client'
import React, { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, setDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { LoaderCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface RSVPProps {
  windowWidth? : number;
  firstName: string;
  lastName: string;
  id: string;
}

interface AttendanceDocument {
  id: string;
  firstName: string;
  lastName: string;
  attending: boolean;
}

const Form: React.FC<RSVPProps> = ({ firstName, lastName, id }) => {
  const [value, error] = useCollection(collection(db, 'attending'));
  const [attendance, setAttendance] = useState<AttendanceDocument[]>([]);
  const [attending, setAttending] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //const attendanceRef = collection(db, 'attending');
  //const listRef = collection(db, 'rsvp');


  useEffect(() => {
    if (value) {
      // Map the documents and set the rsvpList state
      const fetchedRsvpList: AttendanceDocument[] = value.docs.map(doc => ({
         // Extract the document ID
        ...doc.data() as AttendanceDocument, // Type assertion to RSVPDocument
        id: doc.id,
      }));
      // Update the state
      setAttendance(fetchedRsvpList);
    }
  }, [value]);

  useEffect(() => {
    console.log(attendance)
  }, [attendance])

  useEffect(() => {
    console.log(attending)
  }, [attending])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const attendanceRef = doc(db, 'attending', id);
    const rsvpList = doc(db, 'rsvp', id);
    try {
      await setDoc(attendanceRef, {
        firstName: firstName,
        lastName:lastName,
        attending: attending
      })
      
      await updateDoc(rsvpList, {
        attending: attending,
        submitted: true
      })
      
      setIsSubmitted(true);
      
    } catch {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttending(e.target.value === 'accept')
  }

  const thankYou = (
    <div className='font-canto flex flex-col items-center'>
      <h4 className='text-2xl font-bold'>Thank You</h4>
      <p>Your response has been submitted.</p>
    </div>
  )

  const form = (
    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
      <div className='flex gap-2'>
        <div className='flex flex-col'>
          <label htmlFor="firstName" className='text-lg font-bold'>First Name</label>
          <input type='search' id="firstName" placeholder ="First Name" value={firstName} className='border-2 rounded-lg w-full p-2' disabled/>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="lastName" className='text-lg font-bold'>Last Name</label>
          <input type='search' id="lastName" placeholder ="Last Name" value={lastName} className='border-2 rounded-lg w-full p-2' disabled/>
        </div>
      </div>
      <div>
        <div className='flex items-center gap-1'>
          <h3 className='text-xl font-bold'>Will you be Attending?</h3>
          <h4 className='text-sm text-[#666666]'>(required)</h4>
        </div>
        <div className='flex gap-2'>
          <input 
            type="radio" 
            id="attending"
            name="attendance" 
            value="accept"
            onChange={handleSelect}
          />
          <label htmlFor="attendance" className='text-lg'>Joyfully Accepts</label>
        </div>
        <div className='flex gap-2'>
          <input 
            type="radio" 
            id="notAttending"
            name="attendance"
            value="decline" 
            onChange={handleSelect}
          />
          <label htmlFor="attendance" className='text-lg'>Respectfully Declines</label>
        </div>
      </div>

      <button type="submit" className="py-2 w-full bg-black text-white font-canto text-3xl rounded-lg mt-10">Submit</button>
    </form>
  )

  return (
    <div className="relative bg-[#f5f5f5] text-black"> 
      <section className="h-auto relative flex flex-col items-center font-canto">
        {!isSubmitted && !isLoading && form}
        {isLoading && 
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.1 }}>
              <motion.div
                animate={{rotate: 360}}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <LoaderCircle />
              </motion.div>
          </motion.div>
        }
        {isSubmitted && !isLoading && thankYou}
      </section>
    </div>
  );
}

export default Form;