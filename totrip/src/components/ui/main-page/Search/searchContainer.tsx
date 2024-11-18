'use client';

import { useState, useRef, useEffect } from "react";
import { SearchInput } from "./searchInput";
import { SearchInputActive } from "./searchInputActive";
import Image from "next/image";

export const SearchContainer = () => {
    const [isActive, setIsActive] = useState(false);
    const [inputValue, setInputValue] = useState(""); // Общее состояние для текста
    const containerRef = useRef<HTMLDivElement>(null);

    // Открытие активного поиска
    const toggleSearchInput = () => {
        setIsActive(true);
    };

    // Закрытие активного поиска при клике вне контейнера
    const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setIsActive(false);
        }
    };

    useEffect(() => {
        if (isActive) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isActive]);

    return (
        <div ref={containerRef} className="relative w-[904px] mx-auto">
        {isActive && (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[99]"
            onClick={() => setIsActive(false)}
        />
        )}
            {!isActive ? (
                <div className="flex flex-row w-[832px] mx-auto ">
                    <SearchInput 
                        defaultValue={inputValue} 
                        onChange={setInputValue} 
                        onClick={toggleSearchInput} 
                    />
                    <button className="rounded-[24px] bg-[#99A9EB] ml-[16px] p-[24px] border-[1px] border-solid border-[#70baff66]">
                        <Image
                            src="/img/common/search.svg"
                            alt="Поиск"
                            width={24}
                            height={24}
                        />
                    </button>
                </div>
            ) : (
                <SearchInputActive 
                    defaultValue={inputValue} 
                    onChange={setInputValue} 
                />
            )}
        </div>
    );
};
