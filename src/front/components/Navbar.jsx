import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useStorage } from "../hooks/useStorage";
import { useLogout } from "../hooks/useLogout";

export const Navbar = () => {


	const navigate = useNavigate()

	const [logged, setLogged] = useState(false)
	
	const user_local = localStorage.getItem("user_name")

	const user_session = sessionStorage.getItem("user_name")



	const { store, dispatch } = useGlobalReducer()




	//funcion para navegar a Dashboard presionando en el dropdown menu del navbar cuando esta logeado
	const navToDashboard = (section) =>{
		navigate(`/auth/dashboard/${section}`)
	}


	//useEffect para cambiar estado de logged(el que maneja el dropdown del usuario cuando esta logeado)
	//si se logea, se cambia el estado en store.login, por lo que el estado logged  cambia su valor y el boton se muestra diferente

	useEffect(() => {

		setLogged(store.login)

	}, [store.login])



	//useEffect para cuando se monta el navbar sin haber hecho el paso del login(abrir la pagina y que ya este el usuario en localstorage)
	//Evalua si store.login es false, y hay un usuario guardado en localStorage o sessionStorage y en ese caso lo pone en true
	//Con esto el boton del navbar siempre va a estar cambiado dependiendo si el usuario esta logeado o no


	useEffect(() => {
		if (!store.login) {
			if (user_session || user_local) {
				dispatch({ type: "login" })
			}
		}
	})



	//Codigo del boton cuando esta logeado

	const buttonWithLogin = <div className="btn-group">
		<button type="button" className="btn button-color-4 dropdown-toggle font-color-3" data-bs-toggle="dropdown" aria-expanded="false">
			Hi <span className="text-decoration-underline fw-bold  m-0 ">{user_local || user_session}</span> !
		</button>
		<ul className="dropdown-menu dropdown-menu-end back-color-3 ">
			<li onClick={()=>navToDashboard("my-profile")}><button className="dropdown-item item-dropdown" type="button">My profile</button></li>
			<li><button onClick={()=>navToDashboard("my-friends")} className="dropdown-item  item-dropdown" type="button">My friends</button></li>
			<li><hr className="dropdown-divider" /></li>
			<li className="text-end"><button onClick={useLogout} className="dropdown-item button-color-2 w-auto ms-auto me-1 rounded-2 font-color-3 " type="button">Log out</button></li>
		</ul>
	</div>


	//Codigo del boton sin estar logeado

	const buttonWithOutLogin = <Link to="/auth" state={{ type: "login" }}>
		<button type="button" className="btn back-color-2 button-color-1 font-color-3 fw-semibold">Log in</button>
	</Link>



	return (
		<div>

			<nav className="navbar navbar-expand-lg back-color-5 " >
				<div className="container">
					<Link to="/" className="text-decoration-none">
						<p className="font-color-1 fw-semibold fs-4" href="/">Tartara</p>
					</Link>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<i className="fa-solid fa-bars font-color-1 fs-2" ></i>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav ms-auto">
							<li className="nav-item d-flex align-items-center font-color-3 ">
								<Link className="nav-link  py-0 text-center fw-semibold font-color-3" to="/auth/mission-panel"
								>Missions</Link> |
							</li>
							<li className="nav-item d-flex align-items-center font-color-3 ">
								<Link className="nav-link fw-semibold font-color-3" to="/about-us"
								>About us</Link>
							</li>
							<li className="nav-item">
								{logged ? buttonWithLogin : buttonWithOutLogin}
							</li>

						</ul>
					</div>
				</div>
			</nav>
			<div className="navbar-filled back-color-4">
			</div>
		</div>
	);
};