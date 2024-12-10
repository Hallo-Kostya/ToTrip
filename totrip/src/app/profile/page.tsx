import React from 'react';
import Profile from '@/components/ui/profile/profile';
import Headlines from '@/components/ui/profile/headlines';
import Sidebar from '@/components/ui/profile/sidebar';
import CommentPost from '@/components/ui/profile/commentPost';
import PhotoPost from '@/components/ui/profile/photoPost';
import styles from '@/components/css/profile/profileLead.module.css';

const Page: React.FC = () => {
    // Здесь можно задать значения для isRegistered и userName, например, из состояния или контекста.
    const nickname = "@jek1ti";
    const userName = "Сафия Х"; // Или получите это значение из состояния или контекста
    const profileDesc = "Тут будет ваше описание";
    const userImg = "/img/user-photo.png"; // Это изображение также можно передать через состояние или контекст
    const time = "Время публикации";
    const tripName = "Название поездки";
    const commentText = "Это комментарий о поездке.";
    const postTime = "Время публикации";
    const postImage = "img/profile/user-publication-photo.png";

    return (
        <main className="w-full mb-[88px]">
            <div className="flex flex-col items-center">
                <section className={styles["lead"]}></section>
                <Profile userImg={userImg} nickname={nickname} userName={userName} profileDesc={profileDesc}/>
                <Headlines />
                <div className='flex mt-[16px] max-w-[1120px] gap-[32px]'>
                    <Sidebar />
                    <div className='max-w-[831px]'>
                        <CommentPost userImg={userImg} userName={userName} time={time} postImage={postImage} tripName={tripName} commentText={commentText} />
                        <PhotoPost userImg={userImg} userName={userName} postTime={postTime} postImage={postImage} />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Page;