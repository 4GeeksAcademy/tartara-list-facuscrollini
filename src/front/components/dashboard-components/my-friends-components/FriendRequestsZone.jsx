import { useEffect } from "react"
import useGlobalReducer from "../../../hooks/useGlobalReducer"
import { changeRequestState } from "../../../api/friendships"
import { useRefresh } from "../../../hooks/useRefresh"


const FriendRequestsZone = () => {

    const { store, dispatch, switchLoading } = useGlobalReducer()
    const user_id = localStorage.getItem("user_id") || sessionStorage.getItem("user_id")


    const cancelRequest = async (request_id) => {
        await changeRequestState(user_id, request_id, "denied", dispatch, switchLoading)


    }

    const acceptRequest = async (request_id) => {

        await changeRequestState(user_id, request_id, "accepted", dispatch, switchLoading)


    }




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

                            <div className="border bg-ligth border-dark text-dark  rounded p-2 mt-2">
                                {store.requests_to.length > 0 ? <><p className="fs-3">Recieved</p>
                                    <hr />
                                    {store.requests_to.map((request, index) => (
                                        <div key={index}>
                                            <p>{request.from}</p>
                                            <button onClick={() => acceptRequest(request.friendship_request_id)} >Accept</button>
                                            <button onClick={() => cancelRequest(request.friendship_request_id)}>Deny</button>
                                        </div>
                                    ))}</> : <p>There is no invitation recieved</p>}
                            </div>
                            <div className="border bg-dark text-light rounded p-2">
                                {store.requests_from.length > 0 ? <>

                                    <p className="fs-3">Sended</p>
                                    <hr />
                                    {store.requests_from.map((request, index) => (
                                        <div key={index}>
                                            <p>{request.to}</p>
                                            <button onClick={() => cancelRequest(request.friendship_request_id)}>Cancel</button>
                                        </div>
                                    ))}
                                </> : <><p>Theres no sended friendship requests</p></>}
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FriendRequestsZone