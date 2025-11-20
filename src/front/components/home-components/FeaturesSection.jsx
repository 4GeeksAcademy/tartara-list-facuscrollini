import FeatureCard from "./features-section-components/FeatureCard"

const FeaturesSection = () => {

    const featureCardsInfo =[
        {title:"My Missions", description: "Create your personal tasks. Each one is a mission for Claude Stay focused, stay disciplined.", buttonText: "Add mission", imgUrl:"https://res.cloudinary.com/dra2cr3uw/image/upload/v1763641479/barco_tartara_ejemplo_ziznas.jpg"},
        {title:"Crew Missions", description: "Team up with friends and share your goals.Each member adds strength to the voyage. ", buttonText: "Find Friends", imgUrl: "https://res.cloudinary.com/dra2cr3uw/image/upload/v1763641479/barco_tartara_ejemplo_ziznas.jpg"},
        {title:"Completed Tasks", description: "Review your finished missions and celebrate your progress together", buttonText: "View Completed", imgUrl:"https://res.cloudinary.com/dra2cr3uw/image/upload/v1763641479/barco_tartara_ejemplo_ziznas.jpg"}
    ]

 
    return (
        <div className=" w-100 rounded-4 mt-5">
            <div className="row my-5 py-5 gy-lg-0 gy-4">
                {
                    featureCardsInfo.map((card, index)=>{
                        return(
                            <FeatureCard key={index} title={card.title} description={card.description} buttonText={card.buttonText} imgUrl={card.imgUrl} last={index == featureCardsInfo.length - 1}/>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default FeaturesSection