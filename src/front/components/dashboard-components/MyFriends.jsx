import { useEffect, useState } from "react"
import { fetchGetAllUsers } from "../../api/users"
import useGlobalReducer from "../../hooks/useGlobalReducer"
import SearchZone from "./my-friends-components/SearchZone"
import FriendRequestsZone from "./my-friends-components/FriendRequestsZone"
import FriendListZone from "./my-friends-components/FriendList"
import { saveFriendships, saveRequestsFrom, saveRequestsTo } from "../../api/friendships"
import { useRefresh } from "../../hooks/useRefresh"


const MyFriends = () => {


    const user_id = localStorage.getItem("user_id") || sessionStorage.getItem("user_id")
    const {dispatch, switchLoading} = useGlobalReducer()



    return (
        <div className="container">
            <button onClick={()=>useRefresh(user_id, dispatch, switchLoading)} className="btn btn-secondary">Refresh<i className="fa-solid fa-arrows-rotate"></i></button>
           <SearchZone/>
            <FriendRequestsZone/>
            <FriendListZone/>
        </div>
    )
}

export default MyFriends