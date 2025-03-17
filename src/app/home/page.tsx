// app/home/page.tsx
'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/utils/auth';


const HomePage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/');
    } 
  }, [router]);


  return (
    <div className="pl-[15%] py-20">
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page content.</p>
    </div>
  );
};

export default HomePage;