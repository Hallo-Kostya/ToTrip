'use client'

import React, { useState } from 'react';
import Image from 'next/image';

interface AvatarUploaderProps {
  currentAvatar?: string;
  onAvatarChange: (newAvatar: File | null) => void;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({ currentAvatar, onAvatarChange }) => {
  const [selectedImagePreview, setSelectedImagePreview] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedImagePreview(result);
      };
      onAvatarChange(file);
    }
  };

  return (
    <div className="relative w-[177px] h-[177px] mt-3">
      <div className="flex justify-center items-center max-w-[177px] max-h-[177px]">
        <Image
          src={selectedImagePreview || currentAvatar || ''}
          alt="Avatar"
          className="w-[177px] h-[177px] rounded-full object-cover"
          width={177}
          height={177}
        />
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
        id="file-input"
      />
      <label htmlFor="file-input" className={`
        absolute inset-0 cursor-pointer flex items-center justify-center
        bg-black bg-opacity-50 rounded-full text-white transition-opacity
        duration-300 ${selectedImagePreview ? 'opacity-0' : 'opacity-100'}
      `}>
        <span>Загрузить</span>
      </label>
    </div>
  );
};

export default AvatarUploader;