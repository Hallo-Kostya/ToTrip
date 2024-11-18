"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/components/css/header.module.css';

interface HeaderProps {
    isRegistered: boolean;
    userName: string;
    userImg: string;
}

const RegistrationPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Пароли не совпадают');
        } else {
            setError('');
            // Обработка регистрации
            console.log('Регистрация:', { login, password });
            onClose(); // Закрыть попап после успешной регистрации
        }
    };

    return (
        <div className={styles.popup}>
            <h2>Регистрация</h2>
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Логин"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Подтверждение пароля"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Зарегистрироваться</button>
            </form>
            <button onClick={onClose}>Закрыть</button>
            <p>Уже есть аккаунт? <button onClick={() => onClose()}>Войти</button></p> 
        </div>
    );
};

const LoginPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Обработка авторизации
        console.log('Вход:', { login, password });
        onClose(); // Закрыть попап после успешного входа
    };

    return (
        <div className={styles.popup}>
            <h2>Вход</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Логин"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Войти</button>
            </form>
            <button onClick={onClose}>Закрыть</button>
            <p>Нет аккаунта? <button onClick={() => onClose()}>Регистрация</button></p>
        </div>
    );
};

const Header: React.FC<HeaderProps> = ({ isRegistered, userName = "Сафия Х", userImg = "/img/user-photo.png" }) => {
    const [showRegistration, setShowRegistration] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const handleRegistrationClick = () => {
        setShowRegistration(true);
        setShowLogin(false);
    };

    const handleLoginClick = () => {
        setShowLogin(true);
        setShowRegistration(false);
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
                                    <p className="mt-2 user-name">{userName}</p>
                                    <button>Выход</button>
                                </div>
                                <div className={styles['user-icon']}>
                                    <Link href="/profile">
                                        <Image src={userImg} alt="Профиль" width={52} height={52} />
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className={"flex gap-[4px]"}>
                                <button onClick={handleRegistrationClick}>Регистрация</button>
                                <div className={styles['user-icon']}>
                                    <Image src="/img/no-user-icon.png" alt="Профиль" width={52} height={52} className="block" />
                                </div>
                            </div>
                        )}
                    </div>
                </nav>
            </div>

            {/* Попап для регистрации */}
            {showRegistration && (
                <RegistrationPopup onClose={() => setShowRegistration(false)} />
            )}

            {/* Попап для входа */}
            {showLogin && (
                <LoginPopup onClose={() => setShowLogin(false)} />
            )}
        </header>
    );
};

export default Header;