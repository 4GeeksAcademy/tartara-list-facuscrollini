import { Outlet, useNavigate } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { saveRequestsFrom, saveRequestsTo } from "../services/friendships"
import { useStorage } from "../hooks/useStorage"




// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const ProtectedLayout = () => {


    const navigate = useNavigate()
    const user_id = localStorage.getItem("user_id") || sessionStorage.getItem("user_id")



    const { store, dispatch, switchLoading } = useGlobalReducer()



    useEffect(() => {

        if (!store.login && !user_id) {
            navigate("/missing-permissions")
        }

    }, [store])


    useEffect(() => {

        saveRequestsFrom(user_id, dispatch, switchLoading)
        saveRequestsTo(user_id, dispatch, switchLoading)

    }, [])



    return (
        <ScrollToTop>
            <div className="min-vh-100 d-flex flex-column">
                <Navbar />
                <div className="flex-grow-1 d-flex">
                    <Outlet />
                </div>
                {store.loading &&
                    <div className="modal fade show d-block text-center" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <h1>Loading</h1>
                                    <div className="spinner-border" role="status">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <Footer />
            </div>
        </ScrollToTop>
    )
}