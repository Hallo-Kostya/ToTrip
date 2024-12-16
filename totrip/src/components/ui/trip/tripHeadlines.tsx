'use client'

import React, { useState } from 'react';
import DatesBar from '@/components/ui/trip/datesBar';
import Link from 'next/link';

interface TripHeadlinesProps {
    tripStart: Date;
    tripEnd: Date;
}

const TripHeadlines: React.FC<TripHeadlinesProps> = ({ tripStart, tripEnd }) => {
    const links = [
        { title: 'Маршрут', url: '/trip?tab=route' },
        { title: 'Закладки', url: '/trip?tab=marks' },
        { title: 'Для Вас', url: '/trip?tab=for-you' },
    ];

    const [activeLink, setActiveLink] = useState(links[0].title);
    const dayNames = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];

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
                {dateList.map((date, index) => (
                    <div key={index} className="flex items-center pb-[12px] border-b-[1px] border-black mb-[36px]">
                        <span className="text-[24px] font-[600]">{`${dayNames[date.getDay()]}, ${date.getDate()} ${date.toLocaleString('ru-RU', { month: 'short' })}`}</span>
                        <button className="text-[20px] ml-[20px] border-b-[1px] border-black pb-0">Добавить место</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TripHeadlines;