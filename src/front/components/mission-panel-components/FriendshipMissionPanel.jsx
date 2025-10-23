import { useEffect, useState } from "react"
import { fetchFriendshipMission } from "../../api/friendshipMissions"
import useGlobalReducer from "../../hooks/useGlobalReducer"
import { saveFriendships } from "../../api/friendships"

const FriendshipMissionPanel = () => {

    const { store, dispatch } = useGlobalReducer()

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        friendship_id: ""
    })

    const switchLoading = () => {
        dispatch({ type: "loading" })
    }

    const handleChange = (event) => {


        const name = event.target.name
        let value = event.target.value

        if (name === "friendship_id") {
            value = Number(value)
        }

        setFormData(prev => ({ ...prev, [name]: value }))
    }


    const handleSubmit = (event) => {

        event.preventDefault()
        if (formData.friendship_mission_id) {
            editMission(formData)
        } else {
            createMission(formData)
        }

    }

    const clearForm = () => {
        setFormData({
            title: "",
            description: "",
            friendship_id: ""
        })
    }

    const deleteMission = async (friendship_id, mission_id) => {
        switchLoading()
        const fetchBody = {
            friendship_id: friendship_id,
            friendship_mission_id: mission_id
        }

        const fetchDeleleteMisison = await fetchFriendshipMission(fetchBody, "DELETE", false)

        dispatch({ type: "delete_friendship_mission", payload: fetchBody })
        switchLoading()

    }



    const createMission = async (fetchBody) => {

        switchLoading()

        const { friendship_id } = fetchBody

        const fetchCreateMission = await fetchFriendshipMission(fetchBody, "POST", false)
        console.log(fetchCreateMission);


        dispatch({ type: "save_friendship_mission", payload: { data: fetchCreateMission, friendship_id: friendship_id } })
        clearForm()
        switchLoading()
    }

    const handleEditButton = (friendship_id, mission) => {

        const { id, ...resto } = mission

        setFormData({ ...resto, friendship_id: friendship_id, friendship_mission_id: id })

    }


    const editMission = async (fetchBody) => {

        const { friendship_id } = fetchBody


        switchLoading()
        const fetchEditMission = await fetchFriendshipMission(fetchBody, "PATCH", false)

        if(!fetchEditMission.error){

            dispatch({ type: "edit_friendship_mission", payload: { data: fetchEditMission, friendship_id: friendship_id } })
            if (fetchEditMission) {
                clearForm()
            }
            switchLoading()
        } else{
            console.log(fetchEditMission)
            switchLoading()
        }


    }

    const switchMissionState = async (friendship_id, mission_id) => {

        const fetchBody = {
            friendship_id: friendship_id,
            mission_id: mission_id
        }

        switchLoading()
        
        const fetchSwitchMissionState = await fetchFriendshipMission(fetchBody, "PATCH", true)

        dispatch({ type: "switch_state_friendship_mission", payload: { friendship_id: friendship_id, mission_id: mission_id } })
        switchLoading()
    }



    useEffect(() => {

        if (store.friendships.length == 0) {
            saveFriendships(dispatch)
        }

    }, [])





    return (

        <div className="bg-white m-4 p-4 rounded-5 border border-3 border-black">
            <p className="display-1 text-center">Friendships Missions</p>

            <form onSubmit={handleSubmit} className="rounded-3 bg-dark text-light p-2 " data-bs-theme="dark">
                <p className="text-center fs-5">Formulary</p>

                <label htmlFor="friendship-id" className="form-label">Friendship ID</label>
                <input value={formData.friendship_id} name="friendship_id" onChange={handleChange} id="friendship-id" type="text" className="form-control" required></input>


                <label className="form-label" htmlFor="title">Title</label>
                <input value={formData.title} onChange={handleChange} name="title" className="form-control" type="text" id="title" required></input>
                <label className="form-label" htmlFor="description">Description</label>
                <textarea value={formData.description} onChange={handleChange} name="description" className="form-control" id="description" ></textarea>


                <div className="mt-2 text-end">
                    <input type="submit" className="btn btn-primary me-2" value="Save"></input>
                    <input onClick={clearForm} type="button" className="btn btn-light" value="Cancel"></input>
                </div>


            </form>

            {
                store.friendships.map((friendship) => (

                    <div key={friendship.id}>

                        <p>{friendship.user_from}</p>
                        <p>Friendship id: {friendship.id}</p>

                        <p className="fw-bold">Actives</p>

                        {/* Map con las misiones activas de esta amistad */}

                        {
                            friendship.friendship_missions.filter(mission => mission.is_active).length > 0 ? (
                                friendship.friendship_missions.filter(mission => mission.is_active).map((mission, index) => (
                                    <div key={index}>
                                        <p className="fw-bold">{mission.title}</p>
                                        <button onClick={() => deleteMission(friendship.id, mission.id)} type="button" className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                                        <button onClick={() => handleEditButton(friendship.id, mission)} type="button" className="btn btn-warning"><i className="fa-solid fa-pen"></i></button>
                                        <button onClick={() => switchMissionState(friendship.id, mission.id)} type="button" className="btn btn-info"><i className="fa-regular fa-circle"></i></button>
                                    </div>
                                ))
                            ) :
                                <div>No active missions for missions with {friendship.user_from}</div>
                        }


                        <p className="fw-bold">Inactives</p>
                        {/*Map con las misiones inactivas de esta amistad */}
                        {

                            friendship.friendship_missions.filter(mission => !mission.is_active).length > 0 ? (
                                friendship.friendship_missions.filter(mission => !mission.is_active).map((mission, index) => (
                                    <div key={index}>
                                        <p className="fw-bold">{mission.title}</p>
                                        <button onClick={() => deleteMission(friendship.id, mission.id)} type="button" className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                                        <button onClick={() => handleEditButton(friendship.id, mission)} type="button" className="btn btn-warning"><i className="fa-solid fa-pen"></i></button>
                                        <button onClick={()=>switchMissionState(friendship.id, mission.id)} type="button" className="btn btn-info"><i className="fa-solid fa-circle"></i></button>
                                    </div>
                                ))
                            ) :
                                <div>No inactive missions for missions with {friendship.user_from}</div>
                        }






                    </div>
                )
                )
            }
        </div>
    )
}

export default FriendshipMissionPanel