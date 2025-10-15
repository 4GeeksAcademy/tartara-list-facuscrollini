import API_URL from "./apiUrl";


export const login = async(identificator, password) =>{
    const response = await fetch(API_URL + "auth/login", {
        method : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "identificator": identificator,
            "password": password
        })
    })

    const data = await response.json()

    if(response.status != 200){
        return "Invalid email or password"
    }
    return data
}


export const protectedZone = async(token) =>{
    const response = await fetch(API_URL + "auth/protected", {
        medthod: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return response.status == 200
}