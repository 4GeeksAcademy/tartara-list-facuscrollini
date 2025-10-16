import { Link } from "react-router-dom"

const MissingPermissions = () =>{


    return(
    <>
<p>Need permissions to acces here, <Link to="/auth" state={{type:"login"}} >login</Link> or <Link to="/auth" state={{type:"signup"}}>create</Link> an account</p>
    </>
    )

}

export default MissingPermissions