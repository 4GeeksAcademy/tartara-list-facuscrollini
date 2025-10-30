import { useStorage } from "../../../../hooks/useStorage"

const ProfileBanner = () =>{

    const {user_name} = useStorage()

return(
    <>
    <div className="row">
        <div className="col-5 px-5">
          <div className="ratio ratio-1x1">
            <img src="https://preview.redd.it/a-rant-from-a-huge-fan-of-the-character-vigilante-adrian-v0-sk445aebu8jf1.png?width=640&crop=smart&auto=webp&s=b76cbad8986cddefdb3db091539c913863da20dc" alt="" className="object-fit-cover rounded-circle" />
            </div>
        </div>
        <div className="col-7">{user_name}</div>
    </div>
    </>
)

}

export default ProfileBanner