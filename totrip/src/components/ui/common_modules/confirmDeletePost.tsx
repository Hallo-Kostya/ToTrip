import React from "react";

interface ConfirmDeletePostProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDeletePost: React.FC<ConfirmDeletePostProps> = ({ onConfirm, onCancel }) => {
    return (
        <div className='popup-backdrop flex items-center justify-center fixed inset-0 bg-black bg-opacity-50'>
            <div className='logout_popup_container flex flex-col w-[454px] p-[24px] rounded-[24px] bg-white'>
                <p className='font-bold text-[20px]'>Вы действительно хотите удалить публикацию?</p>
                <div className='flex justify-end gap-3 mt-4'>
                    <button className='p-2 px-4 bg-gray-500 text-white rounded-xl' onClick={onCancel}>Отменить</button>
                    <button className='p-2 px-4 bg-black text-white rounded-xl' onClick={onConfirm}>Удалить</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeletePost;