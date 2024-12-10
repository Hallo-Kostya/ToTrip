import Image from "next/image";
import PostForm from './postForm';
import { useState } from 'react';
import { useUser } from '@/app/userContext';

interface Post {
  id: number;
  type: 'photo' | 'comment' | 'overview' | 'place';
  userImg: string;
  userName: string;
  time: string;
  tripName: string;
  postImage?: string;
  commentText: string;
}

interface SidebarProps {
  subscribers: number;
  onAddPost: (post: Post) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ subscribers, onAddPost }) => {
  const { location, motto } = useUser();
  const [isFormOpen, setFormOpen] = useState(false);
  const [currentFormType, setCurrentFormType] = useState<'comment' | 'photo' | 'overview' | 'place' | null>(null);

  const handleOpenForm = (type: 'comment' | 'photo' | 'overview') => {
    setCurrentFormType(type);
    setFormOpen(true);
  };

  const handleSubmitForm = async (formData: { 
    title: string; 
    rating: number; 
    comment: string; 
    image?: Blob | MediaSource; 
    images?: File[];
}) => {
  const postImage = formData.image ? URL.createObjectURL(formData.image) : undefined;

    const newPost: Post = {
        id: Date.now(),
        type: currentFormType as 'photo' | 'comment' | 'overview',
        userImg: '',
        userName: "",
        time: new Date().toLocaleString(),
        tripName: formData.title,
        postImage: postImage,
        commentText: formData.comment,
        images: formData.images,
        rating: formData.rating
    };

    onAddPost(newPost);
    setFormOpen(false);
};

  const shareActions = [
    { imgSrc: '/img/profile/Star.svg', text: 'Создать отзыв', type: 'comment' },
    { imgSrc: '/img/profile/Eye.svg', text: 'Создать обзор', type: 'overview' },
    { imgSrc: '/img/profile/Camera.svg', text: 'Выложить фото', type: 'photo' }
  ];

  return (
    <div className="flex flex-col relative left-0 top-0 gap-4 max-w-[256px]">
      <div className="bg-white rounded-2xl shadow-md p-[32px]">
        <h5 className="text-black font-bold text-2xl mb-4">Подписчики</h5>
        <div className="flex flex-wrap gap-[16px] list-none">
          {Array.from({ length: subscribers }).map((_, index) => (
              <Image key={index} src="/img/user-photo.png" width={52} height={52} alt={`Пользователь ${index + 1}`} className="rounded-full" />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-8">
        <h5 className="text-black font-bold text-2xl mb-4">Обо мне</h5>
        <div className="flex items-center gap-2 mb-2">
          <Image src="/img/profile/Map Point.svg" width={19} height={19} alt="location" />
          <p className='text-sm'>{location}</p>
        </div>
        <div className="flex gap-2 mb-2">
          <Image src="/img/profile/Calendar.svg" className="mb-auto" width={19} height={19} alt="date" />
          <p className='text-sm'>С ToTrip с `месяц` `год` года</p>
        </div>
        <p className='text-sm'>{motto}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-8">
        <h5 className="text-black font-bold text-2xl mb-4">Поделитесь с людьми!</h5>
        {shareActions.map((action, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <Image src={action.imgSrc} width={19} height={19} alt={action.text} />
            <p className='text-sm'>
              <a href="#" onClick={(e) => { e.preventDefault(); handleOpenForm(action.type); }}>
                {action.text}
              </a>
            </p>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <PostForm onClose={() => setFormOpen(false)} onSubmit={handleSubmitForm} formType={currentFormType} />
      )}
    </div>
  );
}

export default Sidebar;