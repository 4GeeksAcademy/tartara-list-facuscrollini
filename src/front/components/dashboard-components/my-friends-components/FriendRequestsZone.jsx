import { useEffect } from "react"
import useGlobalReducer from "../../../hooks/useGlobalReducer"
import { changeRequestState } from "../../../api/friendships"


const FriendRequestsZone = () => {

    const { store, dispatch, switchLoading } = useGlobalReducer()
    const user_id = localStorage.getItem("user_id") || sessionStorage.getItem("user_id")


    const cancelRequest = (request_id) => {
        changeRequestState(user_id, request_id, "denied", dispatch, switchLoading)
    }

    const acceptRequest = (request_id) => {
        changeRequestState(user_id, request_id, "accepted",dispatch, switchLoading)

    }


    useEffect(() => {
        console.log(store)
    }, [store])


    return (
        <>
            <div className="accordion w-50">

                <div className="accordion-item rounded-5">
                    <h2 className="accordion-header">
                        <button className="accordion-button rounded-3 back-color-5 no-ring" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Friend requests
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <p>Sended</p>
                            {store.requests_from.map((request) => (
                                <>
                                    <p>{request.to}</p>
                                    <button onClick={()=>cancelRequest(request.friendship_request_id)}>Cancel</button>
                                </>
                            ))}
                            <p>Recieved</p>
                            {store.requests_to.map((request) => (
                                <>
                                    <p>{request.from}</p>
                                    <button onClick={()=>acceptRequest(request.friendship_request_id)} >Accept</button>
                                    <button onClick={()=>cancelRequest(request.friendship_request_id)}>Deny</button>
                                </>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FriendRequestsZone