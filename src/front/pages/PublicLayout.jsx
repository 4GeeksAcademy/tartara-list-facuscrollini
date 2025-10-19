import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const PublicLayout = () => {



    return (
        <ScrollToTop>
            <div className="min-vh-100 d-flex flex-column">
                <Navbar />
                <div className="flex-grow-1 d-flex">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </ScrollToTop>
    )
}