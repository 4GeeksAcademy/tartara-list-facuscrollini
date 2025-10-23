import { useEffect, useState } from "react"
import { fetchFriendship } from "../../api/friendships"
import useGlobalReducer from "../../hooks/useGlobalReducer"
import { useNavigate, useParams } from "react-router-dom"
import { fetchGetAllUsers } from "../../api/users"
import MyFriends from "../../components/dashboard-components/MyFriends"
import MyProfile from "../../components/dashboard-components/MyProfile"

const Dashboard = () => {


    const navigate = useNavigate()

    const params = useParams()

    const user_local = localStorage.getItem("user_name")

    const user_session = sessionStorage.getItem("user_name")





    const { dispatch } = useGlobalReducer()

    const logout = () => {

        if (user_local) {
            localStorage.removeItem("token")
            localStorage.removeItem("user_id")
            localStorage.removeItem("user_name")
        } else if (user_session) {
            sessionStorage.removeItem("token")
            sessionStorage.removeItem("user_id")
            sessionStorage.removeItem("user_name")
        }
        dispatch({ type: "logout" })
        navigate("/")
    }





    const navigateInside = (section) => {
        navigate(`/auth/dashboard/${section}`)
    }



    return (
        <div className="container">

            <div className="row">
                <div className="col-2">
                    <ul className="list-group">
                        <li onClick={() => navigateInside("my-profile")} className="list-group-item" ><button className="btn btn-warning">My profile</button></li>
                        <li onClick={() => navigateInside("my-friends")} className="list-group-item" ><button className="btn btn-warning">My friend</button></li>
                        <li onClick={logout} className="list-group-item" ><button className="btn btn-danger">Logout</button></li>
                    </ul>
                </div>
                <div className="col-10">
                    {
                        params.section === "my-profile" ?
                            <MyProfile/>
                            :
                            params.section === "my-friends" ?
                                <MyFriends/>

                                :
                                <div>Invalid param</div>

                    }
                </div>
            </div>


        </div>
    )
}
export default Dashboard