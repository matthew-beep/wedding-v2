'use client'
import React, { useState } from 'react';

interface PasswordProps {
  windowWidth? : number;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}


const Password: React.FC<PasswordProps> = ({ setAuth }) => {

  const [password, setPassword] = useState<string>('');
  
  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (password == process.env.NEXT_PUBLIC_PASSWORD_ID) {
      setAuth(true);
      sessionStorage.setItem('isPasswordIn', 'true');
      console.log("logging in")
    } else {
      alert("Password is incorrect");
    }
  };

  return (
    <div className="relative bg-[#FAFBF7] w-full sm:h-screen h-svh flex items-center justify-start pt-24 gap-10 flex-col">
      <div className='w-11/12 sm:w-5/12 md:w-6/12 xl:w-3/12 h-9/12 flex flex-col justify-center items-center gap-10 px-5 py-10'>
        <div className='w-auto flex flex-col items-center gap-2 font-canto text-[#333333] w-full'>
          <div className='flex w-1/3 justify-center items-center gap-2'>
            <hr className='w-full border-t-[#486A51] h-0.5'/>
            <h1 className='font-canto text-3xl text-[#486A51] font-bold'>A&J</h1>
            <hr className='w-full border-t-[#486A51] h-0.5'/>
          </div>
          <h2 className='text-7xl font-bold'>Welcome</h2>
          <h3 className='text-base xl:text-lg text-[#486A51]'>Please enter your name</h3>
          <hr className='w-1/4 mt-8 border-t-[#486A51]  h-0.5'/>
        </div>
        <div className='w-full flex flex-col gap-5'>
          <div className='flex flex-col'>
            <input
              type="password"
              id="password"
              name="firstName"
              className='text-xl font-canto text-black rounded-none focus:outline-none focus:border-[#486A51] border-[#999999] border px-3 py-2 caret-black placeholder:font-canto bg-[#FEFEFB] placeholder:text-[#878787]'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button className='p-2 bg-[#486A51] w-1/3 sm:1/4 font-canto flex text-center items-center justify-center text-2xl rounded-full text-[#FAFBF7]' onClick={handleLogin}>
          Enter
        </button>
      </div>
    </div>
  );
}

export default Password;