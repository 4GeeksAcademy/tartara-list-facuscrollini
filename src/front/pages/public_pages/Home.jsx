import { useEffect } from "react";
import ClosingSection from "../../components/home-components/features-section-components/ClosingSection";
import FeaturesSection from "../../components/home-components/FeaturesSection";
import Jumbotron from "../../components/home-components/Jumbotron";
import { login } from "../../services/auth";



export const Home = () => {

	return (
		<div className=" container-fluid p-0 mb-5 pb-5">
			
			<Jumbotron />
			<div className="container">
			<FeaturesSection />
			<ClosingSection />
			</div>
		</div>
	);
}; 