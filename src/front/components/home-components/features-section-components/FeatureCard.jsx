const FeatureCard = ({ title, description, buttonText,imgUrl, last }) => {
    return (
        <div className={`col-lg-4 ${last ? "col-md-12" : "col-md-6 "} col-12`}>
            <div className="d-flex justify-content-center h-100">
                <div className="card h-100 rounded-5 overflow-hidden border-0 text-center back-color-4 p-4 " style={{width: "18rem"}}>
                    <div className="ratio ratio-1x1">
                    <img src={imgUrl} className="object-fit-cover rounded-circle" alt="..."/>
                    </div>
                        <div className="card-body p-0 d-flex flex-column justify-content-between align-items-center ">
                            <div className="py-4">
                            <h5 className="card-title fs-4">{title}</h5>
                            <p className="card-text ">{description}</p>
                            </div>
                            <div className=" border-bottom border-color-5">

                            <a href="#" className="btn button-color-7 font-color-3 rounded-2 font-color-5 fs-4">{buttonText}</a>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default FeatureCard