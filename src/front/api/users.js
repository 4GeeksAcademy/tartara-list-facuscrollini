import API_URL from "./apiUrl"

export const createAccount = async(user_name, email,password) =>{
const response = await fetch(API_URL + "user", {
    method:"POST",
    headers:{
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        "user_name": user_name,
        "email": email,
        "password": password
    })
})

const data = await response.json()

if(!response.ok){
    return data
}

if(response.status == 200){
    return "done"
} else {
    return data
}

}