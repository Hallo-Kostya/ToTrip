// components/PlaceCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Stars from '../../Common/Stars';

export interface Place {
  id: number;
  title: string;
  reviewsCount: string;
  placeImg: string;
  rating: number;
}

export default function PlaceCard({ id, title, reviewsCount, placeImg, rating }: Place) {
  return (
    <Link href={`/places/${id}`}>
      <li className='relative'>
        <div>
          <Image className='rounded-[15px]' src={placeImg} alt={title} width={400} height={320} />
          <div>
            <div className='max-w-full flex mt-[20px] items-center mr-[20px] last:mr-[0px]'>
              <h3 className='text-[24px] font-bold mr-[52px]'>{title}</h3>
              <Stars rating={rating} />
              <p className='text-[#666] text-[24px] font-bold ml-[12px]'>{reviewsCount}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
}