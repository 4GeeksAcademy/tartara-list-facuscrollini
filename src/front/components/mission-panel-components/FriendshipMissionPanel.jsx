import { useEffect, useState } from "react"
import { fetchFriendshipMission } from "../../api/friendshipMissions"
import useGlobalReducer from "../../hooks/useGlobalReducer"

const FriendshipMissionPanel = () =>{


const [friendshipMissions, setFriendshipMissions] = useState([])
const {store,dispatch} = useGlobalReducer()

const getAllFriendshipMissions = async() =>{

    const missions = await fetchFriendshipMission({friendship_id: 5}, "GET")
    dispatch({type:"save_friendship_missions", payload: missions})
}

useEffect(()=>{

getAllFriendshipMissions()

},[])


useEffect(()=>{

setFriendshipMissions(store.friendshipMissions)

},[store.friendshipMissions])

return(
    <>
{friendshipMissions.map((mission)=>(
    <p>{mission.title}</p>
)

)}
    </>
)
}

export default FriendshipMissionPanel