
const FormErrorModal = ({ title, message, handleCloseModal }) => {

    return (
        <div className="font-color-4">
            {/*Modal*/}
            <div className="modal fade show d-block text-center" id="exampleModal" tabindex="-1" >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header back-color-2 font-color-3">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{title}<i className="fa-solid fa-circle-exclamation"></i></h1>
                            <button type="button" className="btn button-color-3 font-color-1 fa-regular fa-x fw-bold" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                        </div>
                        <div className="modal-body">
                            <p className="fs-5 py-4 m-0 fw-bold">
                                {message}
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn button-color-2 text-white" data-bs-dismiss="modal" onClick={handleCloseModal}>Accept</button>
                        </div>
                    </div>
                </div>
            </div>
            {/*Fondo escuro del modal*/}
            <div className="modal-backdrop fade show" onClick={handleCloseModal}>
            </div>
        </div>

    )

}

export default FormErrorModal