"use client"

import styles from '@/components/css/profile/profileLead.module.css';
import { useState } from 'react';
import Popup from '@/components/ui/profile/popup';

interface ProfileData {
    username: string;
    bio?: string;  // Optional
    // Add other relevant fields as needed
}

interface ProfileProps {
    userImg: string;
    nickname: string;
    userName: string;
    profileDesc: string;
}

const Profile: React.FC<ProfileProps> = ({ userImg, nickname, userName, profileDesc }) => {
    const [isPopupOpen, setPopupOpen] = useState(false);

    const handleOpenPopup = () => {
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    };

    const handleSubmit = (data: ProfileData) => {
        console.log('Данные профиля:', data);
        // Here you could add logic for sending data to a server or saving it
    };

    return (
        <section className={`${styles["profile"]} profile size-full max-w-[1120px] bg-white rounded-[38.4px] p-[36px] mb-4 shadow-md`}>
            <div className="flex justify-between items-start gap-5">
                <div className="flex gap-6">
                    <img className='w-[160px] h-[160px] rounded-full' src={userImg} alt="Фото профиля" />
                    <div className="flex flex-col mt-2">
                        <h6 className="text-gray-600 font-bold text-[20px]">{nickname}</h6>
                        <h4 className="font-bold text-[32px]">{userName}</h4>
                        <h6 className="mt-13 text-gray-600 font-bold text-[20px]">{profileDesc}</h6>
                    </div>
                </div>
                <a href="#" onClick={handleOpenPopup}>
                    <img src="/img/profile/Settings.svg" alt="Настройки профиля" className="hover:cursor-pointer" />
                </a>
            </div>
            <div className="flex gap-8 mt-4 -mb-4 justify-center">
                {['Публикации', 'Подписчики', 'Подписки'].map((item, index) => (
                    <div key={index} className="text-gray-600 flex flex-col items-center">
                        <h5 className="text-[24px]">{item}</h5>
                        <h5 className="font-bold text-[24px]">0</h5>
                    </div>
                ))}
            </div>
            <Popup isOpen={isPopupOpen} onClose={handleClosePopup} onSubmit={handleSubmit} />
        </section>
    );
}

export default Profile;