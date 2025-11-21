const ClosingSection = () => {

    return (
        <div className="back-color-3 rounded-5">
            <div className="d-flex flex-column align-items-center p-4 h-100">
                <div className=" d-flex flex-column align-items-center">
                    <img className="object-fit-cover h-100" src="https://res.cloudinary.com/dra2cr3uw/image/upload/v1760182053/Elio_ejemplo_zqfn5o.png"></img>
                    <span><p className="fs-1">Every mission has a story behind it...</p></span>
                </div>
                <div>
                    <span className="text-start">
                        <p>
                            Claude is a sailor lost at sea, searching for his way back home — a distant place called Tartara. <br />
                            Long ago, the Ocean God told him that only through the completion of countless tasks would he find the path home again.<br />
                            Now, every time you check off a mission from your list, you help Claude sail a little further, pushing through the storms toward the light of Tartara.
                        </p>
                        <p>
                            Stay consistent. Complete your quests. Help Claude find his way home — one mission at a time.
                        </p>
                    </span>
                </div>

                <button type="button" className="btn button-color-7 font-color-5 fw-semibold">
                    KEEP HELPING CLAUDE
                </button>
            </div>
        </div>
    )


}

export default ClosingSection