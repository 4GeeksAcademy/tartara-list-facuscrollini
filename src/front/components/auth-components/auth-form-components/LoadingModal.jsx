const LoadingModal = () => {
    return (
        <div>
            <div className="modal fade show d-block" id="exampleModal" tabIndex="-1" >
                <div className="modal-dialog  modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="spinner-border text-dark" role="status">
                                <span className="visually-hidden ">Loading...</span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal-backdrop fade show">
            </div>

        </div>
    )
}

export default LoadingModal