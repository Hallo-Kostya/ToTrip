import Image from "next/image"
import Stars from "../../Common/Stars"
import { iPlaceImage } from "@/services/data"

interface iComment {
    imageUrl: string
    Username: string
    date: string
    rating: number
    objectName: string
    objectDescription: string
    photos: iPlaceImage[]
}

export default function Comment({ imageUrl, Username, date, rating, objectName, objectDescription, photos }: iComment) {
    return (
        <div className="flex flex-col gap-[22px] w-[1553px] px-[32px] py-[20px] bg-gray-200 rounded-[25px] border-[1px] border-black shadow">
            <div className="flex flex-col gap-[8px]">
                <div className="flex flex-row items-center mb-[15px]">
                    <Image src={imageUrl} width={70} height={70} className="rounded-[35px] mr-[12px]" alt="картинка пользователя" />
                    <p className="mr-[32px] text-[25px] font-bold text-black">{Username}</p>
                    <p className="text-[18px] font-normal text-gray">{date}</p>
                </div>
                <Stars rating={rating}></Stars>
            </div>
            <div className="flex flex-col gap-[16px]">
                <p className="text-black text-[20px] font-bold">{objectName}</p>
                <p className="text-[20px] break-words">{objectDescription}</p>
            </div>
            <div className="flex flex-row">
                {photos.map((image: iPlaceImage, index: number) => (
                    <Image
                        key={index}
                        src={image.image}
                        width={150}
                        height={150}
                        className="rounded-[15px] border-[1px] border-gray-400 mr-[13px]"
                        alt={`Фото ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}