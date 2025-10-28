import { useEffect, useState } from "react"
import { fetchGetAllUsers } from "../../../api/users"
import useGlobalReducer from "../../../hooks/useGlobalReducer"
import { useStorage } from "../../../hooks/useStorage"
import { changeRequestState } from "../../../api/friendships"
import { useRefresh } from "../../../hooks/useRefresh"
const SearchZone = () => {


    //Aca se va a guardar la info del input
    const [searchData, setSearchData] = useState("")


    //Estados que guardan listado de usuarios en cada uno de ellos, para evaluar si el usuario encontrado esta en una o la otra


    //Estado donde estan todos los amigos
    const [friends, setFriends] = useState([])
    //Estado donde estan todas las solicitudes enviadas
    const [requestsFrom, setRequestsFrom] = useState([])
    //Estado donde estan todas las solicitudes recibidas
    const [requestsTo, setRequestsTo] = useState([])

    //Traigo el nombre del usuario y lo guardo en una variable

    const {user_id, user_name } = useStorage()



    const { switchLoading, store,dispatch } = useGlobalReducer()

    //handleChange guarda en searchData cada letra que escribimos en el input 
    const handleChange = (event) => {
        const value = event.target.value

        setSearchData(value)

    }


    //Estado que va a guardar los usuarios encontrados, y los va a mostrar el modal

    const [founded, setFounded] = useState([])

    const [showSearchModal, setShowSearchModal] = useState(false)


    const searchFriends = async (searchData) => {

        //Aca adentro viene el fetch
        //Una vez hecho el fetch, guardamos el resultado en una variable y con un filter sacamos los usuarios que no tengan el nombre dado
        //Ya teniendo eso en una variable, despues lo guardamos en founded, asi los muestra el modal


        //Evalua si searchData no esta vacio, asi solo busca si se escribe algo

        switchLoading()
        if (searchData.trim() != "") {


            const fetchAllUsersResult = await fetchGetAllUsers()

            //Este fetch me da los usuarios

            const formattedSearchDAta = searchData.trim().toLowerCase()


            //Filtro entre ellos quien contiene lo buscado
            const searchFilter = fetchAllUsersResult.filter((user) => {

                const formattedUserName = user.user_name.trim().toLowerCase()

                return formattedUserName.includes(formattedSearchDAta)

            })

            //Guardo en un array el user_name de cada uno de ellos
            const searchResult = searchFilter.map((user) => {
                if (user.user_name != user_name) {
                    return {user_name : user.user_name, user_id: user.id}
                }
            }).filter(Boolean)



            //seteo a Founded con el resultado del array anterior
            setFounded(searchResult)
        } else {
            setFounded([])
        }
        await switchLoading()
        setShowSearchModal(true)

    }

    //Funcion handleKeyDown que recibe el evento y cada que se toca "Enter", ejecute l a funcion searchFriends

    const handleKeyDown = async (event) => {
        if (event.key === "Enter") {
            searchFriends(searchData)
        }

    }

    //useEffect que guarda los datos en los estados para que el buscador lo maneje

    useEffect(() => {

        const friendshipUsers = store.friendships.map((friendship) => {
            const userNameFriend = friendship.user_from != user_name ? friendship.user_from : friendship.user_to

            return {user_name : userNameFriend, friendship_id: friendship.id}
        })

        setFriends(friendshipUsers)

        const requestsFromStore = store.requests_from.map((request) => {
            return {friendship_request_id: request.friendship_request_id, user_name: request.to}
        })

        setRequestsFrom(requestsFromStore)

        const requestsToStore = store.requests_to.map((request) => {
            return {friendship_request_id: request.friendship_request_id, user_name: request.from}
        })

        setRequestsTo(requestsToStore)

    }, [store])


    //Funciones para aceptar y negar solicitudes

    const cancelRequest = (request_id) => {
        changeRequestState(user_id, request_id, "denied", dispatch, switchLoading)
        setShowSearchModal(false)
        useRefresh(user_id, dispatch, switchLoading)
    }

    const acceptRequest = (request_id) => {
        changeRequestState(user_id, request_id, "accepted", dispatch, switchLoading)
         setShowSearchModal(false)
         useRefresh(user_id, dispatch, switchLoading)

    }

    useEffect(()=>{

console.log(store)

    },[store])




    return (
        <div>
            <div>
                <input onKeyDown={handleKeyDown} onChange={handleChange} value={searchData} type="text"></input>
                <button onClick={() => searchFriends(searchData)} type="button" className="btn btn-primary">
                    <i className="fa-solid fa-search"></i>
                </button>
            </div>
            {(showSearchModal && !store.loading) &&
                <>
                    <div className="modal fade show d-block" id="searchModal" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Users founded</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowSearchModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    {
                                        founded.length > 0 ?
                                            (
                                                <>
                                                    <p>users founded with <b>{searchData}</b></p>
                                                    {founded.map((found, index) => {

                                                        const userFrom = requestsFrom.some(user => user.user_name === found.user_name)
                                                        const userTo = requestsTo.some(user => user.user_name === found.user_name)
                                                        const friend = friends.some(user => user.user_name === found.user_name)

                                                        let requiredData;

                                                        if(userFrom){
                                                            requiredData = requestsFrom.find(request => request.user_name === found.user_name) 
                                                        }
                                                        else if(userTo){
                                                            requiredData = requestsTo.find(request => request.user_name === found.user_name)
                                                        } else if(friend){
                                                            requiredData = friends.find(request => request.user_name, found.user_name)
                                                        }else{
                                                            requiredData = found
                                                        }

                                                        console.log("requiredData --->",requiredData)


                                                        return <div key={index} className="d-flex justify-content-between"><p >{found.user_name}</p><div className="btn-group dropend">
                                                            <button type="button" className="btn btn-secondary rounded " data-bs-toggle="dropdown" aria-expanded="false">
                                                                <i className="fa-solid fa-ellipsis-vertical"></i>
                                                            </button>
                                                            <ul className="dropdown-menu">
                                                                <li><p className="dropdown-item">See profile</p></li>
                                                                {
                                                                    userFrom ?
                                                                        <li className="dropdown-item"><button className="btn btn-danger">Cancel request</button></li>
                                                                        :
                                                                        userTo ?
                                                                            <>
                                                                                <li className="dropdown-item"><button onClick={()=> acceptRequest(requiredData.friendship_request_id)} className="btn btn-success">Accept request</button></li>
                                                                                <li className="dropdown-item"><button onClick={()=> cancelRequest(requiredData.friendship_request_id)} className="btn btn-danger">Deny request</button></li>
                                                                            </>
                                                                            :
                                                                            friend ?
                                                                                <li className="dropdown-item"><button className="btn btn-primary">Our missions</button></li>
                                                                                :
                                                                                <li className="dropdown-item"><button className="btn btn-warning">Send request</button></li>

                                                                }
                                                            </ul>
                                                        </div></div>


                                                    })
                                                    }
                                                </>


                                            )
                                            :
                                            searchData.trim() != "" ?
                                                <div>None user has been founded with <b>{searchData}</b></div>
                                                :
                                                <div>You must write to search</div>
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show" onClick={() => setShowSearchModal(false)}></div>
                </>
            }

        </div>
    )
}

export default SearchZone