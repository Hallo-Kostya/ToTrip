import React from 'react';
import Image from 'next/image';

interface NoteCardProps {
    tagImg: string;
    title: string;
    content: string;
    onDelete: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ tagImg, title, content, onDelete }) => {
    return (
        <div className="flex items-start border-l-[2px] border-gray-300 relative left-[20px] pl-6 pb-4 pt-2">
            <div className="relative right-[22.5px]">
                <span className="">
                    <Image 
                        src={tagImg}
                        alt="Tag" 
                        width={44} 
                        height={44} 
                        className="p-[6.67px] bg-white invert rounded-[100px]" 
                    />
                </span>
            </div>
            <div className="flex flex-col justify-between w-full">
                <div>
                    <h4 className="text-[24px] font-bold mb-2">{title}</h4>
                    <p className="text-[18px] text-gray-700">{content}</p>
                </div>
                <button
                    className="text-red-500 mt-4 text-right"
                    onClick={onDelete}
                >
                    Удалить
                </button>
            </div>
        </div>
    );
};

export default NoteCard;