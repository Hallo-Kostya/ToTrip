export interface UserData {
    user_id: string;
    first_name: string;
    last_name: string;
    username: string;
    newImg: string;
    bio: string;
    city: string;
    slogan: string;
    country: string;
    photo: string;
    phone_number: string;
    created_at: string;
}

export interface TripData {
    id: string;
    tripImage: string;
    title: string;
    description: string;
    tripPlace: string;
    startDate: Date;
    endDate: Date;
    trippers: number;
    cities: string[];
}