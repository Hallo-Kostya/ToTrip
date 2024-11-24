import { useUser } from '@/app/userContext';
import Image from "next/image";

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
  const starImg = '/img/profile/star.svg';

  return (
      <div className="w-[831px] h-auto bg-white rounded-2xl shadow-md p-[36px] mb-6">
          <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                  <Image src={userImg} className="w-[80px] h-[80px] object-cover rounded-full mr-4" width={60} height={60} alt="user" />
                  <div>
                      <p className="font-bold text-[24px]">{userName} <span className="font-medium ml-2 text-[18px]">выложил(а) обзор</span></p>
                      <p className="text-gray-600 text-[20px] font-bold mt-[8px]">{postTime}</p>
                  </div>
              </div>
              <button onClick={onDelete} className="text-gray-600">
                  <Image src="/img/profile/Trash Bin 2.svg" alt="delete" className="mb-8 ml-auto relative" width={32} height={32}/>
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
              <div className='flex gap-4 mt-[20px]'>
                  {images.map((imageSrc, idx) => (
                      <Image
                          key={idx}
                          src={imageSrc}
                          className={`rounded-lg ${idx === 0 ? 'h-auto w-full' : 'h-auto w-[300px]'}`}
                          alt={`Post Image ${idx + 1}`}
                          width={idx === 0 ? 759 : 300}
                          height={idx === 0 ? 573.5 : 200} 
                      />
                  ))}
              </div>
          </div>
      </div>
  );
};

export default OverviewPost;