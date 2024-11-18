// components/PlaceCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PlaceCardProps {
  title: string;
  reviewsCount: string;
  ratingImg: string;
}

export default function PlaceCard({ title, reviewsCount, ratingImg }: PlaceCardProps) {
  return (
    <li className='relative'>
      <div>
        <Image src="/img/index/like-it__place-photo.jpg" alt={title} width={400} height={320}/>
        <div>
          <Link href="#" className='max-w-full flex mt-[20px] items-center mr-[20px] last:mr-[0px]'>
            <h3 className='text-[24px] font-bold mr-[52px]'>{title}</h3>
            <Image 
              src={ratingImg} 
              alt="Рейтинг" 
              width={"24"}
              height={"24"}
            />
            <Image 
              src={ratingImg} 
              alt="Рейтинг" 
              width={"24"}
              height={"24"}
            />
            <Image 
              src={ratingImg} 
              alt="Рейтинг" 
              width={"24"}
              height={"24"}
            />
            <Image 
              src={ratingImg} 
              alt="Рейтинг" 
              width={"24"}
              height={"24"}
            />
            <Image 
              src={ratingImg} 
              alt="Рейтинг" 
              width={"24"}
              height={"24"}
            />
            <p className='text-[#666] text-[24px] font-bold ml-[12px]'>{reviewsCount}</p>
          </Link>
        </div>
      </div>
    </li>
  );
}