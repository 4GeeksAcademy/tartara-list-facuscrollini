import { Link } from "react-router-dom"
import useGlobalReducer from "../../../hooks/useGlobalReducer"
import { useEffect } from "react"

const ClosingSection = () => {


    const { store } = useGlobalReducer()

 


    const btnStartJourney = <Link to="/auth" state={{ type: "login" }}>
        <button type="button" className="btn button-color-7 font-color-5 fw-semibold rounded-4 fs-4 mt-5 mb-1 ">
            Log in to start your journey
        </button>
    </Link>


    const btnContinueJourney = <Link to="/auth/mission-panel">
        <button type="button" className="btn button-color-7 font-color-5 fw-semibold rounded-4 fs-4 mt-5 mb-1 ">
            Continue your journey
        </button>
    </Link>

    return (
        <div className="back-color-3 border border-3 border-color-2 rounded-5">
            <div className="d-flex flex-column align-items-center p-4 h-100">
                <div className="d-flex flex-column align-items-center">
                    <div className="img-closing-section">
                        <img className="object-fit-cover h-100" src="https://res.cloudinary.com/dra2cr3uw/image/upload/v1763737946/barco_tartara_ejemplo_closing_section_lv9pmw.jpg"></img>
                    </div>
                    <span><p className="fs-1 font-color-5 text-center text-md-start ">Every mission has a story behind it...</p></span>
                </div>
                <div className="back-color-5 rounded-4 p-3 mt-2 w-100">
                    <div className="container-lg w-65 mt-2 mb-4">

                        <span className="text-start font-color-2">
                            <p>
                                <b>Claude</b> is a sailor lost at sea, searching for his way back  home — a distant place called <b>Tartara</b>. <br />
                                Long ago, the <b>Ocean God</b> told him that only through the completion of countless <b>missions</b> would he find the path <b>home again</b>.<br />
                                Now, every time you check off a mission from your list, you help <b>Claude</b> sail a little further, pushing through the storms toward the light of Tartara.
                            </p>
                            <p>
                                Stay consistent. Complete your quests. Help <b>Claude</b> find his way home — one mission at a time.
                            </p>
                        </span>
                    </div>
                </div>
                {store.login ? btnContinueJourney : btnStartJourney}
            </div>
        </div>
    )


}

export default ClosingSection