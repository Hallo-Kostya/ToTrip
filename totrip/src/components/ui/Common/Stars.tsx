import Image from "next/image";

interface StarsProps {
    rating: number;
    width?: number;
    height?: number;
};

export default function Stars({ rating, width=26, height=26}: StarsProps) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar; 
    return (
        
        <div className="flex gap-[4.8px]">
            {[...Array(fullStars)].map((_, index) => (
                <Image
                    key={`full-${index}`}
                    src="/img/common/Star.svg"
                    alt="star"
                    width={width}
                    height={height}
                />
            ))}
            {halfStar > 0 && (
                <Image
                    key="half"
                    src="/img/common/rating-star-half-orange.svg"
                    alt="half-star"
                    width={width}
                    height={height}
                />
            )}
            {[...Array(emptyStars)].map((_, index) => (
                <Image
                    key={`empty-${index}`}
                    src="/img/common/rating-star-gray.svg"
                    alt="star"
                    width={width}
                    height={height}
                />
            ))}
        </div>
    );
}