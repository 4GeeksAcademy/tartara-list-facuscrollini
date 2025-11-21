import { Link } from "react-router-dom"
import useGlobalReducer from "../../hooks/useGlobalReducer"



const Jumbotron = () => {


    const {store} = useGlobalReducer()
 
    return (
        <div>
            <div className="jumbotron container-fluid back-color-2">
                <div className="d-flex flex-column align-items-center pt-4 container">
                    <span className="font-color-5 display-2 text-center "> Help Claude find his way home </span>
                    <p className="font-color-5 fs-lg-3  fs-md-4 fs-6 w-50 pt-3 text-center"> Every mission you complete brings him closer to Tartara, the lost haven beneath the waves. </p>
                </div>
            </div>
            <div className="jumbotron-base d-flex justify-content-center align-items-end position-relative back-color-5">
                <div className="jumbotron-image position-absolute top-0 start-50 translate-middle  ">
                    <div className="ratio ratio-1x1">
                        <img className="object-fit-cover rounded-circle" src="https://res.cloudinary.com/dra2cr3uw/image/upload/v1763641479/barco_tartara_ejemplo_ziznas.jpg" alt="" />
                    </div>
                </div>

                <Link to={store.login ? "auth/mission-panel" : "/auth"} state={store.loging && {type: "login"}} className="btn button-color-7 font-color-5 fs-3 rounded-4"> Start a mission</Link> 
                {/* Al hacer click aqui, si no esta logeado, debe hacerlo, y si si lo esta, lo lleva a la seccion de crear mision */}
            </div>
        </div>
    )
}

export default Jumbotron