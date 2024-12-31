'use client'
import React, { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, setDoc, doc, updateDoc, query, where, getDocs, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { LoaderCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import 'add-to-calendar-button';

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
      where("firstName", "==", firstname.trim()),
      where("lastName", "==", lastname.trim())
    );

    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      alert("Invite not found for " + firstname + " " + lastname + ". Please enter your name exactly as it was written on the invite");
      throw new Error("Invite not found for " + firstname + " " + lastname + ". Please enter your name exactly as it was written on the invite");
    } else {
      console.log("Found invite for " + firstname + " " + lastname);
      snapshot.forEach((doc) => {
        userId = doc.id;
        const submitted = doc.data().submitted;
        console.log("Document ID:", userId);
        //console.log("Data:", doc.data());
        if (submitted) {
          alert("A response was already submitted for " + firstname + " " + lastname); 
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

async function checkRsvp(id:string, firstname:string, lastname:string): Promise<boolean> {
  try {
    // now check rsvp if guest has already submitted form
    const rsvpRef = doc(db, 'attending', id);
    const docSnap = await getDoc(rsvpRef);
    

    if (docSnap.exists()) {
      
      console.log("Rsvp already exists");
      alert("A response was already submitted for " + firstname + " " + lastname); 
      throw new Error(" RSVP has already been submitted");
    } else {
      console.log("No rsvp found for this guest");
    }

    return docSnap.exists();
  } catch (error) { 
    console.error("Error getting documents: ", error);
    throw error;
  }
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

  const [message, setMessage] = useState<string>("We are so excited to see you there!");

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

  const handleResponse = () => {
    setIsSubmitted(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setDiet("");
    setText("");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {

      // need to make sure that user is invited
      const id = await checkMatch(firstName, lastName);

      // and check that no RSVP was already submitted
      await checkRsvp(id, firstName, lastName);

      // need to add the info to the docs 
      const attendanceRef = doc(db, 'attending', id);
      const absentRef = doc(db, 'absent', id);
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
      } else {
        setMessage("Wish we could see you, thanks for your response!");
        await setDoc(absentRef, {
          firstName: firstName,
          lastName: lastName,
          attending: attending,
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
  // TODO: need to add new collection for not going
  const thankYou = (
    <div className='font-canto flex flex-col items-center bg-[#FAFBF7] w-full text-[#333333]'>
      <div className='flex flex-col items-center gap-5'>
        <h4 className='text-3xl font-bold'>Thank You</h4>
        <p className='text-lg'>{message}</p>
        <hr className='h-px mt-2 mb-5 w-9/12'/>
      </div>
      <div 
        className='flex items-center justify-center lg:justify-between gap-5 p-5 w-full lg:w-1/4'>
        <button
          onClick={handleResponse}
          className='h-full flex py-2 items-center justify-center text-[#486A51] text-lg lg:text-xl rounded-full hover:opacity-75 duration-100 transition-all'
          style={{
            width: attending ? '' : '100%',
          }}
        >
          Submit Another Response
        </button>
        {attending &&
          <button>
            <add-to-calendar-button
              name="Anita & Jesus Get Married"
              description="Come celebrate our love!"
              startDate="2025-08-29"
              endDate="2025-08-29"
              startTime="15:00"
              endTime="21:00"
              location="Rock Creek Gardens, Puyallap"
              options="['Apple','Google','iCal','Outlook.com']"
              timeZone="America/Los_Angeles"
              trigger="click"
              inline
              listStyle="modal"
              iCalFileName="Reminder-Event"
              buttonStyle='round'
              styleLight="--btn-background: #486A51; --btn-text: #fff; --font: Canto, 'Times New Roman', Times, serif;"
              styleDark="--btn-background: #000;"
            />
          </button>
        }
      </div>
    </div>
  )

  const form = (
    <form className='flex flex-col gap-8 bg-[#FAFBF7] w-full px-5 lg:items-center lg:justify-center' onSubmit={handleSubmit}>
      <div className='flex gap-2 lg:w-4/12 items-center justify-center'>
        <div className='flex flex-col w-full'>
          <label htmlFor="firstName" className='text-xl text-[#486A51]'>First Name <span className='text-sm text-[#919191]'>(required)</span></label>
          <input 
            type='search' 
            id="firstName" 
            placeholder ="First Name" 
            value={firstName} 
            onChange={handleFirst}
            className='border-2 border-[#E2E5DE] rounded-none w-full p-2 focus:outline-none focus:border-[#486A51] bg-white'
            required
            />
        </div>
        <div className='flex flex-col w-full'>
          <label htmlFor="lastName" className='text-xl text-[#486A51]'>Last Name <span className='text-sm text-[#919191]'>(required)</span></label>
          <input 
            type='search' 
            id="lastName" 
            placeholder ="Last Name" 
            value={lastName}
            onChange={handleLast} 
            className='border-2 border-[#E2E5DE] rounded-none w-full p-2 focus:outline-none focus:border-[#486A51] bg-white'
            required
            />
        </div>
      </div>
      <div className='lg:w-4/12'>
        <div className='flex flex-col'>
          <label htmlFor="email" className='text-xl text-[#486A51]'>Email</label>
          <input 
            type='search' 
            id="email" 
            placeholder ="Email" 
            value={email} 
            onChange={handleEmail}
            className='border-2 border-[#E2E5DE] rounded-none w-full p-2 focus:outline-none focus:border-[#486A51] bg-white'/>
        </div>
      </div>
      <div className='flex flex-col gap-1 lg:w-4/12'>
        <div className='flex items-center gap-1'>
          <h3 className='text-xl text-[#486A51]'>Can we look forward to see you there?</h3>
          <h4 className='text-sm text-[#919191]'>(required)</h4>
        </div>
        <div className='flex gap-2'>
          <input 
            type="radio" 
            id="attending"
            name="attendance" 
            value="accept"
            onChange={handleSelect}
          />
          <label htmlFor="attendance" className='text-lg text-[#333333]'>Yes! Can&apos;t wait to celebrate!</label>
        </div>
        <div className='flex gap-2'>
          <input 
            type="radio" 
            id="notAttending"
            name="attendance"
            value="decline" 
            onChange={handleSelect}
            required
          />
          <label htmlFor="notAttending" className='text-lg text-[#333333]'>Sad to miss, but sending love from afar</label>
        </div>
      </div>
      <div className='lg:w-4/12'>
        <div className='flex flex-col'>
          <label htmlFor="diet" className='text-lg text-[#486A51]'>Please list any dietary restrictions:</label>
          <input 
            type='search' 
            id="diet" 
            placeholder ="Ex: Peanuts, shellfish, etc." 
            value={diet} 
            onChange={handleDiet}
            className='border-2 border-[#E2E5DE] rounded-none w-full p-2 focus:outline-none focus:border-[#486A51] bg-white'/>
        </div>
      </div>
      <div className='lg:w-4/12'>
        <div className='flex flex-col'>
          <label htmlFor="text" className='text-lg text-[#486A51]'>Any Questions / Comments?</label>
          <textarea
            id="text" 
            value={text} 
            onChange={handleText}
            className='border-2 border-[#E2E5DE] rounded-none w-full p-2 min-h-32 focus:outline-none focus:border-[#486A51] bg-white'/>
        </div>
      </div>
      <button type="submit" className="bg-[#486A51] lg:w-4/12 py-2 w-full text-white font-canto text-3xl rounded-full hover:bg-[#3b4d40] duration-200 transition-all">Submit</button>
    </form>
  )

  return (
    <div className="relative bg-[#FAFBF7] text-black"> 
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