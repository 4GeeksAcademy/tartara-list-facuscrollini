import { Link } from "react-router-dom";

export const Footer = () => (
	<footer className="footer container mt-auto text-center">
		<div className="back-color-5 font-color-3 py-4">
			<div className="row g-2">
				<div className="col-lg-4 col-12 text-lg-end mb-5 mb-lg-0  d-flex justify-content-center">
				
					<Link to="/">
						<div className=" d-inline-block button-color-3 font-color-5 rounded-2 px-5" >

							<p className="m-0 fs-2">
								Tartara
							</p>
						</div>
					</Link>

				</div>
				<div className="col-lg-4 col-6">
					<div className="row">
						<div className="col-xl-4 d-flex flex-column justify-content-center align-items-xl-end align-items-center border-color-3 border-bottom border-xl-5 border-3 border-xl-end ">
							<div className=" pe-2 d-flex gap-2 d-xl-block">
								<i className="fs-1 fa-regular fa-envelope">
								</i> <p className="fs-4">Contact</p>
							</div>
						</div>
						<div className="col-xl-8 d-flex  flex-column justify-content-center align-items-xl-start align-items-center">
							<ul className="p-0 mt-3 " style={{ "listStyle": "none" }}>
								<a className="text-decoration-none font-color-3" href="mailto:facuscrollinic@gmail.com">
									<li>
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
					</div>
				</div>
				<div className="col-lg-4 col-6">
					<div className="row">

						<div className="col-xl-4 d-flex flex-column justify-content-center align-items-xl-end align-items-center border-color-3 border-bottom border-xl-5 border-3 border-xl-end">
							<div className=" pe-2 d-xl-block d-flex">

								<i className="fs-1 fa-solid fa-sailboat"></i>
								<p className="fs-4">Navigate</p>

							</div>
						</div>
						<div className="col-xl-8  d-flex flex-column justify-content-center align-items-xl-start align-items-center">
							<ul className="p-0 mt-3" style={{ "listStyle": "none" }}>
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
			</div>
		</div>

	</footer>
);
