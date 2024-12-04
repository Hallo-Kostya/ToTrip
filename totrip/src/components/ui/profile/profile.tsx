'use client';

import React, { useState } from 'react';
import Popup from '@/components/ui/profile/popup';
import Image from 'next/image';
import { UserData } from '@/components/ui/types';
import { useUser } from '@/app/userContext';

const Profile: React.FC = () => {
const { nickname, userName, userImg, location, motto, profileDesc, setUserContext } = useUser();
const [isPopupOpen, setPopupOpen] = useState(false);

const handleOpenPopup = () => {
    setPopupOpen(true);
};

const handleClosePopup = () => {
    setPopupOpen(false);
};

const handleSubmit = (data: UserData) => {
    setUserContext({
            nickname: data.username,
            userName: data.name,
            userImg: data.avatar,
            location: data.location,
            motto: data.motto,
            profileDesc: data.about
        });
        setPopupOpen(false);
    };

    const handleAvatarChange = (newImg: string) => {
    setUserContext({ userImg: newImg });
    };

    return (
    <section className="size-full max-w-[1120px] bg-white rounded-[38.4px] p-[36px] shadow-md mb-4 -mt-[100px]">
        <div className="flex justify-between items-start gap-5">
            <div className="flex gap-6">
                <Image className="w-[160px] h-[160px] object-cover rounded-full" src={userImg} width={160} height={160} alt="Фото профиля" />
                <div className="flex flex-col mt-2">
                    <h6 className="text-gray-600 font-bold text-[20px]">{nickname}</h6>
                    <h4 className="font-bold text-[32px]">{userName}</h4>
                    <h6 className="mt-13 text-gray-600 font-bold text-[20px]">{profileDesc}</h6>
                </div>
            </div>
                <a href="#" onClick={handleOpenPopup}>
                    <Image src="/img/profile/Settings.svg" alt="Настройки профиля" width={32} height={32} className="hover:cursor-pointer" />
                </a>
        </div>
        <Popup
            isOpen={isPopupOpen}
            onClose={handleClosePopup}
            onSubmit={handleSubmit}
            onAvatarChange={handleAvatarChange}
            initialData={{
                avatar: userImg,
                name: userName,
                username: nickname,
                location: location,
                about: profileDesc,
                motto: motto
            }}
        />
    </section>
    );
};

export default Profile;