export interface UserData {
    user_id: number;
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
    id: number;
    tripImage: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    trippers: number;
    cities: [];
    tripPlace: string;
}