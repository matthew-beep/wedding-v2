'use client'
import React, { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, setDoc, doc, updateDoc, query, where, getDocs, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { LoaderCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface RSVPProps {
  windowWidth? : number;

}

interface AttendanceDocument {

}


async function checkMatch(firstname:string, lastname:string): Promise<string> {
  try {
    let userId:string = "";
    const userRef = collection(db, 'rsvp');
    const q = query(
      userRef,
      where("firstName", "==", firstname),
      where("lastName", "==", lastname)
    );

    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      throw new Error("Invite not found for " + firstname + " " + lastname + ". Please enter your name exactly as it was written on the invite");
    } else {
      console.log("Found invite for " + firstname + " " + lastname);
      snapshot.forEach((doc) => {
        userId = doc.id;
        const submitted = doc.data().submitted;
        console.log("Document ID:", userId);
        //console.log("Data:", doc.data());
        if (submitted) {
          throw new Error("Response has already been submitted");
        }
      });
    }


    return userId;

  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  } 
}

async function checkRsvp(id:string): Promise<boolean> {
  try {
    // now check rsvp if guest has already submitted form
    const rsvpRef = doc(db, 'attending', id);
    const docSnap = await getDoc(rsvpRef);
    

    if (docSnap.exists()) {
      console.log("Rsvp already exists");
      throw new Error(" RSVP has already been submitted");
    } else {
      console.log("No rsvp found for this guest");
    }

    return docSnap.exists();
  } catch (error) { 
    console.error("Error getting documents: ", error);
    throw error;
  }
  return true;
}


const Form: React.FC<RSVPProps> = ({  }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [diet, setDiet] = useState<string>("");
  const [text, setText] = useState<string>("");

  const [value, error] = useCollection(collection(db, 'attending'));
  const [attendance, setAttendance] = useState<AttendanceDocument[]>([]);
  const [attending, setAttending] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);


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

  const handleFirst = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleLast = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleDiet = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDiet(event.target.value);
  };

  const handleText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttending(e.target.value === 'accept')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {

      // need to make sure that user is invited
      const id = await checkMatch(firstName, lastName);

      // and check that no RSVP was already submitted
      await checkRsvp(id);

      // need to add the info to the docs 
      const attendanceRef = doc(db, 'attending', id);
      const rsvpList = doc(db, 'rsvp', id);
      console.log(rsvpList);
      if (attending) {
        await setDoc(attendanceRef, {
          firstName: firstName,
          lastName: lastName,
          attending: attending,
          email: email,
          diet: diet,
          text: text
        })
      }
      
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
          <label htmlFor="firstName" className='text-lg'>First Name <span className='text-sm text-[#666666]'>(required)</span></label>
          <input 
            type='search' 
            id="firstName" 
            placeholder ="First Name" 
            value={firstName} 
            onChange={handleFirst}
            className='border-2 rounded-none w-full p-2 focus:outline-none focus:border-[#333333]'/>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="lastName" className='text-lg'>Last Name <span className='text-sm text-[#666666]'>(required)</span></label>
          <input 
            type='search' 
            id="lastName" 
            placeholder ="Last Name" 
            value={lastName}
            onChange={handleLast} 
            className='border-2 rounded-none w-full p-2 focus:outline-none focus:border-[#333333]'/>
        </div>
      </div>
      <div>
        <div className='flex flex-col'>
          <label htmlFor="email" className='text-lg'>Email</label>
          <input 
            type='search' 
            id="email" 
            placeholder ="Email" 
            value={email} 
            onChange={handleEmail}
            className='border-2 rounded-none w-full p-2 focus:outline-none focus:border-[#333333]'/>
        </div>
      </div>
      <div>
        <div className='flex items-center gap-1'>
          <h3 className='text-xl'>Will you be Attending?</h3>
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
      <div>
        <div className='flex flex-col'>
          <label htmlFor="diet" className='text-lg'>Please list any dietary restrictions:</label>
          <input 
            type='search' 
            id="diet" 
            placeholder ="Ex: Peanuts, shellfish, etc." 
            value={diet} 
            onChange={handleDiet}
            className='border-2 rounded-none w-full p-2 focus:outline-none focus:border-[#333333]'/>
        </div>
      </div>
      <div>
        <div className='flex flex-col'>
          <label htmlFor="text" className='text-lg'>Any Questions / Comments?</label>
          <textarea
            id="text" 
            value={text} 
            onChange={handleText}
            className='border-2 rounded-none w-full p-2 focus:outline-none focus:border-[#333333]'/>
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