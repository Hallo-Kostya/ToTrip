import React from 'react';
import Image from 'next/image';

interface TripCardProps {
    tripImage: string;
    tripName: string;
    tripPlace: string;
    tripStart: Date;
    tripEnd: Date;
    users?: number;
}

const TripCard: React.FC<TripCardProps> = ({ tripImage, tripName, tripPlace, tripStart, tripEnd, users }) => {
    const backgroundStyle = {
        backgroundImage: `url(${tripImage})`,
      };

    return (
        <div style={backgroundStyle} className="max-w-[1696px] h-[553px] relative bg-white shadow-lg rounded-[36px] overflow-hidden mt-[40px] bg-no-repeat bg-center bg-cover">
            {/* Основной контент карточки */}
            <div className="trip-info flex flex-col absolute bottom-[54px] left-[42px]">
                <div>
                    <h2 className="trip-title font-bold text-[40px] text-white">{tripName}</h2>
                    <div className="flex mt-[12px] gap-[18px]">
                        <div className="date flex items-center gap-[12px]">
                            <Image src="./img/calendar.svg" alt="Календарь" width={36} height={36} className="" />
                            <p className="trip-date font-bold text-[24px] text-white">
                                {tripStart} - {tripEnd}
                            </p>
                        </div>
                        <div className="date flex items-center gap-[12px]">
                            <Image src="./img/map-pinned.svg" alt="Местоположение" width={36} height={36} className="" />
                            <p className="trip-place font-bold text-[24px] text-white">{tripPlace}</p>
                        </div>
                    </div>
                </div>

                {/* Блок с пользователями */}
                <div className="users flex mt-[20px] gap-[16px]">
                    {Array.from({ length: users }).map((_, index) => (
                        <Image key={index} src="/img/user-photo.png" width={52} height={52} alt={`Пользователь ${index + 1}`} className="rounded-full" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TripCard;