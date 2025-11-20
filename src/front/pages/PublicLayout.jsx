import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const PublicLayout = () => {

    const { store } = useGlobalReducer()




    return (
        <ScrollToTop>
            <div className="min-vh-100 d-flex flex-column">
                <Navbar />
                <div className="flex-grow-1 d-flex back-color-5">
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