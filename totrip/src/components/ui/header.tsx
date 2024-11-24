'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/components/css/header.module.css';
import { useUser } from '@/app/userContext';

const Header: React.FC = () => {
    const { userName, userImg } = useUser();

    return (
        <header className={styles.showcase}>
            <div className="overlay"></div>
            <div className={styles.container}>
                <nav className={styles['main-nav']}>
                    <div className={styles['header-logo']}>
                        <Link href="/">
                            <Image src="/img/common/main-logo.svg" alt="Логотип ToTrip" width={100} height={50} />
                        </Link>
                    </div>
                    <div className={styles.search}>
                        <form action="/search" method="GET" className={styles['search-form']}>
                            <button className={styles['search-button']}>
                                <Image src="/img/common/search.svg" alt="Поиск" width={20} height={20} />
                            </button>
                            <input type="text" name="query" placeholder="Поиск" autoComplete="off" />
                        </form>
                    </div>
                    <ul className={styles['main-menu']}>
                        <li className={styles['menu-item']}><Link href="/">Подборки</Link></li>
                        <li className={styles['menu-item']}><Link href="/trips">Поездки</Link></li>
                        <li className={styles['menu-item']}><Link href="/">Отзывы</Link></li>
                    </ul>
                    <div className={styles.profile}>
                        <div className={`${styles['profile-inf']} flex`}>
                            <div>
                                <p className="mt-2 user-name">{userName}</p>
                                <button>Выход</button>
                            </div>
                            <div className={styles['user-icon']}>
                                <Link href="/profile">
                                    <Image src={userImg} alt="Профиль" width={52} height={52} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;