import React from 'react';

interface NoteCardProps {
    title: string;
    content: string;
    onDelete: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ title, content, onDelete }) => {
    return (
        <div className="flex items-start border-l-[2px] border-gray-300 relative left-[20px] pl-6 pb-4 pt-2">
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