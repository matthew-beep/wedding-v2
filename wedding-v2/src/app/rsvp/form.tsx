'use client'
import React, { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

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
  const [attendance, setAttendance] = useState<AttendanceDocument[]>([])
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const attendanceRef = doc(db, 'attending', id);
    try {
      await setDoc(attendanceRef, {
        firstName: firstName,
        lastName:lastName,
        attending: true
      })
    } catch {
      console.log(error);
    }
  }

  /*
  const handleDecline = async (e: React.FormEvent) => { 

  }
  */

  return (
    <div className="relative bg-[#f5f5f5]"> 
      <section className="h-auto relative flex flex-col items-center font-canto">
        <form className='' onSubmit={handleSubmit}>
          <div className='flex gap-2'>
            <input type='search' placeholder ="First Name" value={firstName} className='border-2 rounded-lg w-1/2 p-2' disabled/>
            <input type='search' placeholder ="Last Name" value={lastName} className='border-2 rounded-lg w-1/2 p-2' disabled/>
          </div>
          <div className='flex gap-2'>
            <input 
              type="radio" 
              id="attending"
              name="attendance" 
            />
            <label htmlFor="attendance" className='text-xl font-bold'>Joyfully Accepts</label>
            
          </div>
          <div className='flex gap-2'>
            <input 
              type="radio" 
              id="notAttending"
              name="attendance" 
            />
            <label htmlFor="attendance" className='text-xl font-bold'>Respectfully Declines</label>
            
          </div>
          <button type="submit" className="bg-black text-white">Submit</button>
        </form>
      </section>
    </div>
  );
}

export default Form;