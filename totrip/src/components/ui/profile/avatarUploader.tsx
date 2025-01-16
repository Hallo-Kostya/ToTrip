'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface AvatarUploaderProps {
  currentAvatar: File | string | null;
  onAvatarChange: (newAvatar: File | null) => void;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({ currentAvatar, onAvatarChange }) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (currentAvatar instanceof File) {
      const objectUrl = URL.createObjectURL(currentAvatar);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof currentAvatar === 'string' && currentAvatar.trim()) {
      setPreview(currentAvatar);
    } else {
      setPreview('/img/default-avatar.png');
    }
  }, [currentAvatar]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onAvatarChange(file);
    }
  };

  return (
    <div className="relative w-[177px] h-[177px] mt-3">
      <Image
        src={preview || '/img/default-avatar.png'}
        alt="Avatar"
        className="w-[177px] h-[177px] rounded-full object-cover"
        width={177}
        height={177}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
        id="file-input"
      />
      <label
        htmlFor="file-input"
        className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black bg-opacity-50 rounded-full text-white transition-opacity duration-300 hover:opacity-100"
      >
        <span>Загрузить</span>
      </label>
    </div>
  );
};

export default AvatarUploader;