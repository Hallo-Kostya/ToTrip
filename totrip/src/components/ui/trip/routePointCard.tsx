'use client'

import React from 'react';
import Image from 'next/image';


const RoutePointCard = ({ tagImg, placeImg, placeName, description, onDelete, dynamicStyles }) => {
    if (description.length > 400) {
        description = description.slice(0, 400) + '...';
    }

    return (
        <div className={`${dynamicStyles} border-l-2 border-black`}>
            <div className="relative right-[21.5px]">
                <span className="">
                    <Image 
                        src={tagImg}
                        alt="Tag" 
                        width={41} 
                        height={41} 
                        className="p-[7.67px] px-[10.67px] bg-white invert rounded-[100px]" 
                    />
                </span>
            </div>
            <div className="relative w-[296px] h-[201px] ml-[96px]">
                <Image 
                    src={placeImg} 
                    alt={placeName} 
                    className="object-cover rounded-[20px]" 
                    fill
                />
            </div>
            <div className="ml-[18px]">
                <div className="flex items-center">
                    <h4 className="text-[24px] font-bold">{placeName}</h4>
                </div>
                <p className="w-[1150px] mt-[7px] text-[20px] font-[600]">
                    {description || 'Описание отсутствует'}
                </p>
                
            </div>
            <button
                className="flex relative text-red-500 ml-auto mt-8 mr-4"
                onClick={onDelete}
            >
                <Image src="/img/profile/Trash Bin 2.svg" alt="delete" className="relative flex" width={32} height={32}/>
            </button>
        </div>
    );
};

export default RoutePointCard;