import { useEffect, useState } from "react"
import { useStorage } from "../../../hooks/useStorage"
import { login } from "../../../services/auth"
import useGlobalReducer from "../../../hooks/useGlobalReducer"
import { fetchEditUser } from "../../../services/users"

const ProfileData = () => {

    const { user_id, user_name, email } = useStorage()

    const { switchLoading } = useGlobalReducer()

    const [showModalPassword, setshowModalPassword] = useState(false)
    const [showFormPassword, setshowFormassword] = useState(false)
    const [password, setPassword] = useState("password")
    const [formData, setFormData] = useState({
        email: "",
        user_name: "",
        password: password
    })



    /*Guia autorizacion

    0- Estado inicial
    1- Contraseña equivocada
    2- Contraseña correcta
    3- Sin campos rellenados

    */
    const [authorization, setAuthorization] = useState(0)





    const handleVerifyPassword = async (event) => {
        switchLoading()
        event.preventDefault()
        try {
            const password = event.target[1].value
            if (password.trim().length != 0) {
                const auth = await login(email, password)
                if (auth.email) {
                    setAuthorization(2)
                    setPassword(password)
                }
                else {
                    setAuthorization(1)
                }
            } else {
                setAuthorization(3)
            }
        } catch (error) {
            console.log(error)
        } finally {
            switchLoading()
        }
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        const emailDifferent = formData.email != email
        const passwordDifferent = formData.password != password
        const userNameDifferent = formData.user_name != user_name

        if (emailDifferent || passwordDifferent || userNameDifferent) {
            const fetchEdit = await fetchEditUser(user_id, formData)
            if (fetchEdit.email) {

                const fetchEmail = fetchEdit.email
                const fetchUserName = fetchEdit.user_name
                useStorage().setItem("email", fetchEmail)
                useStorage().setItem("user_name", fetchUserName)
            }
        }
        else {
            console.log("ninguno de ellos es diferente")
        }



    }

    const handleChange = (event) => {
        const field = event.target.name
        const value = event.target.value
        setFormData({ ...formData, [field]: value })
    }

    useEffect(() => {

        setFormData({
            email,
            user_name,
            password
        })

    }, [password])



    return (
        <>
            <button onClick={() => console.log(formData)}>Mostrar formData</button>
            <button
                className="btn btn-warning"
                disabled={authorization == 2}>
                <i
                    id="verifyPasswordButton"
                    data-bs-toggle="modal"
                    data-bs-target="#verifyPasswordModal"
                    className="fa-solid fa-pen"
                >
                </i>
            </button>
            <form onSubmit={handleFormSubmit}>

                <label
                    className="form-label"
                    htmlFor="userName">
                    UserName
                </label>
                <input
                    onChange={handleChange}
                    name="user_name"
                    type="text"
                    value={formData.user_name}
                    className="form-control"
                    id="userName"
                    disabled={authorization != 2} />
                <label
                    className="form-label"
                    htmlFor="email">Email</label>
                <input
                    onChange={handleChange}
                    name="email"
                    type="text"
                    value={formData.email}
                    className="form-control"
                    id="email"
                    disabled={authorization != 2} />
                <label
                    className="form-label"
                    htmlFor="password">Password</label>
                <input
                    onChange={handleChange}
                    name="password"
                    type={showFormPassword ? "text" : "password"}
                    value={formData.password}
                    className="form-control"
                    id="password"
                    disabled={authorization != 2} />
                <button type="button" onClick={() => setshowFormassword(prev => !prev)} disabled={authorization != 2}><i className={`fa-solid fa-eye${showFormPassword ? "-slash" : ""}`}></i></button>

                <input type="submit" value="Send changes" disabled={authorization != 2}></input>
            </form>
            <div className="modal fade" id="verifyPasswordModal" tabIndex="-1" aria-labelledby="verifyPasswordButton" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Verify your password</h1>
                            <button onClick={() => authorization != 2 && setAuthorization(0)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleVerifyPassword}>
                                <input type="text" value={email} disabled />
                                <input type={showModalPassword ? "text" : "password"} />
                                <button title={showModalPassword ? "Hide password" : "Show password"} onClick={() => setshowModalPassword(prev => !prev)} type="button"><i className={`fa-solid fa-eye${showModalPassword ? "-slash" : ""}`}></i></button>
                                <input type="submit" className="btn btn-primary" value="Submit" disabled={authorization == 2}></input>
                                {
                                    authorization === 2 ? <p>Well done.</p> : authorization === 1 ? <p>Wrong password</p> : authorization === 3 ? <p>Write a password to get authorization</p> : ""
                                }
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )

}

export default ProfileData