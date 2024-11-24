'use client';

import { useState } from 'react';
import Link from 'next/link';
import CommentPost from '@/components/ui/profile/commentPost';
import PhotoPost from '@/components/ui/profile/photoPost';
import OverviewPost from '@/components/ui/profile/overviewPost';
import Sidebar from '@/components/ui/profile/sidebar';
import Image from 'next/image';

interface Post {
  id: number;
  type: 'photo' | 'comment' | 'overview' | 'place';
  userImg: string;
  userName: string;
  time: string;
  tripName: string;
  postImage: string;
  commentText: string;
  images?: File[];
  rating: number;
}

function Headlines() {
    const links = [
        { title: 'Действие', src: 'img/profile/History.svg', url: '/profile?tab=actions' },
        { title: 'Фото', src: 'img/profile/Camera.svg', url: '/profile?tab=photos' },
        { title: 'Отзывы', src: 'img/profile/Star.svg', url: '/profile?tab=comments' },
        { title: 'Обзоры', src: 'img/profile/Eye.svg', url: '/profile?tab=reviews' },
        { title: 'Места', src: 'img/profile/Map Point.svg', url: '/profile?tab=places' }
    ];

    const [activeLink, setActiveLink] = useState(links[0].title);
    const [posts, setPosts] = useState<Post[]>([]);

    const handleAddPost = (newPost: Post) => {
        setPosts((prevPosts) => [newPost, ...prevPosts]);
    };

    const getFilteredPosts = () => {
        switch (activeLink) {
            case 'Фото':
                return posts.filter(post => post.type === 'photo');
            case 'Отзывы':
                return posts.filter(post => post.type === 'comment');
            case 'Обзоры':
                return posts.filter(post => post.type === 'overview');
            case 'Места':
                return posts.filter(post => post.type === 'place');
            default:
                return posts;
        }
    };

    const handleDeletePost = (id: number) => {
        setPosts(posts.filter(post => post.id !== id));
    };

    const renderContent = () => {
        const filteredPosts = getFilteredPosts();

        if (filteredPosts.length === 0) {
          return (
            <div className='w-[831px] h-auto bg-white rounded-2xl shadow-md p-8 mb-6'>
                Нет публикаций
            </div>
          );
        }

        return filteredPosts.map(post => {
            switch (post.type) {
                case 'photo':
                    return (
                        <PhotoPost
                            key={post.id}
                            postTime={post.time}
                            tripName={post.tripName}
                            postImage={post.postImage || ''}
                            commentText={post.commentText}
                            rating={post.rating}
                            onDelete={() => handleDeletePost(post.id)}
                        />
                    );
                case 'comment':
                    return (
                        <CommentPost
                            key={post.id}
                            postTime={post.time}
                            tripName={post.tripName}
                            commentText={post.commentText}
                            rating={post.rating}
                            onDelete={() => handleDeletePost(post.id)}
                        />
                    );
                case 'overview':
                    return (
                        <OverviewPost
                            key={post.id}
                            postTime={post.time}
                            tripName={post.tripName}
                            commentText={post.commentText}
                            rating={post.rating}
                            images={post.images || []}
                            onDelete={() => handleDeletePost(post.id)}
                        />
                    );
                default:
                    return null;
            }
        });
    };

    return (
        <section className="">
            <ul className="flex flex-wrap gap-[24px] mb-4 justify-center items-center">
                {links.map((link, index) => (
                    <li key={index} className="list-none">
                        <Link
                            href={link.url}
                            scroll={false}
                            onClick={() => setActiveLink(link.title)}
                            className={`py-[10.33px] px-[17.21px] flex items-center space-x-2 rounded-xl ${activeLink === link.title ? 'bg-blue-500 text-white' : 'bg-white text-black'} shadow-md`}
                        >
                            <Image src={link.src} alt={link.title} width={27.53} height={27.53} className={`w-7 ${activeLink === link.title ? 'filter-invert' : ''}`} />
                            <p>{link.title}</p>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className='flex gap-[32px]'>
                <Sidebar onAddPost={handleAddPost} />

                <div className="content">
                    {renderContent()}
                </div>
            </div>
        </section>
    );
};

export default Headlines;