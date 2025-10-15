import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { login } from "../../api/auth"
import { createAccount } from "../../api/users"

const AuthForm = ({ color, fields }) => {

    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState(false)

    const [formError, setFormError] = useState({
        title: "",
        message: ""
    })

    const [formState, setFormState] = useState("")

    const [formSuccess, setFormSuccess] = useState({
        title: "",
        message: ""
    })


    //Funcion para dar mensaje de bienvenida al azar dandole el nombre de usuario
    const loginMessage = (user_name) => {

        const loginMessages = [
            { title: `Welcome back,${user_name}!`, message: "Help Claude complete 3,000 missions to find his home on Tartara." },
            { title: `Ahoy, ${user_name}`, message: "Guide Claude through 3,000 missions and discover the island of Tartara." },
            { title: `Hi ${user_name}!`, message: "Finish 3,000 missions and a sailor will reveal where Claude's home, Tartara, is." }
        ]

        const randomLoginMessage = loginMessages[Math.floor(Math.random() * loginMessages.length)]

        return randomLoginMessage
    }
    // Fin loginMessage


    const [showModal, setShowModal] = useState(false)

    const navigate = useNavigate()


    const location = useLocation()
    const formType = location.state.type

    useEffect(() => {
        if (formType == "login") {
            setFormData({
                identificator: "",
                password: "",
                staySigned: false
            })
        } else if (formType == "signup") {
            setFormData({
                user_name: "",
                email: "",
                password: "",
                confirmPassword: "",
                agreeWithTerms: false
            })
        }
    }, [formType])


    const endMessage = fields.type == "login" ? (
        <div className={`form-text text-center ${color == "a" ? "font-color-1" : "font-color-3"}`}>
            Don't have an account?
            <Link to='/auth' className="text-decoration-none font-color-5 fw-semibold" state={{ type: 'signup' }}> Sign up</Link>
        </div>
    ) :
        (
            <div className={`form-text text-center ${color == "a" ? "font-color-1" : "font-color-3"}`}>
                Have an acocunt?
                <Link to='/auth' className="text-decoration-none font-color-5 fw-semibold" state={{ type: 'login' }}> Log in!</Link>
            </div>
        )




    const handleInputChange = (event) => {
        const { name, type, value, checked } = event.target
        setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
    }



    //Funcion para manejar el envio del formulario

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (formType == "login") {
            setLoading(true)
            const user_login = await login(formData.identificator, formData.password)

            const { token, user_id, user_name } = await user_login

            if (!token || !user_id) {
                setFormError({ title: "LOGIN ERROR", message: user_login })
                setFormState("error")
                setShowModal(true)
                setLoading(false)
                return
            } else {

                const {title, message} = loginMessage(user_name)
                setFormSuccess({title: title, message: message})
                setFormState("success")
                setShowModal(true)
                setLoading(false)

            }

            if (formData.staySigned) {
                localStorage.setItem("token", token)
                localStorage.setItem("user_id", user_id)
            } else {
                sessionStorage.setItem("token", token)
                sessionStorage.setItem("user_id", user_id)
            }
            setLoading(false)
        } else if (formType == "signup") {
            setLoading(true)
            const user_created = await createAccount(formData.user_name, formData.email, formData.password)

            if (user_created != "done") {
                setFormError({ title: "SIGN UP ERROR", message: user_created })
                setFormState("error")
                setShowModal(true)
            } else {
                setFormSuccess({ title: "Account created", message: "Let's rock!" })
                setFormState("success")
                setShowModal(true)
            }
            setLoading(false)
        }

    }
    //Fin funcion para manejar el envio del formuilario



    //Funcion para cerrar modal del error al registrarse

    const handleCloseModal = () => {
        setShowModal(false)
        if(formState== "success"){
            if(formType == "login"){
                navigate("/", {replace:true})
            }else if(formType == "signup"){

                navigate("/auth", {state:{type:"login"}})
            }
        }
    }

    //Fin funcion para cerrar modal del error al registrarse











    return (
        <div className={`d-flex flex-column justify-content-center align-items-center ${color == "a" ? "font-color-1" : "font-color-3"} h-100 w-100`}>
            <div> <h2 className={`display-3 ${color == "a" ? "font-color-3" : "font-color-1"} mb-4 pb-5`}>{fields.title}</h2></div>
            <div className={`${color == "a" ? "back-color-3" : "back-color-1"} rounded-4  d-inline-flex px-5  py-2 shadow-lg`}>
                <form className="" onSubmit={handleSubmit}>
                    {fields.fields.map((field) => {
                        return (
                            field.type == "checkbox" ?

                                <div className="mt-3">
                                    <input onChange={field.name && handleInputChange} className="form-check-input " id={`input-${field.fieldName}`} name={field.name && field.name} type={field.type}></input>
                                    <label className="form-label mb-0" htmlFor={`input-${field.fieldName}`}>{field.fieldName}</label>
                                </div>
                                :
                                <>
                                    <label className="form-label fw-semibold pt-3" htmlFor={`input-${field.fieldName}`}  >{field.fieldName}</label>
                                    <input value={formData[field.name] || ""} onChange={handleInputChange} className="form-control" maxLength={(field.name === "password" || field.name === "confirmPassword") ? 20 : undefined} minLength={field.name == "password" ? 8 : field.name == "user_name" ? 4 : field.name == "email" ? 5 : field.name == "identificator" ? 4 : 8} id={`input-${field.fieldName}`} type={field.type} placeholder={field.placeholder} name={field.name && field.name} required ></input>
                                </>
                        )
                    })}
                    <div className="d-flex justify-content-center mt-2">

                        <input className="btn rounded-pill button-color-4 font-color-3 " type="submit" value={fields.button} />
                    </div>
                    {endMessage}
                </form>
            </div>


            {/* Error Modal */}

            {showModal && (
                formState == "error" ? (

                    <div className="font-color-4">
                        {/*Modal*/}
                        <div className="modal fade show d-block text-center" id="exampleModal" tabindex="-1" >
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header back-color-2 font-color-3">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">{formError.title}<i class="fa-solid fa-circle-exclamation"></i></h1>
                                        <button type="button" className="btn button-color-3 font-color-1 fa-regular fa-x fw-bold" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                                    </div>
                                    <div className="modal-body">
                                        <p className="fs-5 py-4 m-0 fw-bold">
                                            {formError.message}
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
                ) :
                    (
                        <div className="font-color-4">
                            {/*Modal*/}
                            <div className="modal fade show d-block text-center" id="exampleModal" tabindex="-1" >
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header back-color-2 font-color-3">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">{formSuccess.title} <i class="fa-solid fa-circle-exclamation"></i></h1>
                                            <button type="button" className="btn button-color-3 font-color-1 fa-regular fa-x fw-bold" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                                        </div>
                                        <div className="modal-body">
                                            <p className="fs-5 py-4 m-0 fw-bold">
                                                {formSuccess.message}
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

            )}



        </div>
    )
}

export default AuthForm