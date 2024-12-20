export interface UserData {
    name: string;
    surname: string;
    username: string;
    newImg: string;
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
  