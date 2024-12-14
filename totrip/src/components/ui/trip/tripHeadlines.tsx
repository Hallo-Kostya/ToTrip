'use client';

import { useState } from 'react';
import Link from 'next/link';
// import Image from 'next/image';
import DatesBar from '@/components/ui/trip/datesBar';
import RoutePointCard from '@/components/ui/trip/routePointCard';


function TripHeadlines() {
    const links = [
        { title: 'Маршрут', src: '', url: '/trip?tab=route' },
        { title: 'Закладки', src: '', url: '/trip?tab=marks' },
        { title: 'Для Вас', src: '', url: '/trip?tab=for-you' }
    ];

    const [activeLink, setActiveLink] = useState(links[0].title);

    return (
        <section className="flex flex-col w-full">
            <ul className="flex flex-wrap gap-[24px]">
                {links.map((link, index) => (
                    <li key={index} className="">
                        <Link
                            href={link.url}
                            scroll={false}
                            onClick={() => setActiveLink(link.title)}
                            className={`${activeLink === link.title ? '' : ''}`}
                        >
                            <p>{link.title}</p>
                        </Link>
                    </li>
                ))}
            </ul>
            <DatesBar tripStart={undefined} tripEnd={undefined}/>
            <div className="flex flex-col items-center max-w-[1696px] mx-auto bg-gray-300 w-full h-[518px]">
                {/* MAP API */}
            </div>
            <div>
                {/* Этот контейнер заполняется тем же количеством дней, что и длится 
                поездка, и берет каждое имя дня для каждого нового элемента. Каждый 
                такой элемент соответственно может заполняться карточками мест. */}
            </div>
        </section>
    );
};

export default TripHeadlines;