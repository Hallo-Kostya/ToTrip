'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/components/css/header.module.css';
import { useUser } from '@/app/userContext';
import RegistrationPopup from './common_modules/registration';
import ConfirmLogoutPopup from './common_modules/confirmLogoutPopup';

const Header: React.FC = () => {
  const { first_name, last_name, photo, setUserContext } = useUser();
  const isRegistered = Boolean(first_name && last_name);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isConfirmLogoutVisible, setIsConfirmLogoutVisible] = useState(false);

  const handleLogout = () => {
    setIsConfirmLogoutVisible(true);
  };

  const confirmLogout = async () => {
    try {
      const accessToken = localStorage.getItem('access');
      const refreshToken = localStorage.getItem('refresh');

      const headers = {
        'Content-Type': 'application/json',
      };

      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }

      const response = await fetch('http://127.0.0.1:8000/api/users/logout/', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        console.error('Ошибка при выходе');
        return;
      }

      localStorage.removeItem('refresh');
      localStorage.removeItem('access');
      setUserContext({ first_name: '', last_name: '', photo: '' });
      setIsConfirmLogoutVisible(false);
      window.location.reload();
    } catch (error) {
      console.error('Ошибка сети:', error);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    if (accessToken && !isRegistered) {
      const fetchUserProfile = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/users/profile/', {
            headers: { Authorization: `Bearer ${accessToken}` }
          });

          if (response.ok) {
            const userData = await response.json();
            setUserContext({
              first_name: userData.first_name,
              last_name: userData.last_name,
              photo: userData.photo || '', 
            });
          } else {
            console.error('Ошибка получения профиля');
          }
        } catch (error) {
          console.error('Ошибка сети:', error);
        }
      };

      fetchUserProfile();
    }
  }, [isRegistered, setUserContext]);

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
                  <p className="mt-2 user-name">{first_name} {last_name}</p>
                  <button onClick={handleLogout}>Выход</button>
                </div>
                <div className={styles['user-icon']}>
                  <Link href="/profile">
                    <Image src={photo} alt="Профиль" width={52} height={52} />
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