import Image from "next/image";
import { useUser } from '@/app/userContext';

interface PhotoPostProps {
  postTime: string;
  tripName: string;
  postImage: string;
  commentText: string;
  rating: number;
  onDelete: () => void;
}
  
const PhotoPost: React.FC<PhotoPostProps> = ({ postTime, tripName, postImage, commentText, rating, onDelete }) => {
    const { userImg, userName } = useUser();
    const starImg = '/img/profile/star.svg';

    return (
      <div className="w-[831px] photo-element bg-white rounded-2xl shadow-md p-[36px] mb-4">
        <div className="flex justify-between">
          <div className="flex items-center mb-4">
            <Image src={userImg} className="w-[80px] h-[80px] object-cover user-info-photo rounded-full mr-4" alt="User Photo" width={60} height={60} />
            <div>
              <p className="font-bold text-[24px]">{userName} <span className="font-medium ml-2 text-[18px]">выложил(а) фото</span></p>
              <p className="text-gray-600 font-bold text-[20px] mt-[8px]">{postTime}</p>
            </div>
          </div>
          <button onClick={onDelete} className="text-gray-600">
            <Image src="/img/profile/Trash Bin 2.svg" alt="delete" className="block mb-8 ml-auto relative" width={32} height={32} />
          </button>
        </div>
        <div>
          <div className='flex gap-2'>
            <h4 className="font-bold text-[32px] mr-[20px]">{tripName}</h4>
            <ul className='flex'>
              {Array.from({ length: rating }, (_, idx) => (
                  <li key={idx} className='block mr-[4.8px] my-auto'>
                      <Image src={starImg} width={26} height={26} alt={`star ${idx + 1}`} />
                  </li>
              ))}
          </ul>
          </div>
          <p className="text-[20px] font-medium mt-[20px]">{commentText}</p>
          <Image 
            src={postImage} 
            className="w-full h-auto rounded-lg mt-3 mt-[20px]" 
            alt="PhotoPost" 
            width={759} 
            height={573.5} 
          />
        </div>
      </div>    
    );
  };

export default PhotoPost;
