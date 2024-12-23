'use client'
import Table from './table'
import { useState, useEffect } from 'react';
import Password from './password';


export default function Home() {
  const [auth, setAuth] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);  // New state for mounting check
  const pass = "pass"

  useEffect(() => {
    setIsMounted(true);  // Set to true once component mounts

    // Check session storage on initial load
    const isLoggedIn = sessionStorage.getItem('isPassword  In') === 'true';
    setAuth(isLoggedIn);
  }, []);

  if (!isMounted) return null;
  
  return (
    <>
      {!auth ? (
        <Password setAuth={setAuth} />
      ) : (
        <div className="relative bg-[#fdfdfd]">
          <Table />
        </div>
      )}
    </>
  );
}


