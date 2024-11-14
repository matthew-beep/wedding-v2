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
    <div className="relative bg-[#FFFDC1] w-full sm:h-screen h-svh flex items-center justify-start pt-24 gap-10 flex-col">
      {!loading &&
        <div className='w-11/12 sm:w-5/12 md:w-6/12 xl:w-3/12 h-9/12 flex flex-col justify-center items-center gap-10 px-5 py-10'>
          <div className='w-auto flex flex-col items-center gap-2 font-canto text-[#333333] w-full'>
            <div className='flex w-1/3 justify-center items-center gap-2'>
              <hr className='w-full border-t-[#333333] h-0.5'/>
              <h1 className='font-canto text-3xl text-[#333333] font-bold'>A&J</h1>
              <hr className='w-full border-t-[#333333] h-0.5'/>
            </div>
            <h2 className='text-7xl font-bold'>Welcome</h2>
            <h3 className='text-base xl:text-lg text-[#333333]'>Please enter your name</h3>
            <hr className='w-1/4 mt-8 border-t-[#333333]  h-0.5'/>
          </div>
          <div className='w-full flex flex-col gap-5'>
            <div className='flex flex-col'>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className='text-xl font-canto text-black focus:outline-none focus:border-[#333333] border-[#999999] border px-3 py-2 caret-black placeholder:font-canto bg-[#FEFEFB] placeholder:text-[#878787]'
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
                className='text-xl font-canto text-black focus:outline-none focus:border-[#333333] border-[#999999] border px-3 py-2 caret-black placeholder:font-canto bg-[#FEFEFB] placeholder:text-[#878787]'
                placeholder='Last Name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <button className='p-2 bg-[#D69B43] w-full font-canto font-bold flex items-center justify-center text-2xl rounded-full text-[#FFFDC1]' onClick={handleLogin}>
            LOGIN
          </button>
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