'use client'

import React from 'react';
import Image from 'next/image';


interface RoutePointCardProps {
    tagImg: string;
    placeImg: string;
    placeName: string;
    rating: [];
    description: string;
}

const RoutePointCard: React.FC<RoutePointCardProps> = ({ tagImg, placeImg, placeName, rating, description }) => {


    return (
        <div>
            <Image src={tagImg} alt={""} className="" width={40} height={40} />
            <div className="">
                <Image src={placeImg} alt={""} className="" width={296} height={201} />
            </div>
            <div className="">
                <div className="">
                    <h4 className="">{placeName}</h4>
                    <ul>
                    {rating.map((_, index) => (
                        <li key={index} className="">
                            <Image src="/img/profile/Star.svg" alt="Рейтинг" width={26} height={26} className={``} />
                        </li>
                    ))}
                    </ul>
                </div>
                <p className="">{description}</p>
            </div>
        </div>
    );
};

export default RoutePointCard;