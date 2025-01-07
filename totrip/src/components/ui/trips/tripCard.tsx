import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { useUser } from '@/app/userContext';

interface TripCardProps {
    userphoto: string;
    tripImage: string;
    title: string;
    description: string;
    cities: string;
    start_Date: Date;
    end_Date: Date;
    trippers: number;
}

const TripCard: React.FC<TripCardProps> = ({ userphoto, tripImage, title, description, cities, start_Date, end_Date }) => {
    const formattedStartDate = format(start_Date, 'dd.MM.yyyy');
    const formattedEndDate = format(end_Date, 'dd.MM.yyyy');

    const { photo } = useUser();

    return (
        <div style={{ backgroundImage: `url('/img/trip-page/trip-photo.jpg')` }} className="max-w-[1696px] h-[553px] relative rounded-[36px] mt-[40px] bg-no-repeat bg-center bg-cover">
            {/* Основной контент карточки */}
            <div className="trip-info flex flex-col absolute bottom-[54px] left-[42px]">
                <div>
                    <h2 className="trip-title font-bold text-[40px] text-white">{title}</h2>
                    <p className="trip-description text-[20px] text-white mt-[12px]">{description}</p>
                    <div className="flex mt-[12px] gap-[18px]">
                        <div className="date flex items-center gap-[12px]">
                            <Image src="/img/calendar.svg" alt="Календарь" width={36} height={36} />
                            <p className="trip-date font-bold text-[24px] text-white">
                                {formattedStartDate} - {formattedEndDate}
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
                        <Image key={index} src={photo} width={52} height={52} alt={`Пользователь ${index + 1}`} className="rounded-full" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TripCard;