import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';

interface TripCardProps {
    tripImage: string;
    title: string;
    description: string;
    cities: string;
    start_Date: Date;
    end_Date: Date;
    trippers: number;
}

const TripCard: React.FC<TripCardProps> = ({ tripImage, title, description, cities, start_Date, end_Date }) => {
    return (
        <div style={{ backgroundImage: `url(${tripImage})` }} className="max-w-[1696px] h-[553px] relative rounded-[36px] mt-[40px] bg-no-repeat bg-center bg-cover">
            {/* Основной контент карточки */}
            <div className="trip-info flex flex-col absolute bottom-[54px] left-[42px]">
                <div>
                    <h2 className="trip-title font-bold text-[40px] text-white">{title}</h2>
                    <p className="trip-description text-[20px] text-white mt-[12px]">{description}</p>
                    <div className="flex mt-[12px] gap-[18px]">
                        <div className="date flex items-center gap-[12px]">
                            <Image src="/img/calendar.svg" alt="Календарь" width={36} height={36} />
                            <p className="trip-date font-bold text-[24px] text-white">
                                {String(start_Date)} - {String(end_Date)}
                            </p>
                        </div>
                        <div className="place flex items-center gap-[12px]">
                            <Image src="/img/map-pinned.svg" alt="Местоположение" width={36} height={36} />
                            <p className="trip-place font-bold text-[24px] text-white">{cities}</p>
                        </div>
                    </div>
                </div>

                {/* Блок с пользователями */}
                <div className="trippers flex mt-[20px] gap-[16px]">
                    {Array.from({ length: 1 }).map((_, index) => (
                        <Image key={index} src="/img/user-photo.png" width={52} height={52} alt={`Пользователь ${index + 1}`} className="rounded-full" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TripCard;