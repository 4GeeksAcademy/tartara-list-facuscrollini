import { useEffect, useState } from "react"

import { createUserMission, getAllUserMissions } from "../../api/missions"
import useGlobalReducer from "../../hooks/useGlobalReducer"

const MissionPanel = () => {


    const { store, dispatch } = useGlobalReducer()

    const [loading, setLoading] = useState(false)

    const user_id = localStorage.getItem('user_id') || sessionStorage.getItem('user_id')

    const [allUserMissions, setAllUserMissions] = useState([])

    const [formData, setFormData] = useState({
        title: "",
        user_id: user_id
    })



    const handleChange = (event) => {

        let inputData = event.target.value

        setFormData(prev => ({ ...prev, [event.target.name]: inputData, user_id: user_id }))

    }

//funcion que se encarga de crear la mision en el back y guardarla en el store del useGlobalReducer utilizando el dispatch

    const handleSubmit = async (event) => {

        event.preventDefault()
        setLoading(true)
        const newMission = await createUserMission(formData)
        dispatch({ type: "save_new_user_mission", payload: newMission })

        setLoading(false)

    }

    //Funcion para borrar todos los campos del form

    const clearForm = () => {
        setFormData({ title: "", description: "" })
    }


    const showAllMissions = async (id) => {

        setLoading(true)
        const missions = await getAllUserMissions(id)
        dispatch({ type: "save_all_user_missions", payload: missions })
        setLoading(false)


    }



    useEffect(() => {

    }, [formData])



    //useEffect que trae las misiones con fetch y las guarda en el store

    useEffect(() => {

        if(user_id){

            showAllMissions(user_id)
        }

    }, [])


    //useEffect que se activa cada vez que store cambia y las guarda en el estado allUserMissions

    useEffect(() => {

        setAllUserMissions(store.all_missions)

    }, [store])



    return (
        <>
            {loading &&
                <div className="alert alert-info" role="alert">
                    Cargando... <div className="spinner-border"></div>
                </div>
            }
            <button className="btn button-color-4 font-color-3" data-bs-toggle="modal" data-bs-target="#createMissionModal">
                <i className="fa-solid fa-plus"></i>
            </button>
            <form onSubmit={handleSubmit} className="ms-2">

                <label className="form-label" htmlFor="mission-title">Title</label>
                <input onChange={handleChange} value={formData.title} name="title" type="text" id="mission-title" className="form-control"></input>
                <label className="form-label" htmlFor="mission-description">Description</label>
                <div className="form-floating">

                    <textarea onChange={handleChange} value={formData.description} name="description" type="text" id="mission-description" className="form-control"></textarea>
                    <label htmlFor="mission-description">Put a description</label>
                </div>

                <input type="submit" className="btn btn-primary mt-2 ms-2" value="Save mission" />
                <input onClick={clearForm} type="button" className="btn btn-danger mt-2 ms-2" value="Cancel" />

            </form>
            {allUserMissions?.map((mission, index) => (

                <div key={index} className="rounded-4 border border-4 border-black m-5">
                    <h2 className="text-center">{mission.title}</h2><button type="button" className="btn btn-danger"><i className="fa-solid fa-xmark"></i></button>
                    <h4>Description </h4>
                    <hr />
                    <p className="text-center" >{mission.description}</p>
                    <hr />
                    <h4>State</h4>
                    <hr />
                    <p className="text-center">{mission.is_active ? "Active" : "Inactive"}</p>
                    <p className="display-1">{mission.id}</p>

                </div>




            ))}

            {/* 


            Modal para crear tarea


            <div className="modal fade" id="createMissionModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Create mission</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                           <label  className="form-label" htmlFor="mission-title">Title</label>
                           <input type="text" id="mission-title" className="form-control"></input>
                           <label  className="form-label" htmlFor="mission-description">Description</label>
                           <div className="form-floating">

                           <textarea type="text" id="mission-description" className="form-control"></textarea>
                           <label htmlFor="mission-description">Put a description</label>
                           </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary">Create</button>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}
export default MissionPanel