'use client';

import React from 'react';
import Profile from '@/components/ui/profile/profile';
import Headlines from '@/components/ui/profile/headlines';

const Page = () => {
  
  return (
    <main className="w-full mb-[100px]">
      <div className="flex flex-col items-center">
        <section className="w-full h-[609px] mt-[-100px] bg-[url('/img/profile/profile-lead.png')] bg-no-repeat bg-center bg-cover"></section>
        <Profile />
        <div className=''>
          <Headlines />
        </div>
      </div>
    </main>
  );
};

export default Page;