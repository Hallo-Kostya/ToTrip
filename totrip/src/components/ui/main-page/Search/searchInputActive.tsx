'use client';

import { useSearchParams, useRouter  } from "next/navigation";
import { useState, ChangeEvent, useEffect, useRef} from "react";
import Image from "next/image";
import { PlaceCard } from "./searchPlaceCard";
import { fetchSearchPlaceCards } from "@/services/data";
import { iSearchPlaceCard } from "@/services/data";
import { useDebouncedCallback } from "use-debounce";

interface SearchInputActiveProps {
    defaultValue: string;
    onChange: (value: string) => void;
    onKeyDown: (value: boolean) => void;
}

export const SearchInputActive = ({ defaultValue, onChange, onKeyDown}: SearchInputActiveProps) => {
    const searchParams = useSearchParams()
    const router = useRouter();
    const [PlaceData, setPlaceData] = useState<iSearchPlaceCard[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        const loadData = async () => {
          if (defaultValue.trim()) {
            const results = await fetchSearchPlaceCards(defaultValue.trim());
            setPlaceData(results);
          } else {
            setPlaceData([]);
          }
        };
        loadData();
      }, [defaultValue]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        onChange(newValue);
        handleSearch(newValue);
    };

    const handleSearch = useDebouncedCallback((query: string) => {
        const trimmedQuery = query.trim();
        const params = new URLSearchParams(searchParams)
        if (trimmedQuery) {
            params.set('query', trimmedQuery)
        } else {
            params.delete('query')
        }
        router.push(`?${params.toString()}`, { scroll: false })
    }, 300);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          const trimmedQuery = defaultValue.trim();
          const params = new URLSearchParams(searchParams);
          if (trimmedQuery) {
            params.set('query', trimmedQuery);
          } else {
            params.delete('query');
          }
          
          router.push(`/search?${params.toString()}`, { scroll: false });
          onKeyDown(false);
        }
      };
    

    return (
        <div className="flex flex-col bg-white gap-[32px] z-[100] relative pt-[11px] pb-[28px] px-[24px] rounded-[24px] border-[2px] border-solid">
            <form className='flex mx-auto' onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-row w-[856px] border-b-[1px] border-black border-solid mx-auto">
                    <Image 
                        src="/img/common/search.svg" 
                        alt="Поиск" 
                        width={24} 
                        height={24} 
                    />
                    <input 
                        ref={inputRef}
                        className='w-[808px] rounded-[24px] p-[12px] bg-[#FFF]' 
                        type="text" 
                        value={defaultValue || ""} 
                        onChange={handleChange} 
                        onKeyDown={handleKeyPress}
                        placeholder="Куда вы хотите отправиться?" 
                        autoComplete='off'
                    />
                </div>
            </form>

            {defaultValue.trim() && (
                <div className="flex flex-col px-[20px] items-start gap-[10px] bg-white">
                    {PlaceData.map(({id, name, location, photo}: iSearchPlaceCard) => (
                        <div key={name}>
                            <PlaceCard id ={id} name={name} photo={photo} location={location} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
