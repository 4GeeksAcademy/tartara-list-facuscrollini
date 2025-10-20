import { useEffect, useState } from "react"
import { fetchFriendshipMission } from "../../api/friendshipMissions"
import useGlobalReducer from "../../hooks/useGlobalReducer"
import { saveFriendships } from "../../api/friendships"

const FriendshipMissionPanel = () => {

    const { store, dispatch } = useGlobalReducer()


    const [formData, setFormData] = useState({
        title: "",
        description: ""
    })

    

    const handleChange = (event) => {

        const value = event.target.value

        const name = event.target.name

        setFormData(prev => ({...prev, [name]: value}))
    }


    const clearForm = () =>{
        setFormData({
            title:"",
            description:""
        })
    }

    const deleteMission = async(friendship_id, mission_id) =>{
        dispatch({type:"loading"})
        const fetchBody = {
            friendship_id: friendship_id,
            friendship_mission_id: mission_id
        }

        const fetchDeleleteMisison = await fetchFriendshipMission(fetchBody, "DELETE")

        dispatch({type: "delete_friendship_mission", payload: fetchBody})

        dispatch({type:"loading"})

    }


    useEffect(() => {

        console.log(formData)

    }, [formData])


    useEffect(() => {

        if (store.friendships.length == 0) {
            saveFriendships(dispatch)
        }

    }, [])

    



    return (

        <div className="bg-white m-4 p-4 rounded-5 border border-3 border-black">
            <p className="display-1 text-center">Friendships Missions</p>

            <form className="rounded-3 bg-dark text-light p-2 " data-bs-theme="dark">
                <p className="text-center fs-5">Formulary</p>

                <label className="form-label" forHtml="title">Title</label>
                <input value={formData.title} onChange={handleChange} name="title" className="form-control" type="text" id="title"></input>
                <label className="form-label" forHtml="description">Description</label>
                <textarea value={formData.description} onChange={handleChange} name="description" className="form-control" id="description"></textarea>


                <div className="mt-2 text-end">
                    <input type="submit" className="btn btn-primary me-2" value="Save"></input>
                    <input onClick={clearForm} type="button" className="btn btn-light" value="Cancel"></input>
                </div>


            </form>

            {
                store.friendships.map((friendship) => (
                    <div key={friendship.id}>

                        <p>{friendship.user_from}</p>
                        {friendship.friendship_missions.length != 0 ? friendship.friendship_missions.map((mission, index) => (
                            <div key={index}>
                                <p className="fw-bold">{mission.title}</p>
                                <button onClick={()=> deleteMission(friendship.id, mission.id)} type="button" className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                                <button type="button" className="btn btn-warning"><i className="fa-solid fa-pen"></i></button>
                                <button type="button" className="btn btn-info"><i className="fa-solid fa-circle"></i></button>
                            </div>
                        ))

                            :
                            <p className="fw-bold">No missions with this friend</p>
                        }
                    </div>
                )
                )
            }
        </div>
    )
}

export default FriendshipMissionPanel