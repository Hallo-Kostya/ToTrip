import React from 'react';
import Image from 'next/image';

interface NoteCardProps {
    tagImg: string;
    title: string;
    content: string;
    onDelete: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ tagImg, title, content, onDelete, dynamicStyles }) => {
    return (
        <div className={`${dynamicStyles} border-l-2 border-black`}>
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
                    <h4 className="text-[24px] font-bold mb-2 ml-[96px]">{title}</h4>
                    <p className="text-[18px] text-gray-700 ml-[96px]">{content}</p>
                    
                </div>
                <button
                    className="flex relative text-red-500 ml-auto mb-10 mr-4"
                    onClick={onDelete}
                >
                    <Image src="/img/profile/Trash Bin 2.svg" alt="delete" className="relative flex" width={32} height={32}/>
                </button>
            </div>
        </div>
    );
};

export default NoteCard;