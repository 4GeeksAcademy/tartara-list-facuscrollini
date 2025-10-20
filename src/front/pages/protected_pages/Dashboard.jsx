import { useEffect } from "react"
import { fetchFriendship } from "../../api/friendships"
import useGlobalReducer from "../../hooks/useGlobalReducer"

const Dashboard = () => {

    const { store } = useGlobalReducer()

    
    useEffect(() => {

    }, [])


    useEffect(() => {

        console.log(store)

    }, [store])


    useEffect(() => {

        if (store.loading) {
            console.log("Cargando...")
        }

    }, [store.loading])



    return (
        <>
           My dashboard
        </>
    )
}
export default Dashboard