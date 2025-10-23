import { useEffect, useState } from "react"
import { fetchGetAllUsers } from "../../../api/users"
import useGlobalReducer from "../../../hooks/useGlobalReducer"
const SearchZone = () =>{


    //Aca se va a guardar la info del input
    const [searchData, setSearchData] = useState("")

    const { switchLoading, store } = useGlobalReducer()

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

            //Guardo en un arrray el user_name de cada uno de ellos
            const searchResult = searchFilter.map((user) => user.user_name)

            //seteo a Founded con el resultado del array anterior
            setFounded(searchResult)
        } else {
            setFounded([])
        }
        await switchLoading()
        setShowSearchModal(true)

    }

    //Funcion handleKeyDown que recibe el evento y cada que se toca "Enter", ejecute l a funcion searchFriends

    const handleKeyDown = async(event) =>{
        if(event.key === "Enter"){
            searchFriends(searchData)
        }

    }




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
                                                    {founded.map((found, index) => (

                                                        <p key={index}>{found}</p>


                                                    ))
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