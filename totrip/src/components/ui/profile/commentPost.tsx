import { useUser } from '@/app/userContext';
import Image from "next/image";

interface CommentPostProps {
    postTime: string;
    tripName: string;
    commentText: string;
    onDelete: () => void;
    rating: number;
  }
  
  const CommentPost: React.FC<CommentPostProps> = ({ postTime, tripName, commentText, onDelete, rating }) => {
    const { userImg, userName, userSurname } = useUser();
    const starImg = '/img/profile/star.svg';

    return (
      <div className="w-[831px] h-auto bg-white rounded-2xl shadow-md p-[36px] mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Image src={userImg} className="w-[80px] h-[80px] object-cover rounded-full mr-4" width={60} height={60} alt="user" />
            <div>
              <p className="font-bold text-[24px]">{userName} {userSurname} <span className="font-medium ml-2 text-[18px]">написал(а) отзыв</span></p>
              <p className="text-gray-600 text-[20px] font-bold mt-[8px]">{postTime}</p>
            </div>
          </div>
          <button onClick={onDelete} className="text-gray-600">
            <Image src="/img/profile/Trash Bin 2.svg" alt="delete" className="mb-12 ml-auto relative" width={32} height={32}/>
          </button>
        </div>
        <div>
          <div className='flex gap-2 mt-6'>
            <h4 className="font-bold text-[32px] mr-[20px]">{tripName}</h4>
            <ul className='flex'>
              {Array.from({ length: rating }, (_, idx) => (
                  <li key={idx} className='block mr-[4.8px] my-auto'>
                      <Image src={starImg} width={26} height={26} alt={`star ${idx + 1}`} />
                  </li>
              ))}
          </ul>
          </div>
          <p className="font-medium text-[20px] mt-[20px]">{commentText}</p>
        </div>
      </div>
    );
  };

export default CommentPost;