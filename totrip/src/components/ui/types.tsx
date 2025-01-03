export interface UserData {
    first_name: string;
    last_name: string;
    login: string;
    newImg?: string;
    about: string;
    location: string;
    motto: string;
    avatar?: string;
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
  