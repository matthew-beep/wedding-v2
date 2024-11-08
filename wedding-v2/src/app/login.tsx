'use client'
import React, { useState } from 'react';
import { collection, where, query, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { LoaderCircle } from 'lucide-react';
import { motion } from 'framer-motion';


interface LoginProps {
  windowWidth? : number;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}


const Login: React.FC<LoginProps> = ({ setAuth }) => {

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (typeof window !== 'undefined') { 
      window.scrollTo(0, 0)
    }
  
    checkMatch(firstName, lastName).then((result) => {
      if (result) {
        setAuth(true);
        sessionStorage.setItem('isLoggedIn', 'true');
        console.log("logging in")
      } else {
        alert("Sorry, no invite was found for " + "\"" + firstName + " " + lastName + "\"");
      }
    });
  };

  async function checkMatch(firstname:string, lastname:string) {

    setLoading(true);
    try {
      const userRef = collection(db, 'rsvp');
      const q = query(
        userRef,
        where("firstName", "==", firstname),
        where("lastName", "==", lastname)
      );
  
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        snapshot.forEach((doc) => {
          console.log("Document ID:", doc.id);
          console.log("Data:", doc.data());
        });
      }
      console.log("Match Found")
      return !snapshot.empty;
    } catch (error) {
      console.log("nothing found")
      return false;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative bg-[#f5f5f5] w-full h-screen flex items-center justify-start pt-24 gap-10 flex-col">
      <h1 className='font-canto text-5xl text-[#515B3E] font-bold'>A&J</h1>
      {!loading &&
        <div className='w-11/12 sm:w-5/12 md:w-6/12 xl:w-3/12 h-9/12 flex flex-col justify-center items-center gap-10 px-5 py-10'>
          <div className='w-auto flex flex-col items-center gap-2 font-proxima'>
            <div className='flex w-full justify-center items-center gap-5 px-2 text-[#515B3E]'>
              <hr className='w-full bg-[#515B3E] h-0.5'/>
              <h2 className='text-3xl font-bold'>Welcome</h2>
              <hr className='w-full bg-[#515B3E] h-0.5'/>
            </div>
            <h3 className='text-md xl:text-lg text-[#575757]'>Please enter your name to access the site</h3>
          </div>
          <div className='w-full flex flex-col gap-5'>
            <div className='flex flex-col'>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className='text-xl font-canto text-black rounded-md focus:outline-none border-[#d9d9d9] border px-3 py-2 caret-black placeholder:font-canto bg-[#F5F5F5]'
                placeholder='First Name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className='flex flex-col'>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className='text-xl text-black font-canto rounded-md focus:outline-none border-[#d9d9d9] border px-3 py-2 caret-black placeholder:font-canto bg-[#F5F5F5]'
                placeholder='Last Name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <button className='p-1 bg-[#515B3E] w-full font-proxima text-2xl rounded-md text-white' onClick={handleLogin}>Login</button>
        </div>
      }
      {loading && 
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.1 }}>
          <motion.div
            animate={{rotate: 360}}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          >
            <LoaderCircle color="#515B3E" size={30}/>
          </motion.div>
        </motion.div>
      }
      
    </div>
  );
}

export default Login;