"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from '@/components/css/profile/headlines.module.css';

export default function Headlines() {
    const links = [
        { title: 'Действие', src: 'img/profile/History.svg', url: '/profile?tab=actions' },
        { title: 'Фото', src: 'img/profile/Camera.svg', url: '/profile?tab=photos' },
        { title: 'Отзывы', src: 'img/profile/Star.svg', url: '/profile?tab=comments' },
        { title: 'Обзоры', src: 'img/profile/Eye.svg', url: '/profile?tab=reviews' },
        { title: 'Места', src: 'img/profile/Map Point.svg', url: '/profile?tab=places' }
    ];

    // State variable to keep track of the active link
    const [activeLink, setActiveLink] = useState(links[0].title); // Default to the first link

    const handleLinkClick = (title : string) => {
        setActiveLink(title); // Update the active link based on user click
    };

    return (
        <section className="headlines">
            <ul className="flex flex-wrap gap-[24px] justify-center items-center">
                {links.map((link, index) => (
                    <li key={index} className="list-none">
                        <Link
                            href={link.url}
                            scroll={false}
                            onClick={() => handleLinkClick(link.title)} // Update active link on click
                            className={`${styles["headlines-item"]} flex items-center space-x-2 rounded-xl ${activeLink === link.title ? 'bg-blue-500 text-white' : 'bg-white text-black'} shadow-md`} // Change style based on active link
                        >
                            <img src={link.src} alt={link.title} className={`w-7 ${activeLink === link.title ? 'filter-invert' : ''}`} /> {/* Invert color of SVG based on active state */}
                            <p>{link.title}</p>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="content">
                {activeLink === 'Действие'}
                {activeLink === 'Фото'}
                {activeLink === 'Отзывы'}
                {activeLink === 'Обзоры'}
                {activeLink === 'Места'}
            </div>
        </section>
    );
}