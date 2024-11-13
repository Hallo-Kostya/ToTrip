export interface iProfile {
  name: string;
  email: string;
  photo: string;
  username: string;
  role: "Frontend Developer" | "Backend Developer" | "Fullstack Developer";
}

export const data: iProfile[] = [];

const RandomNames = [
  "Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Henry", "Ivy", "Jack",
  "Kate", "Liam", "Mia", "Noah", "Olivia", "Peter", "Quinn", "Rose", "Sam", "Tina",
  "Uma", "Victor", "Wendy", "Xander", "Yara", "Zane", "Abigail", "Benjamin", "Chloe",
  "Daniel", "Emily", "Fiona", "George", "Hannah", "Isaac", "Julia", "Kevin", "Lily",
  "Mason", "Nora", "Oscar", "Penelope", "Quentin", "Rachel", "Simon", "Tiffany", "Ulysses",
  "Violet", "William", "Xavier", "Yasmine", "Zoey", "Stephen", "Gerrard", "Adewale",
];

for (let i = 0; i < RandomNames.length; i++) {
  const profile: iProfile = {
      name: RandomNames[i],
      role: i % 3 === 0 ? "Backend Developer" : i % 2 === 0 ? "Frontend Developer" : "Fullstack Developer",
      email: `${RandomNames[i].toLowerCase()}@example.com`,
      username: `user${RandomNames[i].toLowerCase()}_username`,
      photo: "/img/user-photo.png",
  };
  data.push(profile);
}