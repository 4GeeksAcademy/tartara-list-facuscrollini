import { useEffect } from "react";
import ClosingSection from "../../components/home-components/features-section-components/ClosingSection";
import FeaturesSection from "../../components/home-components/FeaturesSection";
import Jumbotron from "../../components/home-components/Jumbotron";
import { login } from "../../api/auth";



export const Home = () => {

	useEffect(()=>{

		login("facu","1234")
	},[])

	return (
		<div className="container py-5">
			<Jumbotron/>
			<FeaturesSection/>
			<ClosingSection/>
		</div>
	);
}; 