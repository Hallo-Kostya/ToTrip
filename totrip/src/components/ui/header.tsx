'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/components/css/header.module.css';
import { useUser } from '@/app/userContext';
import RegistrationPopup from './common_modules/registration';
import ConfirmLogoutPopup from './common_modules/confirmLogoutPopup';

const Header: React.FC = () => {
    const { userName, userSurname, userImg, setUserContext } = useUser();
    const isRegistered = Boolean(userName && userSurname);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isConfirmLogoutVisible, setIsConfirmLogoutVisible] = useState(false);

    const handleLogout = () => {
        setIsConfirmLogoutVisible(true);
    };

    const confirmLogout = () => {
        setUserContext({ userName: '', userSurname: '', userImg: '/img/no-user-icon.png' });
        setIsConfirmLogoutVisible(false);
    };

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
                        {isRegistered ? (
                            <div className={`${styles['profile-inf']} flex`}>
                                <div>
                                    <p className="mt-2 user-name">{userName} {userSurname}</p>
                                    <button onClick={handleLogout}>Выход</button>
                                </div>
                                <div className={styles['user-icon']}>
                                    <Link href="/profile">
                                        <Image src={userImg} alt="Профиль" width={52} height={52} />
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className='flex gap-2'>
                                <button 
                                    className=''
                                    onClick={() => setIsPopupVisible(true)}
                                >
                                    Зарегистрироваться
                                </button>
                                <div className={styles['user-icon']}>
                                    <Image src='/img/no-user-icon.png' alt="Профиль" width={52} height={52} />
                                </div>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
            {isPopupVisible && <RegistrationPopup onClose={() => setIsPopupVisible(false)} />}
            {isConfirmLogoutVisible && (
                <ConfirmLogoutPopup 
                    onConfirm={confirmLogout} 
                    onCancel={() => setIsConfirmLogoutVisible(false)} 
                />
            )}
        </header>
    );
};

export default Header;