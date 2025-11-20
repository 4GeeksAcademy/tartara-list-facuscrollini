import { useEffect, useState } from "react"
import useGlobalReducer from "../../../hooks/useGlobalReducer"
import { useStorage } from "../../../hooks/useStorage"
import { useNavigate } from "react-router-dom"
import { fetchGetUser } from "../../../services/users"
import { fetchFriendship } from "../../../services/friendships"
const FriendListZone = () => {


    const { store, switchLoading, dispatch } = useGlobalReducer()

    const [cardData, setCardData] = useState({})

    const { user_name } = useStorage()

    const navigate = useNavigate()



    const handleOurMissions = (user_name) => {

        navigate(`/auth/mission-panel#${user_name}`)

    }


    const handleShowCard = async (user_id) => {
        switchLoading()
        const fetchUserData = await fetchGetUser(user_id)
        setCardData(fetchUserData)
        switchLoading()
    }



    const handleDeleteFriendship = async (user_to_id, user_from_id) => {


        const fetchBody = {
            user_to_id,
            user_from_id
        }

        switchLoading()

        const fetchFriendshipDeleted = await fetchFriendship(fetchBody, "DELETE")

        const friendshipId = fetchFriendshipDeleted.deleted_friendship_id

        if (friendshipId) {
            dispatch({ type: "delete_friendship", payload: friendshipId })
        }


        switchLoading()
    }






    return (
        <div className="my-4 container">
            <div className="w-100 back-color-1 rounded-top-4 p-3 text-end pe-5 fs-3 font-color-11">Friends</div>
            <div className="back-color-11 p-5 border-2 border border-top-0  rounded-bottom-4 border-color-1 ">

                <ul className="list-group">

                    {store.friendships?.map((friendship, index) => {

                        const friendshipTitle = user_name != friendship.user_from ? friendship.user_from : friendship.user_to

                        const friendId = user_name != friendship.user_from ? friendship.user_from_id : friendship.user_to_id

                        // return <li className="list-group-item back-color-10 font-color-11 d-flex justify-content-between">{friendshipTitle}<span className="font-color-1"><i className="fa-solid fa-ellipsis-vertical"></i></span></li>
                        return <li key={index} className="list-group-item back-color-10 font-color-11 d-flex justify-content-between dropend">

                            {friendshipTitle}
                            <button type="button" className="button-color-10 border-0 h-100 font-color-1 fs-3" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                            <ul className="dropdown-menu back-color-1">
                                <li className="dropdown-item  font-color-11 "
                                    id="seeProfileButton"
                                    onClick={() => handleShowCard(friendId)}
                                    data-bs-toggle="modal"
                                    data-bs-target="#seeProfileModal"
                                >
                                    See profile
                                </li>
                                <li onClick={() => handleOurMissions(friendshipTitle)} className="dropdown-item  font-color-11">View our missions</li>
                                <li className="dropdown-item  font-color-11">
                                    <button onClick={() => handleDeleteFriendship(friendship.user_to_id, friendship.user_from_id)} type="button" className=" button-color-10 font-color-11 rounded border-0 px-3 py-2">Delete friend</button>
                                </li>
                            </ul>



                        </li>

                    })}
                    <div className="modal fade" id="seeProfileModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="seeProfileButton" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content back-color-1 font-color-11 modal-profile-card">
                                <div className="modal-header d-flex justify-content-end border-0">

                                    <button type="button" className="btn font-color-11" data-bs-dismiss="modal" aria-label="Close">
                                        <i className="fa-solid fa-xmark fs-3"></i>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="ratio ratio-1x1">
                                        <img src="https://marmota.me/wp-content/uploads/2024/11/Absolute-Superman-001-2025-001-1.jpg" className="object-fit-cover rounded-circle"></img>
                                    </div>
                                    {store.loading ?
                                        <p className="placeholder-glow text-center">
                                            <span className="placeholder col-12"></span>
                                        </p>
                                        :
                                        <p className="display-3 font-color-11 text-center">{cardData.user_name}</p>

                                    }
                                    <hr className="border border-1 border-color-11 opacity-100" />
                                    <p className="text-center fs-3">{cardData.email}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default FriendListZone