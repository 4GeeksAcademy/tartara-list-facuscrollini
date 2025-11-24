import { useEffect, useState } from "react"
import { fetchFriendship, saveFriendships } from "../../services/friendships"
import useGlobalReducer from "../../hooks/useGlobalReducer"
import { useNavigate, useParams } from "react-router-dom"
import { fetchGetAllUsers } from "../../services/users"
import MyFriends from "../../components/dashboard-components/MyFriends"
import MyProfile from "../../components/dashboard-components/MyProfile"
import { useStorage } from "../../hooks/useStorage"
import { useLogout } from "../../hooks/useLogout"

const Dashboard = () => {


    const navigate = useNavigate()

    const params = useParams()


    const { dispatch } = useGlobalReducer()
    const { user_id } = useStorage()

    const navigateInside = (section) => {
        navigate(`/auth/dashboard/${section}`)
    }


    useEffect(() => {
        saveFriendships(dispatch, user_id)
    }, [])


    return (
        <div className="container">

            <div className="row">
                <div className="col-2">
                    <ul className="list-group">
                        <li onClick={() => navigateInside("my-profile")} className="list-group-item" ><button className="btn btn-warning">My profile</button></li>
                        <li onClick={() => navigateInside("my-friends")} className="list-group-item" ><button className="btn btn-warning">My friend</button></li>
                        <li onClick={useLogout} className="list-group-item" ><button className="btn btn-danger">Logout</button></li>
                    </ul>
                </div>
                <div className="col-10">
                    {
                        params.section === "my-profile" ?
                            <MyProfile />
                            :
                            params.section === "my-friends" ?
                                <MyFriends />

                                :
                                <div>Invalid param</div>

                    }
                </div>
            </div>


        </div>
    )
}
export default Dashboard