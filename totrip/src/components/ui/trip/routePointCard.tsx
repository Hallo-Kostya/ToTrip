'use client'

import React from 'react';
import Image from 'next/image';

interface RoutePointCardProps {
    tagImg: string;
    placeImg: string;
    placeName: string;
    rating?: boolean[];
    description: string;
    additionalClasses?: string;
}

const RoutePointCard: React.FC<RoutePointCardProps> = ({ tagImg, placeImg, placeName, rating, description, additionalClasses }) => {
    return (
        <div className={`flex border-l-[2px] border-black relative left-[20px] ${additionalClasses}`}>
            <div className="relative right-[22.5px]">
                <span className="">
                    <Image 
                        src={tagImg || '/img/default-tag.svg'} 
                        alt="Tag" 
                        width={44} 
                        height={44} 
                        className="p-[6.67px] bg-white invert rounded-[100px]" 
                    />
                </span>
            </div>
            
            <div className="ml-[96px]">
                <Image 
                    src={placeImg || '/img/default-place.svg'} 
                    alt={placeName || 'Название недоступно'} 
                    width={296} 
                    height={201} 
                    className="rounded-[20px]"
                />
            </div>
            <div className="ml-[18px]">
                <div className="flex items-center">
                    <h4 className="text-[24px] font-bold">{placeName}</h4>
                    {/* <ul className="flex ml-[20px] gap-[4.8px]">
                        {rating.map((_, index) => (
                            <li key={index}>
                                <Image 
                                    src="/img/profile/Star.svg" 
                                    alt="Рейтинг" 
                                    width={26} 
                                    height={26} 
                                />
                            </li>
                        ))}
                    </ul> */}
                </div>
                <p className="mt-[7px] text-[20px] font-[600]">{description || 'Описание отсутствует'}</p>
            </div>
        </div>
    );
};

export default RoutePointCard;