import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { login } from "../../api/auth"
import { createAccount } from "../../api/users"

const AuthForm = ({ color, fields }) => {

    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState(false)

    const [signupError, setSignupError] = useState()
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
            const { token, user_id } = await login(formData.identificator, formData.password)
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
                setShowModal(true)
                setSignupError(user_created)
            }
            setLoading(false)
        }

    }
    //Fin funcion para manejar el envio del formuilario



    //Funcion para cerrar modal del error al registrarse

    const handleCloseModal = () => {
        setShowModal(false)
    }

    //Fin funcion para cerrar modal del error al registrarse











    return (
        <div className={`d-flex flex-column justify-content-center align-items-center ${color == "a" ? "font-color-1" : "font-color-3"} h-100 w-100`}>
            <div> <h2 className={`display-3 ${color == "a" ? "font-color-3" : "font-color-1"} mb-4 pb-5`}>{fields.title}</h2></div>
            <div className={`${color == "a" ? "back-color-3" : "back-color-1"} rounded-4  d-inline-flex px-5  py-2 shadow-lg`}>
                <form onSubmit={handleSubmit}>
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
                                    <input value={formData[field.name] || ""} onChange={handleInputChange} className="form-control" maxLength={(field.name === "password" || field.name === "confirmPassword") ? 20 : undefined} minLength={field.name == "password" ? 8 : field.name == "user_name" ? 4 : field.name == "email" ? 5 : 8} id={`input-${field.fieldName}`} type={field.type} placeholder={field.placeholder} name={field.name && field.name} required ></input>
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
                <div className="font-color-1">
                {/*Modal*/}
                <div className="modal fade show d-block" id="exampleModal" tabindex="-1" >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Sign up error</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                        </div>
                        <div className="modal-body">
                            {signupError}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
                {/*Fondo escuro del modal*/}
            <div className="modal-backdrop fade show" onClick={handleCloseModal}>
            </div>
                </div>
            
            )}



        </div>
    )
}

export default AuthForm