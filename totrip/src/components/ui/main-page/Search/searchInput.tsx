'use client';

interface SearchInputProps {
    defaultValue: string;
    onChange: (value: string) => void;
    onClick: () => void;
}

export const SearchInput = ({ defaultValue, onChange, onClick }: SearchInputProps) => {
    return (
        <form className="flex mx-auto" onSubmit={(e) => e.preventDefault()} onClick={onClick}>
            <input
                className="w-[744px] rounded-[24px] border-[1px] border-solid border-[#70baff66] p-[24px] bg-[#ECECEC]"
                type="text"
                value={defaultValue || ""}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Куда вы хотите отправиться?"
                autoComplete="off"
            />
        </form>
    );
};
