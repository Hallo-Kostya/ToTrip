import Image from 'next/image'
import { iSearchPlaceCard } from "@/services/data";
import Link from 'next/link';

export const PlaceCard = ({ id, name, photo, location }: iSearchPlaceCard) => {
    return (
        <Link href={`/places/${id}`}>
            <div className="flex flex-row gap-[24px] items-center hover:bg-gray-100 active:bg-gray-300 rounded-lg w-[816px]">
            <Image src={photo} alt={name} className="rounded-lg" height={80} width={80}/>
            <div className="flex flex-col gap-[8px]">
                <h2 className='text-[16px] text-black font-medium'>{name}</h2>
                <p className='text-[14px] text-[#5B5B5B] font-light'>{location}</p>
            </div>
        </div>
        </Link>
    )

}