'use client'

import React from 'react';
import Image from 'next/image';


const RoutePointCard = ({ tagImg, placeImg, placeName, description, additionalClasses, onDelete }) => {
    return (
        <div className={`flex border-l-[2px] border-black relative left-[20px] ${additionalClasses}`}>
            <div className="relative right-[22.5px]">
                <span className="">
                    <Image 
                        src={tagImg}
                        alt="Tag" 
                        width={44} 
                        height={44} 
                        className="p-[6.67px] bg-white invert rounded-[100px]" 
                    />
                </span>
            </div>
            
            <div className="ml-[96px]">
                <Image 
                    src={placeImg} 
                    alt={placeName} 
                    width={296} 
                    height={201} 
                    className="rounded-[20px]"
                />
            </div>
            <div className="ml-[18px]">
                <div className="flex items-center">
                    <h4 className="text-[24px] font-bold">{placeName}</h4>
                </div>
                <p className="mt-[7px] text-[20px] font-[600]">{description || 'Описание отсутствует'}</p>
            </div>
            <button
                className="text-red-500 mt-4 text-right"
                onClick={onDelete}
            >
                Удалить
            </button>
        </div>
    );
};

export default RoutePointCard;