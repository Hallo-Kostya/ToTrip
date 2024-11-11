// components/PlaceCard.tsx
import React from 'react';
import styles from '@/components/css/placeCard.module.css'
import Image from 'next/image';
import Link from 'next/link';

interface PlaceCardProps {
  title: string;
  reviewsCount: string;
  ratingImg: string;
}

export default function PlaceCard({ title, reviewsCount, ratingImg }: PlaceCardProps) {
  return (
    <li className={styles["card"]}>
      <div>
        <Image src="/img/index/like-it__place-photo.jpg" alt={title} width={400} height={302}/>
        <div className={styles["card-info"]}>
          <Link href="#">
            <h3 className={styles["card-title"]}>{title}</h3>
            <Image src={ratingImg} alt="Рейтинг" className="rating" width="32" height="32" />
            <p className={styles["reviews"]}>{reviewsCount}</p>
          </Link>
        </div>
      </div>
    </li>
  );
}