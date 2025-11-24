import { Link } from "react-router-dom";

export const Footer = () => (
	<footer className="footer mt-auto text-center">
		<div className="back-color-5 font-color-3 py-4">
			<div className="row">
				<div className="col-lg-3 col-12 text-lg-end mb-5 mb-lg-0">
					{/* <div className="img-footer">
						<img className="object-fit-cover h-100" src="https://res.cloudinary.com/dra2cr3uw/image/upload/v1760182053/Elio_ejemplo_zqfn5o.png" />
					</div>
					 */}
					<Link to="/">
						<div className=" d-inline-block button-color-3 font-color-5 rounded-2 px-5" >

							<p className="m-0 fs-2">
								Tartara
							</p>
						</div>
					</Link>

				</div>
				<div className="col-lg-2 col-3 d-flex flex-column justify-content-center align-items-end">
					<div className="border-color-3 border-end border-3 pe-2">
						<i className="fs-1 fa-regular fa-envelope">
						</i> <p className="fs-4">Contact</p>
					</div>
				</div>
				<div className="col-lg-2 col-3 d-flex  flex-column justify-content-center align-items-start">
					<ul className="p-0" style={{ "listStyle": "none" }}>
						<a className="text-decoration-none font-color-3" href="mailto:facuscrollinic@gmail.com">
							<li >
								<p className="text-start m-0 fw-semibold"><i className="fa-solid fa-at"></i>facuscrollinic@gmail.com</p>
							</li>
						</a>
						<li>
							<a className="text-decoration-none font-color-3" target="_blank" href="https://instagram.com/facuscrollini">
								<p className="text-start m-0 fw-semibold"><i className="fa-brands fa-instagram"></i>facuscrollini</p>
							</a>
						</li>
						<li>
							<a className="text-decoration-none font-color-3" target="_blank" href="https://es.linkedin.com/in/facundoscrollini">
								<p className="text-start m-0 fw-semibold"><i className="fa-brands fa-linkedin"></i>facundoscrollini</p>
							</a>
						</li>
					</ul>

				</div>
				<div className="col-lg-2 col-3 d-flex flex-column justify-content-center align-items-end">
					<div className="border-color-3 border-3 border-end pe-2">

						<i className="fs-1 fa-solid fa-sailboat"></i>
						<p className="fs-4">Navigate</p>

					</div>
				</div>
				<div className="col-lg-2 col-3 d-flex  flex-column justify-content-center align-items-start">
					<ul className="p-0" style={{ "listStyle": "none" }}>
						<li>
							<Link to="/" className="text-decoration-none">
								<p className="text-start m-0 fw-semibold font-color-3">Home</p>
							</Link>
						</li>
						<li>
							<Link to="/auth/mission-panel" className="text-decoration-none">
								<p className="text-start m-0 fw-semibold font-color-3">Missions</p>
							</Link>
						</li>
						<li>
							<Link to="/about-us" className="text-decoration-none">
								<p className="text-start m-0 fw-semibold font-color-3">About us</p>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>

	</footer>
);
