import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";
import Image from "next/image";
import styles from "@/components/css/search.module.css"

interface iDefault {
    defaultValue: string | null
};

export const SearchInput = ({ defaultValue } : iDefault) => {
    const router = useRouter();

    const [inputValue, setValue] = useState(defaultValue)
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setValue(inputValue);
    }

    const handleSearch = () => {

        if (inputValue) return router.push(`/trips/?q=${inputValue}`);

        if (!inputValue) return router.push("/trips")
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') return handleSearch();
    };

    return (
        <div className={styles["search"]}>
            <form className={styles["lead-search-form"]}>
            <input type="text" id="search" name="query" value={inputValue ?? ""} onChange={handleChange} onKeyDown={handleKeyPress} placeholder="Куда вы хотите отправиться?" autoComplete='off'/>
            <div id="places-dropdown" className={styles["dropdown-content"]}></div>
            <button className={styles["search-button__lead"]}>
                <Image 
                    src="/img/common/search.svg" 
                    alt="Поиск" 
                    width={24} 
                    height={24} 
                />
            </button>
            </form>
        </div>
    )
}