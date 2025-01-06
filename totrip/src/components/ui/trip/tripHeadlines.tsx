'use client'

import React, { useState } from 'react';
import DatesBar from '@/components/ui/trip/datesBar';
import Link from 'next/link';
import Image from 'next/image';
import RoutePointCard from '@/components/ui/trip/routePointCard';

interface TripHeadlinesProps {
    tripStart: Date;
    tripEnd: Date;
    tripId: number;
}

const tagImages = {
    entertainment: '/img/trip-page/Masks.svg',
    hotels: '/img/trip-page/Bed.svg',
    nightlife: '/img/trip-page/wineglass.svg',
    camping: '/img/trip-page/Bonfire.svg',
    museums: '/img/trip-page/landmark.svg',
    attractions: '/img/trip-page/castle.svg',
    food: '/img/trip-page/soup.svg',
};

const tagTitles = Object.keys(tagImages);

const TripHeadlines: React.FC<TripHeadlinesProps> = ({ tripStart, tripEnd, tripId }) => {
    const links = [
        { title: 'Маршрут', url: `/trip/${tripId}?tab=route` },
        { title: 'Закладки', url: `/trip/${tripId}?tab=marks` },
        { title: 'Для Вас', url: `/trip/${tripId}?tab=for-you` },
    ];

    const [activeLink, setActiveLink] = useState(links[0].title);
    const [routePoints, setRoutePoints] = React.useState<Record<string, any[]>>(tagTitles.reduce((acc, date) => {
        acc[date] = [];
        return acc;
    }, {}));
    const [isTagListOpen, setIsTagListOpen] = React.useState<boolean[]>(Array(tagTitles.length).fill(true));
    const [isExpanded, setIsExpanded] = React.useState<boolean[]>(Array(tagTitles.length).fill(true));

    const generateDateList = (start: Date, end: Date) => {
        const dates = [];
        const currentDate = new Date(start);
        while (currentDate <= end) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    };

    const dateList = generateDateList(tripStart, tripEnd);

    const handleAddPlace = (dateIndex: number) => {
        setIsTagListOpen(prev => {
            const newOpenState = [...prev];
            newOpenState[dateIndex] = !newOpenState[dateIndex];
            return newOpenState;
        });
    };

    const handleToggleContent = (index: number) => {
        setIsExpanded(prev => {
            const newExpandedState = [...prev];
            newExpandedState[index] = !newExpandedState[index];
            return newExpandedState;
        });
    };

    const addRoutePoint = (dateIndex: number, tag: string) => {
        const newRoutePoint = {
            tagImg: tagImages[tag],
            placeImg: '/img/trip-page/trip-place-photo.jpg',
            placeName: 'Sample Place',
            rating: Array(5).fill(true),
            description: 'This is a sample description for the place.',
        };

        setRoutePoints(prev => {
            const updated = { ...prev };
            updated[dateIndex] = [...(updated[dateIndex] || []), newRoutePoint];
            return updated;
        });
    };

    return (
        <section className="flex flex-col w-full">
            <ul className="flex flex-wrap">
                {links.map((link, index) => (
                    <li key={index} className="text-[24px] font-[500] pb-[16px]">
                        <Link
                            href={link.url}
                            scroll={false}
                            onClick={() => setActiveLink(link.title)}
                            className={`pb-[16px] ${activeLink === link.title ? 'border-b-[4px] border-black px-[12px]' : 'px-[12px]'}`}
                        >
                            {link.title}
                        </Link>
                    </li>
                ))}
            </ul>
            <DatesBar tripStart={tripStart} tripEnd={tripEnd} />
            <div className="flex flex-col items-center max-w-[1696px] mx-auto bg-gray-300 w-full h-[518px] mt-[39px]">
                {/* MAP API */}
            </div>
            <div className="flex flex-col mt-[40px]">
                {dateList.map((date, dateIndex) => (
                    <div key={dateIndex}>
                        <div className="flex items-center pb-[12px] border-b-[1px] border-black mt-[80px] mb-[36px]">
                            <span className="text-[24px] font-[600]">{`${date.toLocaleString('ru-RU', { weekday: 'long', day: 'numeric', month: 'short' })}`}</span>
                            <button className="text-[20px] ml-[20px] border-b-[1px] border-black pb-0" onClick={() => handleAddPlace(dateIndex)}>Добавить место</button>
                            <button className="ml-auto" onClick={() => handleToggleContent(dateIndex)}>
                                <Image src="/img/common/unwrap__button.svg" alt="toggle content" width={40} height={40} style={{ transform: isExpanded[dateIndex] ? 'rotate(0deg)' : 'rotate(180deg)' }} />
                            </button>
                        </div>
                        {isExpanded[dateIndex] && (
                            <div>
                                <div>
                                {routePoints[dateIndex]?.map((point, index) => {
                                    const isFirst = index === -1;
                                    const isLast = index === routePoints[dateIndex].length - 1;
                                    const isPenultimate = index === routePoints[dateIndex].length;

                                    let paddingClasses = "pb-[120px]";
                                    if (isFirst) {
                                        paddingClasses = "";
                                    } else if (isPenultimate && !isLast) {
                                        paddingClasses = "pt-[120px]";
                                    } else if (isLast) {
                                        paddingClasses = "border-l-0";
                                    } 

                                    return (
                                        <RoutePointCard
                                            key={index}
                                            tagImg={point.tagImg}
                                            placeImg={point.placeImg}
                                            placeName={point.placeName}
                                            rating={point.rating}
                                            description={point.description}
                                            additionalClasses={paddingClasses}
                                        />
                                    );
                                })}
                                </div>
                                <div className="mt-[36px]">
                                    <ul className="flex gap-9">
                                        {isTagListOpen[dateIndex] ? tagTitles.map((tag, index) => (
                                            <li key={index} className="border-[1.5px] border-black rounded-[999px] p-[10px]">
                                                <button onClick={() => addRoutePoint(dateIndex, tag)} className="align-middle">
                                                    <Image src={tagImages[tag]} alt={tag} width={40} height={40} />
                                                </button>
                                            </li>
                                        )) : (
                                            <li className="border-[1.5px] border-black rounded-[999px] p-[10px]">
                                                <button className="align-middle" onClick={() => setIsTagListOpen(prev => {
                                                    const newList = [...prev];
                                                    newList[dateIndex] = true;
                                                    return newList;
                                                })}>
                                                    <Image src="/img/trip-page/plus.svg" alt="Раскрыть" width={40} height={40} />
                                                </button>
                                            </li>
                                        )}
                                        {isTagListOpen[dateIndex] && (
                                            <li className="border-[1.5px] border-black rounded-[999px] p-[10px]">
                                                <button className="align-middle" onClick={() => setIsTagListOpen(prev => {
                                                    const newList = [...prev];
                                                    newList[dateIndex] = false;
                                                    return newList;
                                                })}>
                                                    <Image src="/img/trip-page/x.svg" alt="Закрыть" width={40} height={40} />
                                                </button>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TripHeadlines;