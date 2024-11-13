// change this component to client component


'use client'


// import the data

// import the searchBar

// import the profile UI

import { useState, useEffect } from "react"
import { ProfileCard } from "@/components/ui/main-page/searchPlaceCard"
import { SearchInput } from "@/components/ui/main-page/searchInput"
import { data, iProfile } from "@/services/data"
import {useSearchParams} from 'next/navigation'


const Home = () => {

  const [profileData, setProfileData] = useState<iProfile[]>([])

  const searchParams = useSearchParams()
  const searchQuery = searchParams && searchParams.get("q"); // we use `q` to set the query to the browser, it could be anything

  useEffect(() => {

    const handleSearch = () => {
      const findUser = data.filter((user) => {
        if (searchQuery) {
          return (
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
          );
        } else {
          return true;
        }
      });
      setProfileData(findUser);
    };
    handleSearch();
  }, [searchQuery]);

  const totalUser = profileData.length;
  return (
  <section className="min-h-screen px-[2rem] md:px-[6rem] mt-[100px]">
    <p className="mb-10">Showing {totalUser} {totalUser > 1 ? "Users" : "User"}</p>

    <SearchInput defaultValue={""} />

    <div className="mt-8">
      {totalUser === 0 ? <p>No result returned</p> : (
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-5">
          {profileData.map(({ username, role, name, photo, email }: iProfile) => {
            return (
              <div key={username}>
                <ProfileCard name={name} role={role} photo={photo} email={email} username={username} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  </section>
  )
}

export default Home
