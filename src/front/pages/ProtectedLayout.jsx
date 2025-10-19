import { Outlet, useNavigate } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const ProtectedLayout = () => {


const navigate = useNavigate()

const login = localStorage.getItem("user_id") || sessionStorage.getItem("user_id")


const {store} = useGlobalReducer()


useEffect(()=>{

if(!store.login && !login){
    navigate("/missing-permissions")
}

},[store])


    return (
        <ScrollToTop>
            <Navbar />
                <Outlet />
            <Footer />
        </ScrollToTop>
    )
}