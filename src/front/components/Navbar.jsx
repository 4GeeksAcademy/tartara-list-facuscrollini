import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {


	
	const user_local = localStorage.getItem("user_name")

	const user_session = sessionStorage.getItem("user_name")

	const [logged, setLogged] = useState(false)


	const {store, dispatch} = useGlobalReducer() 

	const logout = () =>{

		if(user_local){
			localStorage.removeItem("token")
			localStorage.removeItem("user_id")
			localStorage.removeItem("user_name")
		}else if(user_session){
			sessionStorage.removeItem("token")
			sessionStorage.removeItem("user_id")
			sessionStorage.removeItem("user_name")
		}
		dispatch({type:"logout"})
	}

	useEffect(()=>{

		if(store.login){
			setLogged(true)
		}else{
			setLogged(false)
		}

	},[store])
	

	//Codigo del boton cuando esta logeado

	const buttonWithLogin = <div className="btn-group">
		<button type="button" className="btn button-color-4 dropdown-toggle font-color-3" data-bs-toggle="dropdown" aria-expanded="false">
			Hi <span className="text-decoration-underline fw-bold  m-0 ">{user_local || user_session}</span> !
		</button>
		<ul className="dropdown-menu dropdown-menu-end back-color-3 ">
			<li><button className="dropdown-item" type="button">My dashboard</button></li>
			<li><button className="dropdown-item" type="button">My friends</button></li>
			<li><button className="dropdown-item" type="button">Settings</button></li>
			<li><hr className="dropdown-divider"/></li>
			<li className="text-end"><button onClick={logout} className="dropdown-item button-color-2 w-auto ms-auto me-1 rounded-2 font-color-3 " type="button">Log out</button></li>
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
							{ logged ? buttonWithLogin : buttonWithOutLogin}
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