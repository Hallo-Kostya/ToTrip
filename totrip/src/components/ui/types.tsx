export interface UserData {
    first_name: string;
    last_name: string;
    username: string;
    newImg?: string;
    bio: string;
    city: string;
    motto: string;
    country: string;
    avatar?: string;
    phone_number: string;
}

export interface TripData {
    tripImage: string;
    tripName: string;
    tripPlace: string;
    tripStart: Date;
    tripEnd: Date;
    users: number;
    tripId: string;
}
  