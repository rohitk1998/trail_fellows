'use client';

import { useSelector } from "react-redux";
import { UserCard } from "./userCard";

export const UserListing = ()=> {

  const { currentUserFriendList } = useSelector((state : any )=> state.app)

    return(
          <div className="w-[100%] max-h-screen overflow-y-scroll pt-5">
            {
               Array.isArray(currentUserFriendList) && currentUserFriendList.map((item)=> (
                    <UserCard item={item}/>
                ))
            }
          </div>
    )
}