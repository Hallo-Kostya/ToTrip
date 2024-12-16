import { useUser } from '@/app/userContext';
import Image from "next/image";
import { useState } from 'react';

interface OverviewPostProps {
  postTime: string;
  images: string[];
  tripName: string;
  commentText: string;
  onDelete: () => void;
  rating: number;
}

const OverviewPost: React.FC<OverviewPostProps> = ({ postTime, tripName, images, commentText, onDelete, rating }) => {
    const { userImg, userName } = useUser();
    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <div className="w-full lg:w-[831px] h-auto bg-white rounded-2xl shadow-md p-[36px] mb-6">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <Image src={userImg} className="w-20 h-20 object-cover rounded-full mr-4" width={80} height={80} alt="user" />
                    <div>
                        <p className="font-bold text-[24px]">{userName} <span className="font-medium ml-2 text-[18px]">выложил(а) обзор</span></p>
                        <p className="text-gray-600 text-[20px] font-bold mt-2">{postTime}</p>
                    </div>
                </div>
                <button onClick={onDelete} className="text-gray-600">
                    <Image src="/img/profile/Trash Bin 2.svg" alt="delete" className="mb-8 ml-auto relative" width={32} height={32}/>
                </button>
            </div>
            <div>
                <div className='flex gap-2 mt-6'>
                    <h4 className="font-bold text-[32px] mr-[20px] ">{tripName}</h4>
                    <ul className='flex'>
                        {Array.from({ length: rating }, (_, idx) => (
                            <li key={idx} className='block mr-[4.8px] my-auto'>
                                <Image src="/img/profile/star.svg" width={26} height={26} alt={`star ${idx + 1}`} />
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="text-[20px] font-medium mt-5">{commentText}</p>
                
                <div className='mt-5'>
                    <Image
                        src={selectedImage}
                        className='rounded-lg h-auto w-full object-cover'
                        alt='Selected Post Image'
                        width={759}
                        height={340}
                    />
                </div>
                
                <div className='flex gap-2 overflow-x-auto mt-4'>
                    {images.map((imageSrc, idx) => (
                        <Image
                          key={idx}
                          src={imageSrc}
                          className='rounded-lg cursor-pointer transition hover:opacity-80'
                          alt={`Thumbnail ${idx + 1}`}
                          width={100}
                          height={100}
                          onClick={() => setSelectedImage(imageSrc)}
                       
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OverviewPost;