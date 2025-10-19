import { useEffect, useState } from "react"

import { createUserMission, deleteUserMission, getAllUserMissions, modifyUserMission, switchMissionState } from "../../api/missions"
import useGlobalReducer from "../../hooks/useGlobalReducer"

const UserMissionPanel = () => {


    const { store, dispatch } = useGlobalReducer()



    //Estado que se activa cuando se esta procesando informacion con fetch

    const [loading, setLoading] = useState(false)


    //Constante que guarda el usar_id si lo encuentra en localStorage o sessionStorage

    const user_id = localStorage.getItem('user_id') || sessionStorage.getItem('user_id')



    //Estado donde se guardan las misiones si el usuario inicio sesion

    const [allUserMissions, setAllUserMissions] = useState([])

    const [inactiveMissions, setInactiveMissions] = useState([])
    const [activeMissions, setActiveMissions] = useState([])


    //Estado donde se guarda la informacion del formulario

    const [formData, setFormData] = useState({
        title: "",
        user_id: user_id
    })


    //Funcion para eliminar mision del usuario

    const handleDeleteUserMission = async (mission_id, user_id) => {
        setLoading(true)

        const deleteData = {
            user_id: user_id,
            mission_id: mission_id
        }

        const deleteFetch = await deleteUserMission(deleteData)

        dispatch({ type: "delete_user_mission", payload: mission_id })

        setLoading(false)

    }


    //Funcion para actualizar la informacion de la tarea

    const handleModifyUserMission = async (event) => {

        event.preventDefault()

        setLoading(true)

        const { id, ...resto } = formData

        const fetchData = { ...resto, mission_id: id }

        if (!fetchData.user_id) {
            alert('You have not edited the mission')
        } else {

            const fetchModifyUserMission = await modifyUserMission(fetchData)
            clearForm()
            dispatch({ type: "edit_user_mission", payload: formData })

        }
        setLoading(false)

    }


    //Funcion que marca una tarea como hecha/no hecha, es decir, cambia is_active a true o false

    const handleMissionIsActive = async(user_id, mission_id) =>{

        setLoading(true)

        const fetchData = {
            user_id: user_id,
            mission_id: mission_id
        }

        
        const fetchMissionIsActive = await switchMissionState(fetchData)
        dispatch({type:"switch_state_user_mission", payload: mission_id})


        setLoading(false)
    }




    //Funcion que maneja los campos del formulario, y cada vez que se escribe en ellos lo guarda en formData

    const handleChange = (event) => {

        let inputData = event.target.value

        setFormData(prev => ({ ...prev, [event.target.name]: inputData, user_id: user_id }))

    }

    //Funcion que se encarga de crear la mision en el back y guardarla en el store del useGlobalReducer utilizando el dispatch

    const handleSubmit = async (event) => {

        event.preventDefault()
        setLoading(true)
        const newMission = await createUserMission(formData)
        dispatch({ type: "save_new_user_mission", payload: newMission })
        clearForm()
        setLoading(false)

    }

    //Funcion para borrar todos los campos del form

    const clearForm = () => {
        setFormData({ title: "", description: "" })
    }

    //Funcion que hace fetch de todas las misiones del usuario y las guarda en el contexto

    const showAllMissions = async (id) => {

        setLoading(true)
        const missions = await getAllUserMissions(id)

        if (!missions.error) {
            dispatch({ type: "save_all_user_missions", payload: missions })
            setLoading(false)
        }
        setLoading(false)

    }




    //useEffect que trae las misiones con fetch y las guarda en el store

    useEffect(() => {

        if (user_id) {
            showAllMissions(user_id)
        }

    }, [])



    //useEffect que se activa cada vez que store cambia y las guarda en el estado allUserMissions

    useEffect(() => {

        setAllUserMissions(store.allMissions)

        setActiveMissions(store.allMissions.filter((mission)=> mission.is_active))

        setInactiveMissions(store.allMissions.filter((mission)=> !mission.is_active))

    }, [store])



    return (
        <div className="bg-white m-4 p-4 border border-3 border-black rounded-5">
        <h1 className="display-1 text-center">User missions</h1>
            {loading &&
                <div className="alert alert-info" role="alert">
                    Cargando... <div className="spinner-border"></div>
                </div>
            }
            <button className="btn button-color-4 font-color-3" data-bs-toggle="modal" data-bs-target="#createMissionModal">
                <i className="fa-solid fa-plus"></i>
            </button>
            <form onSubmit={formData.id ? handleModifyUserMission : handleSubmit} className="ms-2">

                <label className="form-label" htmlFor="mission-title">Title</label>
                <input onChange={handleChange} value={formData.title} name="title" type="text" id="mission-title" className="form-control" required></input>
                <label className="form-label" htmlFor="mission-description">Description</label>
                <div className="form-floating">

                    <textarea onChange={handleChange} value={formData.description} name="description" type="text" id="mission-description" className="form-control"></textarea>
                    <label htmlFor="mission-description">Put a description</label>
                </div>

                <input type="submit" className="btn btn-primary mt-2 ms-2" value="Save mission" />
                <input onClick={clearForm} type="button" className="btn btn-danger mt-2 ms-2" value="Cancel" />

            </form>
            <div className="container">
            <div className="row">
                {/* <div className="col-4">
                    <h2>Todas las misiones</h2>
                {allUserMissions.length != 0 ? allUserMissions?.map((mission, index) => (
                    
                    
                    <div key={index} className="rounded-4 border border-4 border-black m-5">
                        <h2 className="text-center">{mission.title}</h2>
                        <button onClick={() => handleDeleteUserMission(mission.id, user_id)} type="button" className="btn btn-danger">
                            <i className="fa-solid fa-trash"></i>
                        </button>
                        <button className="btn btn-warning" onClick={() => setFormData(mission)}>
                            <i className="fa-solid fa-pen"></i>
                        </button>
                        <button onClick={()=>handleMissionIsActive(user_id, mission.id)}className="btn btn-info">
                            <i className={`fa-${mission.is_active ? "regular" : "solid"} fa-circle`}></i>
                        </button>
                        <h4>Description </h4>
                        <hr />
                        <p className="text-center" >{mission.description}</p>
                        <hr />
                        <h4>State</h4>
                        <hr />
                        <p className="text-center">{mission.is_active ? "Active" : "Inactive"}</p>
                        <p className="display-1">{mission.id}</p>

                    </div>
                ))
                :
                <p>This user haven't missions</p>
                
            }
            </div> */}
            <div className="col-6">
                <h2>Misiones activas</h2>
                {activeMissions != 0 ? 
                
                activeMissions.map((mission, index)=>(

                    <div key={index} className="rounded-4 border border-4 border-black m-5">
                        <h2 className="text-center">{mission.title}</h2>
                        <button onClick={() => handleDeleteUserMission(mission.id, user_id)} type="button" className="btn btn-danger">
                            <i className="fa-solid fa-trash"></i>
                        </button>
                        <button className="btn btn-warning" onClick={() => setFormData(mission)}>
                            <i className="fa-solid fa-pen"></i>
                        </button>
                        <button onClick={()=>handleMissionIsActive(user_id, mission.id)}className="btn btn-info">
                            <i className={`fa-${mission.is_active ? "regular" : "solid"} fa-circle`}></i>
                        </button>
                        <h4>Description </h4>
                        <hr />
                        <p className="text-center" >{mission.description}</p>
                        <hr />
                        <h4>State</h4>
                        <hr />
                        <p className="text-center">{mission.is_active ? "Active" : "Inactive"}</p>
                        <p className="display-1">{mission.id}</p>

                    </div>
                ))
                
                : "There aren't active missions"}
            </div>
            <div className="col-6">
                <h2>Misiones inactivas</h2>
                {inactiveMissions != 0 ? 
                inactiveMissions.map((mission,index)=>(
                    <div key={index} className="rounded-4 border border-4 border-black m-5">
                        <h2 className="text-center">{mission.title}</h2>
                        <button onClick={() => handleDeleteUserMission(mission.id, user_id)} type="button" className="btn btn-danger">
                            <i className="fa-solid fa-trash"></i>
                        </button>
                        <button className="btn btn-warning" onClick={() => setFormData(mission)}>
                            <i className="fa-solid fa-pen"></i>
                        </button>
                        <button onClick={()=>handleMissionIsActive(user_id, mission.id)}className="btn btn-info">
                            <i className={`fa-${mission.is_active ? "regular" : "solid"} fa-circle`}></i>
                        </button>
                        <h4>Description </h4>
                        <hr />
                        <p className="text-center" >{mission.description}</p>
                        <hr />
                        <h4>State</h4>
                        <hr />
                        <p className="text-center">{mission.is_active ? "Active" : "Inactive"}</p>
                        <p className="display-1">{mission.id}</p>

                    </div>
                ))
                : "There aren't inactive missions"}
            </div>
            </div>
            </div>

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
        </div>
    )
}
export default UserMissionPanel