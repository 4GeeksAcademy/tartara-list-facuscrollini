


const Jumbotron = () => {
    return (
        // <div className="jumbotron bg-light rounded-5 border border-5 border-black overflow-hidden" >


        //     <div className="row h-100">
        //         <div className="col-lg-6 d-none d-lg-block bg-danger h-100">
        //             <img className="object-fit-cover" src="https://elbohemiodehojalata.wordpress.com/wp-content/uploads/2018/08/obito-uchiha-3.jpg" />

        //         </div>
        //         <div className="col-lg-6 col-12 bg-white ">
        //             <div className="h-100 d-flex flex-column justify-content-center align-items-lg-start align-items-center p-2 p-lg-0 pe-lg-5 text-center text-lg-start">
        //                 <h1 className="display-3">Claude’s Journey to Tartara</h1>
        //                 <p className="fw-semibold mt-3">Claude has been lost at sea for years, searching for his home — the island of Tartara.
        //                     A marine once told him: “Complete 3,000 missions, and I’ll reveal the way.”
        //                     Now, every task you complete brings Elio closer to discovering where he truly belongs.</p>
        //                 <button type="button" className="btn button-color-2 font-color-3">Start a mission</button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
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
                <button className="btn button-color-7 font-color-4 fs-3 rounded-4"> Start a mission</button>
            </div>
        </div>
    )
}

export default Jumbotron